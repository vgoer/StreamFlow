'use client';

import { useI18n } from '@/hooks/useI18n';
import ScrollReveal from './ScrollReveal';

export default function Problem() {
  const { t } = useI18n();

  const problems = [
    { icon: 'alert', color: 'bg-red-100 dark:bg-red-500/10 text-red-500', title: t.problem.p1Title, desc: t.problem.p1Desc },
    { icon: 'cost', color: 'bg-amber-100 dark:bg-amber-500/10 text-amber-500', title: t.problem.p2Title, desc: t.problem.p2Desc },
    { icon: 'error', color: 'bg-orange-100 dark:bg-orange-500/10 text-orange-500', title: t.problem.p3Title, desc: t.problem.p3Desc },
  ];

  return (
    <section className="py-16 md:py-24" aria-labelledby="problem-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-accent glass rounded-full uppercase tracking-wider mb-4">
              {t.problem.badge}
            </span>
            <h2 id="problem-heading" className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t.problem.title}
            </h2>
            <p className="text-lg text-muted-fg">
              {t.problem.subtitle} <strong className="text-foreground">{t.problem.subtitleHighlight}</strong> {t.problem.subtitleEnd}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <ScrollReveal key={i} delay={i * 100} direction="up">
              <div className="text-center glass-card p-6 group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className={`w-14 h-14 ${p.color.split(' ')[0]} ${p.color.split(' ')[1] || ''} rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                  {p.icon === 'alert' && (
                    <svg className={`w-7 h-7 ${p.color.split(' ')[2] || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                  {p.icon === 'cost' && (
                    <svg className={`w-7 h-7 ${p.color.split(' ')[2] || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                  {p.icon === 'error' && (
                    <svg className={`w-7 h-7 ${p.color.split(' ')[2] || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-fg leading-relaxed">{p.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
