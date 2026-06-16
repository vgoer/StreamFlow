'use client';

import { useState, useEffect, useRef } from 'react';

interface Options {
  /** Parallax speed factor (0 = static, 1 = follows scroll 1:1) */
  speed?: number;
  /** Offset in px before starting */
  offset?: number;
  /** Max translate in px */
  max?: number;
}

/**
 * Scroll-driven parallax — returns a translateY value based on scroll position.
 * Uses passive scroll listener for 60fps performance.
 */
export function useParallax(opts: Options = {}): number {
  const { speed = 0.3, offset = 0, max = 200 } = opts;
  const [translateY, setTranslateY] = useState(0);
  const elementTopRef = useRef(0);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-parallax]');
    if (el) elementTopRef.current = el.getBoundingClientRect().top + window.scrollY;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY - elementTopRef.current + offset;
          const value = Math.min(Math.max(scrollY * speed, -max), max);
          setTranslateY(value);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed, offset, max]);

  return translateY;
}
