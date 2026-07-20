import { useReveal } from '../../../hooks/useReveal';
import { services } from '../../../data/services';

function ServiceCard({ icon, title, desc }) {
  const [ref, revealed] = useReveal();
  return (
    <article className={`service reveal${revealed ? ' in' : ''}`} ref={ref}>
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </article>
  );
}

export default function Services() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="services" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">Services</span>
          <h2>What I can build <span className="gradient-text">for you</span></h2>
          <p>End-to-end product engineering with care for detail.</p>
        </div>
        <div className="services-grid">
          {services.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}
