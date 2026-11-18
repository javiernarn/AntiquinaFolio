import { useEffect } from 'react';
import { useDataTheme } from '../../hooks/useDataTheme';
import { showToast } from '../Toast/Toast';

const PRIVATE_LIVE_MESSAGE = "This portfolio is private — the client asked that the live link not be shared, so visiting it isn't available.";

export default function Modal({ project, onClose }) {
  const open = Boolean(project);
  const theme = useDataTheme();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className={`modal${open ? ' open' : ''}`} id="modal">
      <div className="modal-backdrop" data-close onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close" data-close aria-label="Close" onClick={onClose}>×</button>
        <div className="modal-body" id="modalBody">
          {project && (
            <>
              <h2>{project.title}</h2>
              <div className="tech">
                {project.tech.map(t => <span key={t}>{t}</span>)}
              </div>
              <div className="modal-img">
                <img
                  src={project.img[theme] || project.img.dark}
                  alt={`${project.title} preview`}
                />
              </div>
              <p>{project.desc}</p>
              <p>
                This project demonstrates end-to-end product engineering — from architecture
                decisions to a polished, accessible interface. Built with performance,
                scalability, and maintainability in mind.
              </p>
              <div className="project-actions" style={{ marginTop: 18 }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  View on GitHub
                </a>
                )}
                {project.livePrivate && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => showToast(PRIVATE_LIVE_MESSAGE)}
                  >
                    Live Demo
                  </button>
                )}
                {!project.livePrivate && project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Live Demo
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}