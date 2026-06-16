'use client';

import { useRef, useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';

/** Single stat with count-up animation triggered by IntersectionObserver */
function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [display, setDisplay] = useState('—');

  // Trigger when visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setTriggered(true);
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  // Run count-up animation
  useEffect(() => {
    if (!triggered) return;

    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPart)) {
      setDisplay(value);
      return;
    }

    const suffix = value.match(/[^0-9.]+$/) || [];
    const actualSuffix = suffix[0] || '';
    const duration = 2000;
    const startTime = performance.now();
    let raf: number;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = eased * numericPart;

      if (actualSuffix === '%') {
        setDisplay(`${Math.round(current)}${actualSuffix}`);
      } else if (value.includes('.')) {
        setDisplay(`${current.toFixed(1)}${actualSuffix}`);
      } else {
        setDisplay(`${Math.round(current)}${actualSuffix}`);
      }

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    const timer = setTimeout(() => {
      raf = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [triggered, value, delay]);

  return (
    <div ref={ref}>
      <div
        className={`stat-number font-[family-name:var(--font-heading)] font-bold text-4xl sm:text-5xl text-white mb-2 transition-all duration-500 ${
          triggered ? 'animate-count-in opacity-100' : 'opacity-0'
        }`}
      >
        {display}
      </div>
      <div className="text-white/70 text-sm font-medium">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { t } = useI18n();

  const stats = [
    { value: '10K+', label: t.stats.s1Label },
    { value: '2.5M+', label: t.stats.s2Label },
    { value: '300%', label: t.stats.s3Label },
    { value: '99.9%', label: t.stats.s4Label },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden" aria-label="Statistics">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/8 via-transparent to-white/8 animate-gradient opacity-40" style={{ backgroundSize: '200% 200%' }} aria-hidden="true" />
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <AnimatedStat key={i} value={s.value} label={s.label} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
