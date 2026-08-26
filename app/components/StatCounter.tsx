'use client';

import { useEffect, useRef, useState } from 'react';

type StatCounterProps = {
  end: number;
  durationMs?: number;
  suffix?: string;
  className?: string;
};

export default function StatCounter({ end, durationMs = 1500, suffix = '', className = '' }: StatCounterProps) {
  const [value, setValue] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();

          if (mediaQuery.matches) {
            setValue(end);
            return;
          }

          const startTs = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTs;
            const progress = Math.min(elapsed / durationMs, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * end);
            setValue(current);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [end, durationMs, started]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {value}
      {suffix}
    </span>
  );
}


