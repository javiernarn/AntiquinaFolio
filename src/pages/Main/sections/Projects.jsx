import { useEffect, useMemo, useState } from 'react';
import { useReveal } from '../../../hooks/useReveal';
import { projects } from '../../../data/projects';
import { useDataTheme } from '../../../hooks/useDataTheme';

const FILTERS = ['all', 'web', 'app', 'ai', 'ui'];

const STATUS_LABEL = {
  local: 'Local',
  checking: 'Checking',
  online: 'Online',
  offline: 'Offline',
};

// Pings a project's live domain and reports whether it's reachable.
// No live domain -> "local". Domain set but unreachable -> "offline". Reachable -> "online".
function useLiveStatus(url) {
  const hasLive = !!url && url !== '#';
  const [status, setStatus] = useState(hasLive ? 'checking' : 'local');

  useEffect(() => {
    if (!hasLive) {
      setStatus('local');
      return;
    }

    let cancelled = false;
    setStatus('checking');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    fetch(url, { mode: 'no-cors', cache: 'no-store', signal: controller.signal })
      .then(() => {
        if (!cancelled) setStatus('online');
      })
      .catch(() => {
        if (!cancelled) setStatus('offline');
      })
      .finally(() => clearTimeout(timeoutId));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [url, hasLive]);

  return status;
}

function ProjectCard({ project, onDetails }) {
  const [ref, revealed] = useReveal();
  const theme = useDataTheme();
  const src = project.img?.[theme] || project.img?.dark;
  const status = useLiveStatus(project.live);

  return (
    <article className={`project reveal${revealed ? ' in' : ''}`} ref={ref} data-cat={project.cat}>
      <div className="project-img">
        {src && <img src={src} alt={`${project.title} preview`} />}
        <span className={`status-badge status-${status}`}>
          <span className="status-dot" />
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="tech">{project.tech.map(t => <span key={t}>{t}</span>)}</div>
        <div className="project-actions">
          <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live Demo</a>}
          {project.admin && <a href={project.admin} target="_blank" rel="noopener noreferrer">Admin</a>}
          <button onClick={() => onDetails(project)}>Details</button>
        </div>
      </div>
    </article>
  );
}

export default function Projects({ onOpenProject }) {
  const [headRef, headIn] = useReveal();
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return projects.filter(p =>
      (activeFilter === 'all' || p.cat === activeFilter) &&
      (p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tech.join(' ').toLowerCase().includes(q))
    );
  }, [activeFilter, query]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">Projects</span>
          <h2>Selected <span className="gradient-text">work</span></h2>
          <p>A glimpse into recent things I've shipped.</p>
        </div>

        <div className="projects-controls reveal in">
          <div className="filters" id="filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f === 'all' ? 'All' : f === 'ui' ? 'UI/UX' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              id="projectSearch"
              type="text"
              placeholder="Search projects..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="projects-grid" id="projectsGrid">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} onDetails={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  );
}