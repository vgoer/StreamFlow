'use client';

import { useI18n } from '@/hooks/useI18n';

const logos = [
  { name: 'Acme', shape: 'rect' },
  { name: 'TechFlow', shape: 'circle' },
  { name: 'Nexus', shape: 'polygon' },
  { name: 'CloudBase', shape: 'rect' },
  { name: 'DataSync', shape: 'square' },
  { name: 'ScaleUp', shape: 'triangle' },
];

export default function SocialProof() {
  const { t } = useI18n();

  return (
    <section className="py-10 md:py-12 glass border-y border-border" aria-label={t.socialProof.title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-fg mb-8">{t.socialProof.title}</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center opacity-50">
          {logos.map(logo => (
            <div key={logo.name} className="flex items-center gap-2 text-muted-fg">
              <div className="w-6 h-6 bg-current opacity-30 rounded" />
              <span className="font-[family-name:var(--font-heading)] font-semibold text-sm hidden sm:inline">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
