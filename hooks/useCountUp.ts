'use client';

import { useState, useEffect, useRef } from 'react';

interface Options {
  /** Target end value */
  end: number;
  /** Duration in ms (default 2000) */
  duration?: number;
  /** Start counting when true */
  start?: boolean;
  /** Format: 'number' | 'currency' | 'percent' */
  format?: 'number' | 'currency' | 'percent';
  /** Locale for formatting */
  locale?: string;
  /** Decimal places */
  decimals?: number;
}

function formatValue(val: number, opts: Options): string {
  const { format = 'number', locale = 'zh-CN', decimals = 0 } = opts;
  if (format === 'percent') return `${val}%`;
  if (format === 'currency') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(val);
  }
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}

/**
 * Animated number counter — spring-physics easing for natural feel.
 * Uses requestAnimationFrame with easeOutExpo curve.
 */
export function useCountUp(opts: Options): string {
  const { end, duration = 2000, start = true } = opts;
  const [display, setDisplay] = useState('0');
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!start) {
      setDisplay(formatValue(0, opts));
      return;
    }

    // easeOutExpo: decelerating towards the end — feels like a spring settling
    const easeOutExpo = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const animate = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.round(easedProgress * end);

      setDisplay(formatValue(currentValue, opts));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(formatValue(end, opts));
      }
    };

    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration, start]);

  return display;
}
