import { projects } from './projects';
import { timeline } from './experience';

// Everything in this file is *derived* from projects.js / experience.js
// rather than hand-typed, so adding, editing, or removing a project or an
// experience entry automatically keeps the Skills progress bars and the
// About section stats (Years Experience, Projects Completed, Technologies,
// Happy Clients) accurate — no more numbers going stale.

function techListOf(project) {
  return (project.tech || []).map((t) => t.toUpperCase());
}

function projectsMatching(match) {
  return projects.filter(match);
}

// Each skill's "match" describes which real signal in the project data
// counts as evidence of using that skill: a tech tag, or (for tools that
// don't show up as a tag) a related field like `github`/`live`.
const SKILL_DEFINITIONS = [
  {
    title: 'Frontend',
    items: [
      { label: 'HTML / CSS', match: (p) => techListOf(p).some((t) => /HTML|CSS/.test(t)) },
      { label: 'JavaScript', match: (p) => techListOf(p).some((t) => /JAVASCRIPT|^JS$|JSX/.test(t)) },
      { label: 'React / Vite', match: (p) => techListOf(p).some((t) => /REACT|VITE/.test(t)) },
      { label: 'Tailwind CSS', match: (p) => techListOf(p).some((t) => /TAILWIND/.test(t)) },
      { label: 'Blade Templating', match: (p) => techListOf(p).some((t) => /BLADE/.test(t)) },
    ],
  },
  {
    title: 'Backend',
    items: [
      { label: 'PHP', match: (p) => techListOf(p).some((t) => /^PHP$/.test(t)) },
      { label: 'Laravel', match: (p) => techListOf(p).some((t) => /LARAVEL/.test(t)) },
      { label: 'REST APIs / Google Auth', match: (p) => techListOf(p).some((t) => /GOOGLE AUTH/.test(t)) },
      { label: 'Firebase / Firestore', match: (p) => techListOf(p).some((t) => /FIREBASE|FIRESTORE/.test(t)) },
    ],
  },
  {
    title: 'Database',
    items: [
      { label: 'MySQL', match: (p) => techListOf(p).some((t) => /MYSQL/.test(t)) },
      { label: 'SQLite', match: (p) => techListOf(p).some((t) => /SQLITE/.test(t)) },
      // phpMyAdmin / Eloquent ORM aren't tagged directly — they ride along
      // with any Laravel + MySQL project, so they're tied to that same signal.
      { label: 'phpMyAdmin', match: (p) => techListOf(p).some((t) => /LARAVEL|MYSQL/.test(t)) },
      { label: 'Eloquent ORM', match: (p) => techListOf(p).some((t) => /LARAVEL/.test(t)) },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'Git / GitHub', match: (p) => Boolean(p.github) },
      { label: 'Vercel Deployment', match: (p) => Boolean(p.live && p.live.includes('vercel.app')) },
      { label: 'PWA / Service Workers', match: (p) => techListOf(p).some((t) => /\bPWA\b/.test(t)) },
      { label: 'VS Code', match: () => true },
    ],
  },
];

function buildSkillGroups() {
  const flat = SKILL_DEFINITIONS.flatMap((group) =>
    group.items.map((item) => ({
      group: group.title,
      label: item.label,
      count: projectsMatching(item.match).length,
    }))
  );

  const maxCount = Math.max(...flat.map((f) => f.count), 1);

  return SKILL_DEFINITIONS.map((group) => ({
    title: group.title,
    items: group.items.map((item) => {
      const count = projectsMatching(item.match).length;
      // Scale relative to whichever skill shows up in the most projects, with
      // a small floor so a skill with at least one real project never reads as empty.
      const pct = count === 0 ? 0 : Math.max(15, Math.round((count / maxCount) * 100));
      return { label: item.label, pct };
    }),
  }));
}

export const skillGroups = buildSkillGroups();

function projectsCompletedCount() {
  return projects.length;
}

function technologiesCount() {
  const set = new Set();
  projects.forEach((p) => techListOf(p).forEach((t) => set.add(t)));
  return set.size;
}

function yearsExperienceCount() {
  const years = [];
  timeline.forEach((t) => {
    const found = t.date.match(/\d{4}/g) || [];
    found.forEach((y) => years.push(parseInt(y, 10)));
  });
  if (!years.length) return 0;
  const earliest = Math.min(...years);
  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - earliest);
}

function happyClientsCount() {
  const clients = new Set(projects.filter((p) => p.client).map((p) => p.client));
  return clients.size;
}

export const stats = [
  { count: yearsExperienceCount(), label: 'Years Experience' },
  { count: projectsCompletedCount(), label: 'Projects Completed' },
  { count: technologiesCount(), label: 'Technologies' },
  { count: happyClientsCount(), label: 'Happy Clients' },
];
