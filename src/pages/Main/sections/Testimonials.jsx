import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../../../hooks/useReveal';
import { testimonials } from '../../../data/testimonials';

export default function Testimonials() {
  const [headRef, headIn] = useReveal();
  const [sectionRef, sectionIn] = useReveal();
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  function goTo(i) {
    setIndex((i + testimonials.length) % testimonials.length);
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex(i => (i + 1) % testimonials.length), 6000);
  }

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  function handleNav(dir) {
    goTo(index + dir);
    resetTimer();
  }

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className={`section-head reveal${headIn ? ' in' : ''}`} ref={headRef}>
          <span className="eyebrow">Testimonials</span>
          <h2>Kind words from <span className="gradient-text">clients</span></h2>
        </div>
        <div className={`testimonials reveal${sectionIn ? ' in' : ''}`} ref={sectionRef}>
          <button className="t-nav prev" id="tPrev" aria-label="Previous" onClick={() => handleNav(-1)}>‹</button>
          <div className="t-track" id="tTrack" style={{ transform: `translateX(-${index * 100}%)` }}>
            {testimonials.map(t => (
              <div className="t-slide" key={t.name}>
                <div className="t-avatar">{t.avatar}</div>
                <p>"{t.quote}"</p>
                <div className="t-name">{t.name}<span>· {t.role}</span></div>
              </div>
            ))}
          </div>
          <button className="t-nav next" id="tNext" aria-label="Next" onClick={() => handleNav(1)}>›</button>
          <div className="t-dots" id="tDots">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                className={i === index ? 'active' : ''}
                onClick={() => { goTo(i); resetTimer(); }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
