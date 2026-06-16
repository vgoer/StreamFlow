'use client';

import { useI18n } from '@/hooks/useI18n';
import ScrollReveal from './ScrollReveal';

export default function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24" aria-labelledby="cta-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="glass-strong rounded-3xl px-8 py-14 md:px-16 md:py-20 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 id="cta-heading" className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-4">
                {t.cta.title}
              </h2>
              <p className="text-lg text-muted-fg mb-10 max-w-lg mx-auto">
                {t.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-accent hover:opacity-90 active:opacity-80 rounded-xl transition-all duration-200 shadow-lg cta-glow focus-ring">
                  {t.cta.primary}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a href="#" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-foreground glass rounded-xl transition-all duration-200 hover:bg-glass-bg/60 focus-ring">
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
