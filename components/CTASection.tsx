'use client';

import { useRef, useCallback, useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import ScrollReveal from './ScrollReveal';

/** Particle burst on CTA hover */
function ParticleBurst({ active, parentRef }: { active: boolean; parentRef: React.RefObject<HTMLDivElement | null> }) {
  if (!active) return null;

  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const distance = 40 + Math.random() * 30;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: 3 + Math.random() * 4,
      color: i % 2 === 0 ? 'bg-accent' : 'bg-primary',
      delay: Math.random() * 0.15,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className={`particle ${p.color}`}
          style={{
            left: '50%',
            top: '50%',
            width: p.size,
            height: p.size,
            '--px': `${p.x}px`,
            '--py': `${p.y}px`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function CTASection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [burst, setBurst] = useState(false);

  const handleMouseEnter = useCallback(() => setBurst(true), []);
  const handleMouseLeave = useCallback(() => setBurst(false), []);

  return (
    <section className="py-16 md:py-24" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="scale">
          <div
            ref={sectionRef}
            className="glass-strong rounded-3xl px-8 py-14 md:px-16 md:py-20 relative overflow-hidden group/cta transition-shadow duration-500 hover:shadow-2xl"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Subtle background glow — animated gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl animate-gradient opacity-60"
              style={{ backgroundSize: '200% 200%' }}
              aria-hidden="true"
            />

            {/* Particle burst */}
            <ParticleBurst active={burst} parentRef={sectionRef} />

            <div className="relative">
              <h2 id="cta-heading" className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-4">
                {t.cta.title}
              </h2>
              <p className="text-lg text-muted-fg mb-10 max-w-lg mx-auto">
                {t.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-accent hover:opacity-90 active:opacity-80 rounded-xl transition-all duration-200 shadow-lg cta-glow focus-ring group/btn relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" aria-hidden="true" />
                  <span className="relative z-10">{t.cta.primary}</span>
                  <svg className="w-5 h-5 ml-2 relative z-10 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="#" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-foreground glass rounded-xl transition-all duration-200 hover:bg-glass-bg/60 focus-ring group">
                  <svg className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t.cta.secondary}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
