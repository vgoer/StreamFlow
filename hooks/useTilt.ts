'use client';

import { useState, useCallback, useRef, type RefObject } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  glare: number;
}

interface Options {
  /** Max rotation in degrees (default 8) */
  maxTilt?: number;
  /** Scale on hover (default 1.02) */
  scale?: number;
  /** Glare intensity 0-1 (default 0) */
  glare?: number;
  /** Reset speed in ms (default 300) */
  resetSpeed?: number;
}

/**
 * 3D card tilt effect — responds to mouse position within the element.
 * Uses CSS transform perspective for GPU-accelerated rendering.
 */
export function useTilt(opts: Options = {}): {
  ref: RefObject<HTMLDivElement | null>;
  style: React.CSSProperties;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
} {
  const { maxTilt = 8, scale = 1.02, glare = 0, resetSpeed = 300 } = opts;
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<TiltState>({ rotateX: 0, rotateY: 0, scale: 1, glare: 0 });

  const reset = useCallback(() => {
    setState({ rotateX: 0, rotateY: 0, scale: 1, glare: 0 });
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setState({
        rotateX: -y * maxTilt * 2,
        rotateY: x * maxTilt * 2,
        scale,
        glare: glare > 0 ? Math.max(0, 1 - Math.abs(x * 2) - Math.abs(y * 2)) * glare : 0,
      });
    },
    [maxTilt, scale, glare]
  );

  const style: React.CSSProperties = {
    transform: `perspective(1000px) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) scale3d(${state.scale},${state.scale},1)`,
    transition: state.rotateX === 0 && state.rotateY === 0 ? `transform ${resetSpeed}ms ease-out` : 'none',
  };

  return { ref, style, onMouseEnter: () => {}, onMouseLeave: reset, onMouseMove };
}
