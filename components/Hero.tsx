'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useI18n } from '@/hooks/useI18n';
import { useMousePosition } from '@/hooks/useMousePosition';
import ScrollReveal from './ScrollReveal';

/** Animated background grid */
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Floating orbs */}
      <div className="bg-orb top-[-15%] right-[-10%] w-[55vw] h-[55vw] bg-accent/25 animate-float-slow" style={{ animationDuration: '12s' }} />
      <div className="bg-orb bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-primary/15 animate-float-slow" style={{ animationDuration: '16s', animationDelay: '-6s' }} />
      <div className="bg-orb top-[40%] left-[60%] w-[30vw] h-[30vw] bg-accent/8 animate-float-slow" style={{ animationDuration: '10s', animationDelay: '-3s' }} />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--fg) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--bg)_80%)]" />
    </div>
  );
}

export default function Hero() {
  const { t } = useI18n();
  const { x, y, nx, ny } = useMousePosition({ throttle: 16 });
  const [glowVisible, setGlowVisible] = useState(false);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setGlowVisible(!isTouch);
  }, []);

  // CTA magnetic hover
  const [ctaHover, setCtaHover] = useState(false);
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  const handleCtaMove = useCallback((e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setCtaOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.35,
      y: (e.clientY - rect.top - rect.height / 2) * 0.35,
    });
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 overflow-hidden" aria-labelledby="hero-heading">
      {/* Animated background */}
      <AnimatedGrid />

      {/* Cursor-following ambient glow — visible on all desktop sizes */}
      {glowVisible && (
        <div
          className="cursor-glow hidden sm:block"
          style={{
            left: x,
            top: y,
            opacity: 0.15,
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge — living pulse */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm font-medium text-accent mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              {t.hero.badge}
            </div>

            <h1 id="hero-heading" className="font-[family-name:var(--font-heading)] font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] text-foreground mb-6">
              <span className="animate-fade-in-up">{t.hero.headline1}</span>
              <br />
              <span
                className="text-gradient animate-fade-in-up"
                style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}
              >
                {t.hero.headline2}
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-muted-fg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up"
              style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}
            >
              {t.hero.subtitle}{' '}
              <strong className="text-foreground font-semibold relative inline-block">
                <span className="shimmer-text">{t.hero.subtitleHighlight}</span>
              </strong>
              。
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}
            >
              {/* Primary CTA — pulsing glow ring */}
              <a
                href="#pricing"
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => { setCtaHover(false); setCtaOffset({ x: 0, y: 0 }); }}
                onMouseMove={handleCtaMove}
                className="magnetic-area inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-accent rounded-xl shadow-lg focus-ring relative overflow-hidden group/btn"
                style={{
                  transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px)`,
                  boxShadow: ctaHover
                    ? '0 0 40px rgba(14,165,233,0.5), 0 8px 32px rgba(14,165,233,0.3)'
                    : '0 0 20px rgba(14,165,233,0.25), 0 4px 16px rgba(14,165,233,0.15)',
                  transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
                }}
              >
                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-xl border-2 border-accent animate-ping-once opacity-0 group-hover/btn:opacity-100" style={{ animationIterationCount: 'infinite', animationDuration: '1.5s' }} aria-hidden="true" />
                {/* Scan line */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600" style={{ transitionDuration: '0.6s' }} aria-hidden="true" />
                <span className="relative z-10">{t.hero.ctaPrimary}</span>
                <svg className="w-5 h-5 ml-2 relative z-10 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              {/* Secondary CTA */}
              <a href="#how-it-works" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-foreground glass rounded-xl transition-all duration-200 hover:bg-glass-bg/60 hover:scale-105 focus-ring group">
                <svg className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-muted-fg animate-fade-in-up"
              style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}
            >
              {[t.hero.noCard, t.hero.freeTrial, t.hero.cancelAnytime].map((text, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Mockup — mouse-driven 3D tilt + animated bars */}
          <div
            className="relative animate-fade-in-up"
            style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}
            aria-hidden="true"
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-card backdrop-blur-sm"
              style={{
                transform: `perspective(1200px) rotateX(${ny * -4}deg) rotateY(${nx * 6}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Glowing border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(14,165,233,0.08)',
                }}
                aria-hidden="true"
              />

              {/* Mock Header */}
              <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white dark:bg-slate-800 rounded-md px-3 py-1.5 text-xs text-muted-fg border border-border text-center">
                    app.streamflow.io
                  </div>
                </div>
              </div>

              {/* Mock Content */}
              <div className="p-5 space-y-4">
                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { color: 'bg-accent/10', textColor: 'text-accent', label: 'Active', value: '247' },
                    { color: 'bg-emerald-50 dark:bg-emerald-500/10', textColor: 'text-emerald-600 dark:text-emerald-400', label: 'Done', value: '12.4K' },
                    { color: 'bg-amber-50 dark:bg-amber-500/10', textColor: 'text-amber-600 dark:text-amber-400', label: 'Saved', value: '86%' },
                  ].map((stat, i) => (
                    <div key={i} className={`${stat.color} rounded-lg p-3 text-center transition-transform duration-200`}>
                      <div className={`text-xs font-medium mb-0.5 ${stat.textColor}`}>{stat.label}</div>
                      <div className="text-xl font-[family-name:var(--font-heading)] font-bold text-foreground stat-number">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Animated Bar Chart */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end gap-1 h-24">
                    {[55, 70, 45, 85, 60, 95, 80].map((h, i) => (
                      <div key={i} className="flex-1 relative">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-accent/30 rounded-t-md"
                          style={{
                            height: `${h}%`,
                            animation: `fadeInUp 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms backwards`,
                          }}
                        />
                        {/* Shimmer on tallest bar */}
                        {h >= 85 && (
                          <div
                            className="absolute bottom-0 left-0 right-0 rounded-t-md bg-gradient-to-t from-accent/40 to-accent/10 animate-pulse-soft"
                            style={{ height: `${h}%` }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-fg">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
                  </div>
                </div>

                {/* Task List */}
                <div className="space-y-2">
                  {[
                    { done: true, text: 'Customer data sync', status: 'Done', statusColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20' },
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
            <div className="absolute -bottom-4 -left-4 glass-strong rounded-xl px-4 py-3 animate-float shadow-xl" style={{ animationDuration: '5s' }} aria-hidden="true">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
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
