import { useReveal } from '../../../hooks/useReveal';
import { useCounter } from '../../../hooks/useCounter';
import { stats } from '../../../data/skills';

function Stat({ count, label }) {
  const [ref, revealed] = useReveal();
  const value = useCounter(count, revealed);
  return (
    <div className={`stat reveal${revealed ? ' in' : ''}`} ref={ref}>
      <div className="stat-num">{value}{count >= 25 ? '+' : ''}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const [headRef, headIn] = useReveal();
  const [imgRef, imgIn] = useReveal();
  const [textRef, textIn] = useReveal();

  return (
    <section id="about" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">About Me</span>
          <h2>Crafting digital products with <span className="gradient-text">precision</span></h2>
          <p>Building thoughtful, performant software across the stack — from the Philippines to the world.</p>
        </div>
        <div className="about-grid">
          <div className={`about-img reveal${imgIn ? ' in' : ''}`} ref={imgRef}>
            <div className="about-img-inner">
              <img src="/images/propic1.jpeg" alt="Jonee John Rivera Antiquina" />
            </div>
          </div>
          <div className={`about-text reveal${textIn ? ' in' : ''}`} ref={textRef}>
            <h3>A passionate programmer, designer and developer (frontend and backend).</h3>
            <p>
              I'm Jonee John Rivera Antiquina (JJRA), a programmer, designer and developer
              (frontend and backend) based in Cagayan de Oro City, Philippines. I specialize
              in building elegant, scalable web applications with Laravel and MySQL, and
              modern PWAs with React and Vite — from database schema to pixel-perfect interfaces.
            </p>
            <p>
              For <strong>Opol Community College</strong>, I've designed and built three core
              campus systems. The <strong>ATMS — Alumni Tracing Management System</strong> is
              live at{' '}
              <a href="https://alumniappv2.ethiodeploy.app" target="_blank" rel="noopener noreferrer">
                alumniappv2.ethiodeploy.app
              </a>
              , powered by Laravel, Laravel Mix and MySQL (managed through phpMyAdmin). The{' '}
              <strong>OCC Duty Log — OJT Tracker</strong> is a phone-first PWA that logs
              trainees' daily time-in/out in real time, with shift reminders and PDF duty reports. And <strong>SCLF — Smart Campus Lost &amp; Found</strong>{' '}
              is a Laravel + React system with role-based access for students, security officers
              and admins, automatic lost-found matching, and QR-verified item release.
            </p>
            <p>
              Beyond OCC, I've expanded further into React, Vite and PWAs — building a
              client-side QR Code Builder, a Firebase-backed interactive letter app with its own
              admin dashboard, and several personal portfolio sites (including this one), each
              shipped and deployed on Vercel.
            </p>
            <ul className="about-list">
              <li><strong>Location:</strong> Brgy. Iponan Zone 1C Kinasanghan, CDO City, Misamis Oriental, Philippines</li>
              <li><strong>Languages:</strong> English, Filipino, Bisaya</li>
              <li><strong>Focus:</strong> Laravel, MySQL, React, Vite, PWA, Web & Portfolio Apps</li>
            </ul>
          </div>
        </div>
        <div className="stats">
          {stats.map(s => <Stat key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}
