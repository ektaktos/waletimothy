import type { Metadata } from "next";
import "./globals.css";
import { Taskbar } from "@/components/desktop/Taskbar";
import { getFeaturedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

// No next/font, no Google Fonts download — the XP look wants Tahoma/MS Sans
// Serif anyway, which is a system font stack defined once in globals.css.
// Zero extra bytes shipped for typography.

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const recentPosts = getFeaturedPosts(3);

  return (
    <html lang="en">
      <body>
        <div className="xp-desktop">
          {children}
          <Taskbar recentPosts={recentPosts} />
        </div>
      </body>
    </html>
  );
}
