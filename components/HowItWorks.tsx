'use client';

import { useI18n } from '@/hooks/useI18n';
import ScrollReveal from './ScrollReveal';

export default function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    { num: 1, title: t.how.step1Title, desc: t.how.step1Desc },
    { num: 2, title: t.how.step2Title, desc: t.how.step2Desc },
    { num: 3, title: t.how.step3Title, desc: t.how.step3Desc },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-accent glass rounded-full uppercase tracking-wider mb-4">
              {t.how.badge}
            </span>
            <h2 id="how-heading" className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t.how.title}
            </h2>
            <p className="text-lg text-muted-fg">{t.how.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 120} direction={i === 1 ? 'scale' : 'up'}>
              <div className="text-center relative group">
                {/* Step number — with hover pop */}
                <div className={`w-16 h-16 ${i < 2 ? 'bg-accent group-hover:scale-110 group-hover:shadow-lg' : 'bg-emerald-500 group-hover:scale-110 group-hover:shadow-lg'} text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md transition-all duration-300 text-xl font-[family-name:var(--font-heading)] font-bold`}>
                  {step.num}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-fg leading-relaxed">{step.desc}</p>
                {/* Arrow — animated pulse on desktop */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-6 text-border animate-pulse-soft" aria-hidden="true">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
