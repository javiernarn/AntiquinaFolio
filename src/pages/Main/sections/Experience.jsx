import { useReveal } from '../../../hooks/useReveal';
import { timeline } from '../../../data/experience';

function TimelineItem({ date, title, desc }) {
  const [ref, revealed] = useReveal();
  return (
    <div className={`t-item reveal${revealed ? ' in' : ''}`} ref={ref}>
      <div className="t-dot"></div>
      <div className="t-card">
        <div className="t-date">{date}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function Experience() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">Experience</span>
          <h2>A journey of <span className="gradient-text">building</span></h2>
        </div>
        <div className="timeline">
          {timeline.map(t => <TimelineItem key={t.title} {...t} />)}
        </div>
      </div>
    </section>
  );
}
