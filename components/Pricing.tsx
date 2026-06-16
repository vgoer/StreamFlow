'use client';

import { useI18n } from '@/hooks/useI18n';
import ScrollReveal from './ScrollReveal';

export default function Pricing() {
  const { t } = useI18n();

  const plans = [
    {
      name: t.pricing.free,
      desc: t.pricing.freeDesc,
      price: t.pricing.freePrice,
      period: t.pricing.freePeriod,
      features: [t.pricing.freeFeature1, t.pricing.freeFeature2, t.pricing.freeFeature3, t.pricing.freeFeature4],
      cta: t.pricing.freeCTA,
      featured: false,
    },
    {
      name: t.pricing.pro,
      desc: t.pricing.proDesc,
      price: t.pricing.proPrice,
      period: t.pricing.proPeriod,
      features: [t.pricing.proFeature1, t.pricing.proFeature2, t.pricing.proFeature3, t.pricing.proFeature4, t.pricing.proFeature5],
      cta: t.pricing.proCTA,
      featured: true,
      badge: t.pricing.proBadge,
    },
    {
      name: t.pricing.enterprise,
      desc: t.pricing.enterpriseDesc,
      price: t.pricing.enterprisePrice,
      period: '',
      features: [t.pricing.enterpriseFeature1, t.pricing.enterpriseFeature2, t.pricing.enterpriseFeature3, t.pricing.enterpriseFeature4, t.pricing.enterpriseFeature5],
      cta: t.pricing.enterpriseCTA,
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24" aria-labelledby="pricing-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-accent glass rounded-full uppercase tracking-wider mb-4">
              {t.pricing.badge}
            </span>
            <h2 id="pricing-heading" className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t.pricing.title}
            </h2>
            <p className="text-lg text-muted-fg">{t.pricing.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className={`relative rounded-2xl p-8 ${plan.featured ? 'pricing-featured glass-strong' : 'glass-card'}`}>
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-fg text-sm mb-5">{plan.desc}</p>
                <div className="mb-6">
                  <span className="font-[family-name:var(--font-heading)] font-bold text-5xl text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-fg text-sm">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8" role="list">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={j < 2 && plan.featured ? 'text-foreground font-medium' : 'text-muted-fg'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`block w-full text-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 focus-ring ${
                    plan.featured
                      ? 'text-white bg-accent hover:opacity-90 active:opacity-80 shadow-lg cta-glow'
                      : 'text-foreground glass hover:bg-glass-bg/60'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
