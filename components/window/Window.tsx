import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Pure XP window chrome. Deliberately a server component with zero client
 * JS: the close button is a real <Link> (browser back-navigation, no
 * JavaScript required), and minimize/maximize are decorative — authentic to
 * the OS chrome without needing a client-side window manager on every page.
 * Real dragging only exists on the desktop route (see DraggableNote).
 */
export function Window({
  title,
  icon = "🗔",
  closeHref = "/",
  children,
}: {
  title: string;
  icon?: string;
  closeHref?: string;
  children: ReactNode;
}) {
  return (
    <div className="xp-window">
      <div className="xp-titlebar">
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
          <Link href={closeHref} className="xp-title-btn is-close" aria-label="Close window">
            &#10005;
          </Link>
        </span>
      </div>
      <div className="xp-window-body">{children}</div>
    </div>
  );
}
