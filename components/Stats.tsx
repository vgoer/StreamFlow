'use client';

import { useI18n } from '@/hooks/useI18n';
import ScrollReveal from './ScrollReveal';

export default function Stats() {
  const { t } = useI18n();

  const stats = [
    { value: '10K+', label: t.stats.s1Label },
    { value: '2.5M+', label: t.stats.s2Label },
    { value: '300%', label: t.stats.s3Label },
    { value: '99.9%', label: t.stats.s4Label },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-secondary" aria-label="Statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="stat-number font-[family-name:var(--font-heading)] font-bold text-4xl sm:text-5xl text-white mb-2">
                {s.value}
              </div>
              <div className="text-white/70 text-sm font-medium">{s.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
