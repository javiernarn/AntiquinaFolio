import { useEffect, useRef, useState } from 'react';

// Lightweight pub-sub so any component (project cards, the project modal,
// etc.) can trigger a toast without prop-drilling a setter all the way down.
// Mount <ToastHost /> once near the root of the app.
let listeners = [];
let idCounter = 0;

export function showToast(message, opts = {}) {
  const id = ++idCounter;
  const duration = opts.duration ?? 3600;
  listeners.forEach((fn) => fn({ id, message, duration }));
}

export default function ToastHost() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  useEffect(() => {
    function handle(toast) {
      setToasts((t) => [...t, toast]);
      timers.current[toast.id] = setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== toast.id));
        delete timers.current[toast.id];
      }, toast.duration);
    }
    listeners.push(handle);
    return () => {
      listeners = listeners.filter((fn) => fn !== handle);
      Object.values(timers.current).forEach(clearTimeout);
      timers.current = {};
    };
  }, []);

  function dismiss(id) {
    setToasts((t) => t.filter((x) => x.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }

  if (!toasts.length) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast-item" onClick={() => dismiss(t.id)}>
          <span className="toast-dot" />
          <span className="toast-msg">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
