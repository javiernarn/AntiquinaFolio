import * as Icons from 'lucide-react';
import { useReveal } from '../../../hooks/useReveal';
import { education } from '../../../data/experience';

function EduCard({ logo, school, degree, meta, desc }) {
  const [ref, revealed] = useReveal();
  const Icon = Icons[logo] || Icons.GraduationCap;
  return (
    <div className={`edu reveal${revealed ? ' in' : ''}`} ref={ref}>
      <div className="edu-logo"><Icon size={22} strokeWidth={2} /></div>
      <h3>{school}</h3>
      <p className="edu-degree">{degree}</p>
      <p className="edu-meta">{meta}</p>
      <p>{desc}</p>
    </div>
  );
}

export default function Education() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="education" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">Education</span>
          <h2>Academic <span className="gradient-text">background</span></h2>
        </div>
        <div className="edu-grid">
          {education.map(e => <EduCard key={e.school} {...e} />)}
        </div>
      </div>
    </section>
  );
}
