import { useEffect, useState } from 'react';

// Shows the branded loading screen for a few seconds, then fades out.
// Runs once on mount (e.g. a hard refresh on "/"), and again any time
// `trigger` changes (e.g. clicking the "Jonee.dev" logo).
export default function Loader({ trigger = 0 }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Reset every time trigger changes so the animation replays from the start
    setVisible(true);
    setFading(false);

    const fadeTimer = setTimeout(() => setFading(true), 7000);
    const hideTimer = setTimeout(() => setVisible(false), 7500); // matches CSS transition

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [trigger]);

  if (!visible) return null;

  return (
    <div className="loader" id="loader" style={{ opacity: fading ? 0 : 1 }}>
      <div className="loader-inner">
        <div className="loader-logo">JJRA</div>
        <div className="loader-bar"><span></span></div>
      </div>
    </div>
  );
}