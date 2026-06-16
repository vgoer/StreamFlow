'use client';

import { useI18n } from '@/hooks/useI18n';

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 overflow-hidden" aria-labelledby="hero-heading">
      {/* Background Orbs */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-orb top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-accent/20" />
        <div className="bg-orb bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-background/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm font-medium text-accent mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              {t.hero.badge}
            </div>

            <h1 id="hero-heading" className="font-[family-name:var(--font-heading)] font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6 animate-fade-in-up">
              {t.hero.headline1}
              <br />
              <span className="text-gradient">{t.hero.headline2}</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-fg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
              {t.hero.subtitle}{' '}
              <strong className="text-foreground font-semibold">{t.hero.subtitleHighlight}</strong>。
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start" style={{ animationDelay: '200ms', animationFillMode: 'backwards', animationName: 'fadeInUp', animationDuration: '0.6s' }}>
              <a href="#pricing" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-accent hover:opacity-90 active:opacity-80 rounded-xl transition-all duration-200 shadow-lg cta-glow focus-ring">
                {t.hero.ctaPrimary}
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a href="#how-it-works" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-foreground glass rounded-xl transition-all duration-200 hover:bg-glass-bg/50 focus-ring">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-muted-fg" style={{ animationDelay: '300ms', animationFillMode: 'backwards', animationName: 'fadeInUp', animationDuration: '0.6s' }}>
              {[t.hero.noCard, t.hero.freeTrial, t.hero.cancelAnytime].map((text, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative" style={{ animationDelay: '200ms', animationFillMode: 'backwards', animationName: 'fadeInUp', animationDuration: '0.6s' }} aria-hidden="true">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card backdrop-blur-sm">
              {/* Mock Header */}
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1.5 text-xs text-muted-fg border border-border text-center">app.streamflow.io</div>
                </div>
              </div>
              {/* Mock Content */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { color: 'bg-accent/10', textColor: 'text-accent', label: 'Active', value: '247' },
                    { color: 'bg-emerald-50', textColor: 'text-emerald-600', label: 'Done', value: '12.4K' },
                    { color: 'bg-amber-50', textColor: 'text-amber-600', label: 'Saved', value: '86%' },
                  ].map((stat, i) => (
                    <div key={i} className={`${stat.color} rounded-lg p-3 text-center`}>
                      <div className={`text-xs font-medium mb-0.5 ${stat.textColor}`}>{stat.label}</div>
                      <div className="text-xl font-[family-name:var(--font-heading)] font-bold text-foreground">{stat.value}</div>
                    </div>
                  ))}
                </div>
                {/* Chart */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end gap-1 h-24">
                    {[40, 60, 35, 75, 55, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-accent/30 rounded-t-md" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-fg">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
                  </div>
                </div>
                {/* Task List */}
                <div className="space-y-2">
                  {[
                    { done: true, text: 'Customer data sync', status: 'Done', statusColor: 'text-emerald-600 bg-emerald-100' },
                    { done: false, text: 'Invoice auto-generation', status: 'Running', statusColor: 'text-accent bg-accent/10', pulse: true },
                    { done: false, text: 'Weekly report email', status: 'Queued', statusColor: 'text-muted-fg bg-muted' },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {task.done ? (
                        <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      ) : (
                        <div className={`w-4 h-4 border-2 rounded-full flex-shrink-0 ${task.pulse ? 'border-accent animate-pulse-soft' : 'border-border'}`} />
                      )}
                      <span className="text-foreground">{task.text}</span>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${task.statusColor}`}>{task.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 glass-strong rounded-xl px-4 py-3 animate-float" aria-hidden="true">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <div className="text-xs text-muted-fg">Monthly automated</div>
                  <div className="text-lg font-[family-name:var(--font-heading)] font-bold text-foreground">48,293</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
