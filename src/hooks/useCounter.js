import { useEffect, useState } from 'react';

// Counts up from 0 to `target` once `start` becomes true.
export function useCounter(target, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 50));
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) {
        cur = target;
        clearInterval(t);
      }
      setValue(cur);
    }, 30);
    return () => clearInterval(t);
  }, [target, start]);

  return value;
}
