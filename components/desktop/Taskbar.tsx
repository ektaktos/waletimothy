"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Clock } from "@/components/desktop/Clock";
import { StartMenu } from "@/components/desktop/StartMenu";
import type { PostMeta } from "@/lib/blog";

/**
 * The one persistent client component in the layout — it just toggles the
 * Start Menu open/closed and closes it on outside click. Everything else
 * here is plain markup/links.
 */
export function Taskbar({ recentPosts }: { recentPosts: PostMeta[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref}>
      {open && <StartMenu recentPosts={recentPosts} onNavigate={() => setOpen(false)} />}
      <div className="xp-taskbar">
        <button type="button" className="xp-start-button" onClick={() => setOpen((v) => !v)}>
          <span aria-hidden>🪟</span>
          start
        </button>
        <Link href="/life" className="xp-taskbar-link">
          My Life
        </Link>
        <Link href="/career" className="xp-taskbar-link">
          My Career
        </Link>
        <Link href="/blog" className="xp-taskbar-link">
          My Documents
        </Link>
        <Clock />
      </div>
    </div>
  );
}
