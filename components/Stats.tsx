'use client';

import { useRef, useState, useEffect } from 'react';
import { useI18n } from '@/hooks/useI18n';

const statIcons = [
  // Active teams — users icon
  <path key="a" strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
  // Tasks/day — lightning bolt
  <path key="b" strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  // Efficiency — trending up
  <path key="c" strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />,
  // Uptime — check shield
  <path key="d" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
];

const accentColors = [
  'from-violet-500 to-purple-600',
  'from-sky-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
];

const bgGlows = [
  'bg-violet-500/10',
  'bg-sky-500/10',
  'bg-emerald-500/10',
  'bg-amber-500/10',
];

function AnimatedNumber({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [display, setDisplay] = useState('—');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTriggered(true);
      setDisplay(value);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.unobserve(el); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  useEffect(() => {
    if (!triggered) return;

    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(num)) { setDisplay(value); return; }

    const suffix = (value.match(/[^0-9.]+$/) || [])[0] || '';
    const dur = 1800;
    const t0 = performance.now();
    let raf: number;

    const ease = (t: number) => 1 - Math.pow(2, -10 * t);

    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const cur = ease(p) * num;
      setDisplay(value.includes('.') ? `${cur.toFixed(1)}${suffix}` : `${Math.round(cur)}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(t); if (raf) cancelAnimationFrame(raf); };
  }, [triggered, value, delay]);

  return <span ref={ref}>{display}</span>;
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
    <section className="relative py-20 md:py-28 overflow-hidden" aria-label="Statistics">
      {/* Background — uses page background, just adds subtle glow */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative group"
            >
              {/* Card */}
              <div className="relative rounded-2xl p-6 text-center overflow-hidden
                border border-border hover:border-accent/20
                transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                bg-card backdrop-blur-sm"
              >
                {/* Top color accent bar */}
                <div className={`absolute top-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r ${accentColors[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true" />

                {/* Icon */}
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${accentColors[i]} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    {statIcons[i]}
                  </svg>
                </div>

                {/* Number */}
                <div className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-1.5 tracking-tight stat-number">
                  <AnimatedNumber value={s.value} delay={i * 100} />
                </div>

                {/* Label */}
                <div className="text-sm font-medium text-muted-fg">{s.label}</div>

                {/* Background glow on hover */}
                <div className={`absolute inset-0 rounded-2xl ${bgGlows[i]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
