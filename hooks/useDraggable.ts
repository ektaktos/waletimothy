"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Minimal drag-to-reposition hook, built on the native Pointer Events API.
 * No dependency (no react-rnd, no framer-motion) — this is the entire
 * window-manager's dragging logic, scoped only to the routes that use it.
 */
export function useDraggable(initial: { x: number; y: number }) {
  const [position, setPosition] = useState(initial);
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(
    null
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only drag from primary button / touch, and not from interactive children.
      const target = e.target as HTMLElement;
      if (target.closest("a,button,input,textarea")) return;

      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: position.x,
        originY: position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState.current) return;
    const { startX, startY, originX, originY } = dragState.current;
    setPosition({
      x: originX + (e.clientX - startX),
      y: originY + (e.clientY - startY),
    });
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragState.current = null;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  return {
    position,
    dragHandleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
  };
}
