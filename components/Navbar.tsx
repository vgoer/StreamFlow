'use client';

import { useI18n } from '@/hooks/useI18n';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect, useCallback, type FC } from 'react';

const SECTION_IDS = ['features', 'how-it-works', 'testimonials', 'pricing', 'faq'] as const;

/** Map section ID → i18n key */
const navKeyMap: Record<string, string> = {
  'features': 'features',
  'how-it-works': 'howItWorks',
  'testimonials': 'testimonials',
  'pricing': 'pricing',
  'faq': 'faq',
};

const Navbar: FC = () => {
  const { t, lang, setLang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  // Scroll tracking — throttled
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Navbar shadow trigger
          setScrolled(window.scrollY > 10);

          // Scroll progress (0–100%)
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
          setScrollProgress(Math.min(progress, 100));

          // Active section detection
          for (const id of SECTION_IDS) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 120 && rect.bottom >= 120) {
                setActiveSection(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = useCallback(() => setLang(lang === 'zh' ? 'en' : 'zh'), [lang, setLang]);

  const linkClass =
    'text-sm font-medium text-muted-fg hover:text-foreground transition-colors duration-200 focus-ring rounded relative py-1';

  const isActive = (id: string) => activeSection === id;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'nav-glass shadow-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      {/* Scroll progress bar — thin line at very top */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent to-primary transition-opacity duration-300"
        style={{ width: `${scrollProgress}%`, opacity: scrolled ? 1 : 0 }}
        aria-hidden="true"
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label={lang === 'zh' ? '主导航' : 'Main navigation'}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 focus-ring rounded-lg group" aria-label="StreamFlow Home">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-[family-name:var(--font-heading)] font-bold text-xl text-foreground">StreamFlow</span>
          </a>

          {/* Desktop Links — with active indicator */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {SECTION_IDS.map(id => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={linkClass}
                >
                  {t.nav[navKeyMap[id] as keyof typeof t.nav] as string}
                  {isActive(id) && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent animate-scale-in" aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={toggleLang}
              className="text-sm font-medium text-muted-fg hover:text-foreground transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-muted focus-ring"
              aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <a href="#pricing" className="text-sm font-semibold text-foreground hover:text-accent transition-colors duration-200 px-4 py-2 focus-ring rounded">
              {t.nav.viewPlans}
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:opacity-90 active:opacity-80 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus-ring cta-glow group/btn relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" aria-hidden="true" />
              <span className="relative z-10">{t.nav.startFree}</span>
              <svg className="w-4 h-4 ml-1.5 relative z-10 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={toggleLang}
              className="text-sm font-medium text-muted-fg hover:text-foreground px-2 py-1.5 rounded-lg focus-ring"
              aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {lang === 'zh' ? 'EN' : '中文'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-muted-fg hover:text-foreground focus-ring rounded-lg"
              aria-label={menuOpen ? (lang === 'zh' ? '关闭菜单' : 'Close menu') : (lang === 'zh' ? '打开菜单' : 'Open menu')}
              aria-expanded={menuOpen}
            >
              <svg className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu — spring-like animation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-350 ease-spring ${
            menuOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          role="navigation"
        >
          <div className="space-y-1 border-t border-border pt-4">
            {SECTION_IDS.map(id => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive(id)
                    ? 'text-accent bg-accent/5'
                    : 'text-muted-fg hover:text-foreground hover:bg-muted'
                }`}
              >
                {t.nav[navKeyMap[id] as keyof typeof t.nav] as string}
              </a>
            ))}
            <div className="pt-3 px-3 space-y-2">
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:opacity-90 rounded-lg transition-colors">{t.nav.startFree}</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="block w-full text-center px-5 py-2.5 text-sm font-semibold text-foreground border border-border hover:bg-muted rounded-lg transition-colors">{t.nav.viewPlans}</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
