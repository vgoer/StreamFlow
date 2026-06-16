'use client';

import { useI18n } from '@/hooks/useI18n';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect, type FC } from 'react';

const Navbar: FC = () => {
  const { t, lang, setLang } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh');

  const linkClass =
    'text-sm font-medium text-muted-fg hover:text-foreground transition-colors duration-200 focus-ring rounded';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'nav-glass shadow-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label={lang === 'zh' ? '主导航' : 'Main navigation'}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 focus-ring rounded-lg" aria-label="StreamFlow Home">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-[family-name:var(--font-heading)] font-bold text-xl text-foreground">StreamFlow</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            <li><a href="#features" className={linkClass}>{t.nav.features}</a></li>
            <li><a href="#how-it-works" className={linkClass}>{t.nav.howItWorks}</a></li>
            <li><a href="#testimonials" className={linkClass}>{t.nav.testimonials}</a></li>
            <li><a href="#pricing" className={linkClass}>{t.nav.pricing}</a></li>
            <li><a href="#faq" className={linkClass}>{t.nav.faq}</a></li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Language Switcher */}
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
            <a href="#pricing" className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:opacity-90 active:opacity-80 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus-ring cta-glow">
              {t.nav.startFree}
              <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
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
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`} role="navigation">
          <div className="space-y-1 border-t border-border pt-4">
            <a href="#features" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium">{t.nav.features}</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium">{t.nav.howItWorks}</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium">{t.nav.testimonials}</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium">{t.nav.pricing}</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-muted-fg hover:text-foreground hover:bg-muted rounded-lg transition-colors text-sm font-medium">{t.nav.faq}</a>
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
