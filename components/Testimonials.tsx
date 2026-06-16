'use client';

import { useRef, useCallback, useState } from 'react';
import { useI18n } from '@/hooks/useI18n';
import ScrollReveal from './ScrollReveal';

function TestimonialCard({ quote, name, role, gradient, delay = 0 }: {
  quote: string; name: string; role: string; gradient: string; delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -cy * 4, ry: cx * 4 });
  }, []);

  const handleLeave = useCallback(() => setTilt({ rx: 0, ry: 0 }), []);

  return (
    <ScrollReveal delay={delay}>
      <figure
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="glass-card p-6 transition-shadow duration-300 hover:shadow-xl"
        style={{
          transform: `perspective(600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: tilt.rx === 0 && tilt.ry === 0 ? 'transform 0.4s ease-out' : 'none',
        }}
      >
        <div className="flex gap-1 mb-4" aria-label="5 star rating">
          {[...Array(5)].map((_, j) => (
            <svg key={j} className="w-5 h-5 text-amber-400 transition-transform duration-200 hover:scale-125" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <blockquote className="text-muted-fg leading-relaxed mb-5">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-[family-name:var(--font-heading)] font-semibold text-sm transition-transform duration-300 hover:scale-110`}>
            {name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-sm text-foreground">{name}</div>
            <div className="text-xs text-muted-fg">{role}</div>
          </div>
        </figcaption>
      </figure>
    </ScrollReveal>
  );
}

export default function Testimonials() {
  const { t } = useI18n();

  const testimonials = [
    { quote: t.testimonials.t1Quote, name: t.testimonials.t1Name, role: t.testimonials.t1Role, gradient: 'from-accent to-blue-400' },
    { quote: t.testimonials.t2Quote, name: t.testimonials.t2Name, role: t.testimonials.t2Role, gradient: 'from-amber-500 to-orange-500' },
    { quote: t.testimonials.t3Quote, name: t.testimonials.t3Name, role: t.testimonials.t3Role, gradient: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-accent glass rounded-full uppercase tracking-wider mb-4">
              {t.testimonials.badge}
            </span>
            <h2 id="testimonials-heading" className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t.testimonials.title}
            </h2>
            <p className="text-lg text-muted-fg">{t.testimonials.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <TestimonialCard key={i} {...item} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
