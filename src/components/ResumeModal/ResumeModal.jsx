import { useEffect } from 'react';
import { Download } from 'lucide-react';
import '../../resume-modal.css';

// Simple preview modal for the resume: shows the image full-size,
// with an explicit Download button — nothing downloads until the
// user chooses to.
export default function ResumeModal({ open, onClose }) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
        <button className="resume-modal-close" onClick={onClose} aria-label="Close resume preview">
          &times;
        </button>

        <div className="resume-modal-body">
          <img
            src="/images/resume.png"
            alt="Jonee John R. Antiquina — Resume"
            className="resume-modal-img"
          />
        </div>

        <div className="resume-modal-actions">
          <a
            href="/images/resume.png"
            download="Jonee-John-Antiquina-Resume.png"
            className="btn btn-primary"
          >
            <Download size={18} strokeWidth={2} />
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}