import { useReveal } from '../../../hooks/useReveal';
import { certs } from '../../../data/certs';

function CertCard({ t, i, d, ic }) {
  const [ref, revealed] = useReveal();
  return (
    <div className={`cert reveal${revealed ? ' in' : ''}`} ref={ref}>
      <div className="cert-img">{ic}</div>
      <div className="cert-body">
        <h4>{t}</h4>
        <p>{i} · {d}</p>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [headRef, headIn] = useReveal();
  return (
    <section id="certs" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">Certifications</span>
          <h2>Verified <span className="gradient-text">credentials</span></h2>
        </div>
        <div className="cert-grid" id="certGrid">
          {certs.map(c => <CertCard key={c.t} {...c} />)}
        </div>
      </div>
    </section>
  );
}
