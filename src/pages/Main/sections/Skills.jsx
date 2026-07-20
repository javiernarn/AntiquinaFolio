import { useReveal } from '../../../hooks/useReveal';
import { skillGroups } from '../../../data/skills';

function SkillCard({ title, items }) {
  const [ref, revealed] = useReveal();
  return (
    <div className={`skill-card reveal${revealed ? ' in' : ''}`} ref={ref}>
      <h3>{title}</h3>
      <div className="skill-list">
        {items.map(s => (
          <div className="skill" key={s.label}>
            <span>{s.label}</span><span>{s.pct}%</span>
            <div className="bar"><i className={revealed ? 'in' : ''} style={{ '--p': `${s.pct}%` }}></i></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">Skills</span>
          <h2>A modern, <span className="gradient-text">battle-tested</span> stack</h2>
          <p>Tools and technologies I use to deliver production-grade work.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map(g => <SkillCard key={g.title} {...g} />)}
        </div>
      </div>
    </section>
  );
}
