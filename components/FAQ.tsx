'use client';

import { useI18n } from '@/hooks/useI18n';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function FAQ() {
  const { t } = useI18n();

  const items = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-16 md:py-24" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-accent glass rounded-full uppercase tracking-wider mb-4">
              {t.faq.badge}
            </span>
            <h2 id="faq-heading" className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl text-foreground mb-4">
              {t.faq.title}
            </h2>
            <p className="text-lg text-muted-fg">{t.faq.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="space-y-3" role="list">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div
                className={`faq-item glass border border-border rounded-xl transition-all duration-300 ${
                  openIndex === i ? 'open shadow-md' : 'hover:border-accent/20'
                }`}
                role="listitem"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus-ring rounded-xl group"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-foreground pr-4 group-hover:text-accent transition-colors duration-200">{item.q}</span>
                  <svg
                    className="faq-icon w-5 h-5 text-muted-fg flex-shrink-0 group-hover:text-accent transition-colors duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className="faq-answer">
                  <div className="px-6 pb-5 text-muted-fg leading-relaxed">{item.a}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
