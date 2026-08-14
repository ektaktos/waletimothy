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
    // Clamp to the viewport so the window can't be dragged off-screen —
    // in particular, never past the left/right edge, which would otherwise
    // force a horizontal scrollbar on the whole page.
    const maxX = Math.max(0, window.innerWidth - 60);
    const maxY = Math.max(0, window.innerHeight - 60);
    setPosition({
      x: Math.min(Math.max(originX + (e.clientX - startX), 0), maxX),
      y: Math.min(Math.max(originY + (e.clientY - startY), 0), maxY),
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
