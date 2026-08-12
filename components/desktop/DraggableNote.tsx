"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useDraggable } from "@/hooks/useDraggable";

/**
 * A draggable XP window that lives entirely on the desktop route. This is
 * the one place the site does real client-side window management — kept
 * small and dependency-free (see hooks/useDraggable) so it doesn't cost
 * anything on every other page.
 */
export function DraggableNote({
  title,
  icon = "📝",
  initial,
  children,
}: {
  title: string;
  icon?: string;
  initial: { x: number; y: number };
  children: ReactNode;
}) {
  const [closed, setClosed] = useState(false);
  const { position, dragHandleProps } = useDraggable(initial);

  if (closed) return null;

  return (
    <div
      className="xp-window absolute w-72 select-none"
      style={{ left: position.x, top: position.y }}
    >
      <div className="xp-titlebar" style={{ touchAction: "none" }} {...dragHandleProps}>
        <span className="xp-titlebar-title">
          <span aria-hidden>{icon}</span>
          {title}
        </span>
        <span className="xp-titlebar-controls">
          <span className="xp-title-btn" aria-hidden>
            _
          </span>
          <span className="xp-title-btn" aria-hidden>
            &#9633;
          </span>
          <button
            type="button"
            className="xp-title-btn is-close"
            aria-label="Close window"
            onClick={() => setClosed(true)}
          >
            &#10005;
          </button>
        </span>
      </div>
      <div className="xp-window-body">{children}</div>
    </div>
  );
}
