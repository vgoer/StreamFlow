'use client';

import { useI18n } from '@/hooks/useI18n';
import ScrollReveal from './ScrollReveal';

export default function Features() {
  const { t } = useI18n();

  const features = [
    { icon: 'workflow', title: t.features.f1Title, desc: t.features.f1Desc },
    { icon: 'integrations', title: t.features.f2Title, desc: t.features.f2Desc },
    { icon: 'analytics', title: t.features.f3Title, desc: t.features.f3Desc },
    { icon: 'trigger', title: t.features.f4Title, desc: t.features.f4Desc },
    { icon: 'collab', title: t.features.f5Title, desc: t.features.f5Desc },
    { icon: 'security', title: t.features.f6Title, desc: t.features.f6Desc },
  ];

  const iconSvg = (icon: string) => {
    switch (icon) {
      case 'workflow': return <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />;
      case 'integrations': return <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />;
      case 'analytics': return <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />;
      case 'trigger': return <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />;
      case 'collab': return <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />;
      case 'security': return <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />;
      default: return null;
    }
  };

  return (
    <section id="features" className="py-16 md:py-24" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-accent glass rounded-full uppercase tracking-wider mb-4">
              {t.features.badge}
            </span>
            <h2 id="features-heading" className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t.features.title}
            </h2>
            <p className="text-lg text-muted-fg">{t.features.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 70}>
              <div className="group glass-card p-6 rounded-2xl">
                <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-200">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {iconSvg(f.icon)}
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-fg leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
