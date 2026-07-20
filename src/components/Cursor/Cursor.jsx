import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isTouch] = useState(
    () => window.matchMedia('(hover: none), (pointer: coarse)').matches
  );

  useEffect(() => {
    if (isTouch) {
      document.body.style.cursor = 'auto';
      return;
    }

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let raf;

    function onMove(e) {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
      }
    }

    function animate() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(animate);
    }

    function onEnter() { cursorRef.current?.classList.add('hover'); }
    function onLeave() { cursorRef.current?.classList.remove('hover'); }

    window.addEventListener('mousemove', onMove);
    animate();

    const targets = document.querySelectorAll('a, button, input, textarea, .project, .cert');
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}></div>
      <div className="cursor-dot" id="cursorDot" ref={dotRef}></div>
    </>
  );
}
