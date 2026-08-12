"use client";

import { useEffect, useState } from "react";

function format() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Tiny ticking taskbar clock. No dependency — just setInterval.
 * `suppressHydrationWarning` is intentional here: the prerendered (build
 * time) clock text will always differ from the viewer's actual local time,
 * and that's fine for a decorative clock — see the React docs' own
 * "current time" example for this exact pattern.
 */
export function Clock() {
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="xp-clock" suppressHydrationWarning>
      {time}
    </span>
  );
}
