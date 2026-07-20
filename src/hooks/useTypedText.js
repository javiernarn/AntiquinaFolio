import { useEffect, useState } from 'react';

export function useTypedText(phrases, typeSpeed = 80, deleteSpeed = 40, pause = 1400) {
  const [text, setText] = useState('');

  useEffect(() => {
    let pi = 0;
    let ci = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const word = phrases[pi];
      setText(word.slice(0, ci));

      if (!deleting && ci < word.length) {
        ci++;
        timer = setTimeout(tick, typeSpeed);
      } else if (deleting && ci > 0) {
        ci--;
        timer = setTimeout(tick, deleteSpeed);
      } else {
        deleting = !deleting;
        if (!deleting) pi = (pi + 1) % phrases.length;
        timer = setTimeout(tick, deleting ? pause : 300);
      }
    };

    tick();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases.join('|'), typeSpeed, deleteSpeed, pause]);

  return text;
}
