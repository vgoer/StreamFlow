'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

const dirClass: Record<Direction, string> = {
  up: 'reveal-up',
  down: 'reveal-down',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
};

interface Props {
  children: ReactNode;
  /** Animation delay in ms */
  delay?: number;
  /** Entry direction (default: 'up') */
  direction?: Direction;
  /** Intersection threshold 0–1 (default: 0.15) */
  threshold?: number;
  /** Root margin for earlier/later trigger */
  rootMargin?: string;
}

/**
 * Scroll-triggered reveal with direction, scale, and stagger support.
 * Uses cubic-bezier(0.16, 1, 0.3, 1) — a spring-like ease-out that
 * mimics Framer Motion's default spring deceleration.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  threshold = 0.15,
  rootMargin = '0px 0px -40px 0px',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — show immediately
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass[direction]} ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
