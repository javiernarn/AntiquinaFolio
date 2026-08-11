import { useRef, useState } from 'react';
import { ArrowRight, Download, Cpu, Target, Database, Zap } from 'lucide-react';
import { useTypedText } from '../../../hooks/useTypedText';
import { useReveal } from '../../../hooks/useReveal';
import ResumeModal from '../../../components/ResumeModal/ResumeModal';

const PHRASES = ['Programmer', 'Designer', 'Frontend Developer', 'Backend Developer'];

export default function Hero() {
  const typed = useTypedText(PHRASES);
  const [contentRef, contentIn] = useReveal();
  const [visualRef, visualIn] = useReveal();
  const heroRef = useRef(null);
  const cardRef = useRef(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  function onMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -10;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 10;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }

  function onMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = '';
  }

  return (
    <section id="home" className="hero" ref={heroRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="container hero-wrap">
        <div className={`hero-content reveal${contentIn ? ' in' : ''}`} ref={contentRef}>
          <div className="badge"><span className="dot"></span> Available for new projects</div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">Jonee John Rivera Antiquina</span><br />
            <span className="typed-wrap">
              <a href="#">a</a> <span id="typed" className="typed">{typed}</span>
              <span className="caret">|</span>
            </span>
          </h1>
          <p className="hero-sub">
            Programmer, designer and developer (frontend and backend) from CDO City, Philippines.
            I build scalable web applications with Laravel, MySQL and modern frontends — including
            the ATMS Alumni Tracing Management System at alumni.occph.com.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <ArrowRight size={18} strokeWidth={2} />
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => setResumeOpen(true)}>
              <Download size={18} strokeWidth={2} />
              View Resume
            </button>
            <a href="#contact" className="btn btn-ghost">Contact Me</a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/javiernarn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 015.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.08.79 2.18v3.23c0 .31.21.67.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/EphemeralKun/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href="mailto:occ.antiquina.joneejohn@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </a>
          </div>
        </div>
        <div className={`hero-visual reveal${visualIn ? ' in' : ''}`} ref={visualRef}>
          <div className="profile-card" ref={cardRef}>
            <div className="profile-glow"></div>
            <div className="profile-img">
              <img src="/images/propic.png" alt="Jonee John Rivera Antiquina" />
            </div>
            <div className="floating-tag tag-1"><Cpu size={14} strokeWidth={2} /> PHP</div>
            <div className="floating-tag tag-2"><Target size={14} strokeWidth={2} /> Laravel</div>
            <div className="floating-tag tag-3"><Database size={14} strokeWidth={2} /> phpMyAdmin</div>
            <div className="floating-tag tag-4"><Zap size={14} strokeWidth={2} /> Laravel Mix</div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator"><span></span></div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}