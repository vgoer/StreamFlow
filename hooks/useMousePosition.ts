'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  /** Normalized -1 to 1 relative to element center */
  nx: number;
  ny: number;
}

interface Options {
  /** Relative to a specific element ref instead of window */
  relativeTo?: React.RefObject<HTMLElement | null>;
  /** Throttle in ms (default 16 ≈ 60fps) */
  throttle?: number;
}

/**
 * Track mouse position — for cursor-follow, parallax, and tilt effects.
 * Returns normalized coordinates (-1 to 1) relative to element center.
 */
export function useMousePosition(opts: Options = {}): MousePosition {
  const { relativeTo, throttle = 16 } = opts;
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 });
  const lastCall = useRef(0);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      const now = performance.now();
      if (now - lastCall.current < throttle) return;
      lastCall.current = now;

      if (relativeTo?.current) {
        const rect = relativeTo.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const nx = (x / rect.width) * 2 - 1;
        const ny = (y / rect.height) * 2 - 1;
        setPos({ x, y, nx, ny });
      } else {
        const nx = (clientX / window.innerWidth) * 2 - 1;
        const ny = (clientY / window.innerHeight) * 2 - 1;
        setPos({ x: clientX, y: clientY, nx, ny });
      }
    },
    [relativeTo, throttle]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [handleMove]);

  return pos;
}
