// Server-side reachability check for project live links.
// Runs on Vercel, so it is not affected by browser CORS/CORP rules,
// ad-blockers, or the visitor's network.
import { projects } from '../src/data/projects.js';

const ALLOWED = new Set(
  projects.filter(p => p.live && !p.livePrivate).map(p => new URL(p.live).origin)
);

// Gateway-type errors mean the host is really down; anything else
// (even 401/403/404/500) means a server answered, so it is reachable.
const DOWN = new Set([502, 503, 504, 520, 521, 522, 523, 524, 525, 526]);

async function tryFetch(url, method, ms) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, {
      method,
      redirect: 'follow',
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; JoneeDevStatus/1.0)' },
    });
    return !DOWN.has(res.status);
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  const target = req.query?.url;
  let origin;
  try {
    origin = new URL(target).origin;
  } catch {
    return res.status(400).json({ online: false, error: 'bad url' });
  }
  if (!ALLOWED.has(origin)) return res.status(403).json({ online: false, error: 'not allowed' });

  const online =
    (await tryFetch(target, 'HEAD', 8000)) || (await tryFetch(target, 'GET', 8000));
  res.status(200).json({ online });
}
