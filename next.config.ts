import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static output: every route here is prerenderable (no auth, no
  // per-request data), so there's no reason to pay for a server function.
  // Ships as plain HTML/CSS/JS to a CDN — about as light as this gets.
  // Trade-off: no API routes / middleware / ISR while this is set. Drop
  // this line if a future feature (contact form, dynamic OG images, etc.)
  // needs a server.
  output: "export",
  images: {
    // No next/image usage yet (wallpaper/icons are CSS), but the export
    // target requires this if one shows up later.
    unoptimized: true,
  },
};

export default nextConfig;
