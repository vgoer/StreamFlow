'use client';

import { useTheme, type Theme } from './ThemeProvider';

const iconClass = 'w-4 h-4 transition-transform duration-300';

function SunIcon() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

const labels: Record<Theme, string> = {
  light: '浅色模式',
  dark: '深色模式',
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const nextLabel = labels[theme === 'light' ? 'dark' : 'light'];

  return (
    <button
      onClick={toggle}
      className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-200 text-muted-fg hover:text-foreground focus-ring"
      aria-label={`当前：${labels[theme]}，点击切换到${nextLabel}`}
      title={`切换到${nextLabel}`}
    >
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
