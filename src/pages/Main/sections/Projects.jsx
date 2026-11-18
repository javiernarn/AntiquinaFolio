import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useReveal } from '../../../hooks/useReveal';
import { projects } from '../../../data/projects';
import { useDataTheme } from '../../../hooks/useDataTheme';
import { showToast } from '../../../components/Toast/Toast';

const FILTERS = ['all', 'web', 'app', 'ai', 'ui'];

const STATUS_LABEL = {
  local: 'Local',
  checking: 'Checking',
  online: 'Online',
  offline: 'Offline',
  private: 'Private',
};

const PRIVATE_LIVE_MESSAGE = "This portfolio is private — the client asked that the live link not be shared, so visiting it isn't available.";

// Pings a project's live domain and reports whether it's reachable.
// No live domain -> "local". Domain set but unreachable -> "offline". Reachable -> "online".
// A project marked `livePrivate` never pings anything — it's always "private".
function useLiveStatus(project) {
  const { live, livePrivate } = project;
  const hasLive = !!live && live !== '#';
  const [status, setStatus] = useState(livePrivate ? 'private' : hasLive ? 'checking' : 'local');

  useEffect(() => {
    if (livePrivate) {
      setStatus('private');
      return;
    }
    if (!hasLive) {
      setStatus('local');
      return;
    }

    let cancelled = false;
    setStatus('checking');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    fetch(live, { mode: 'no-cors', cache: 'no-store', signal: controller.signal })
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
  }, [live, hasLive, livePrivate]);

  return status;
}

function ProjectCard({ project, onDetails }) {
  const [ref, revealed] = useReveal();
  const theme = useDataTheme();
  const src = project.img?.[theme] || project.img?.dark;
  const status = useLiveStatus(project);

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
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
          {project.livePrivate && (
            <button type="button" onClick={() => showToast(PRIVATE_LIVE_MESSAGE)}>Live Demo</button>
          )}
          {!project.livePrivate && project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">Live Demo</a>
          )}
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
            <Search size={18} strokeWidth={2} />
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