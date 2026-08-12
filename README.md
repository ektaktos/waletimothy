# waletimothy.com

Personal site for Wale Timothy — a Windows XP–styled "desktop" split into a
personal/life section and a career/software section, plus a blog.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** for layout utilities; the actual XP chrome (title
  bars, buttons, taskbar, wallpaper) is hand-written CSS in
  `app/globals.css` — no UI kit, no icon font, no animation library.
- **Blog**: plain Markdown files in `content/blog/`, parsed at build time
  with `gray-matter` + `marked`. No CMS, no database.
- Deployed as a **fully static export** (`output: "export"` in
  `next.config.ts`) — every route is prerendered, so the deployed site is
  plain HTML/CSS/JS on a CDN with no server function running per request.
  This was chosen to keep the bundle and runtime footprint as small as
  possible. If a future feature needs a server (a contact form, dynamic OG
  images, etc.), drop the `output: "export"` line first.

Bundle-size choices worth knowing about:
- No Google/custom font download — the site uses the system font stack
  (`Tahoma, "MS Sans Serif", Verdana, Arial, sans-serif`) so it renders as
  close to real XP as licensing allows, at zero network cost.
- No image assets for the wallpaper or icons — the Bliss-style backdrop is
  a CSS gradient (an original approximation, not the copyrighted photo),
  and icons are emoji/glyphs.
- Draggable windows are hand-rolled on the Pointer Events API
  (`hooks/useDraggable.ts`), not a library like `react-rnd`, and that logic
  is only loaded on the desktop route (`/`) — every other page (About,
  Career, blog posts) is a server component with no client JS beyond the
  persistent taskbar/Start Menu.

## Structure

```
app/
  layout.tsx           # root layout: metadata, wraps everything in the desktop + taskbar
  page.tsx              # "/" — the desktop: icons + a draggable welcome note
  life/page.tsx          # "/life" — personal section (placeholder content, TODO)
  career/
    page.tsx              # "/career" — software/career section (placeholder, TODO)
    resume/page.tsx        # "/career/resume"
  blog/
    page.tsx               # "/blog" — folder view of all posts
    [slug]/page.tsx          # "/blog/:slug" — a post, rendered as a document window

components/
  window/Window.tsx      # XP window chrome (title bar, close/min/max, body) — server component
  desktop/
    Taskbar.tsx            # persistent taskbar + Start Menu toggle (the one real client component in layout)
    StartMenu.tsx           # Start Menu contents, including "Recent Documents" (pinned/recent blog posts)
    Clock.tsx                # ticking taskbar clock
    DesktopIcon.tsx           # desktop icon (server component, just a styled Link)
    DraggableNote.tsx          # draggable window, used only on "/"

hooks/useDraggable.ts    # pointer-events drag hook, no dependency

lib/
  blog.ts                # reads/parses content/blog/*.md at build time
  site-config.ts          # domain/name/description — single source of truth

content/blog/*.md        # the posts themselves
```

Route groups weren't used for the personal/career split — `/life` and
`/career` are plain top-level routes, which keeps URLs short and the folder
structure obvious. The "about me first, engineer second" framing comes from
the desktop itself (`/`), where **My Life** is the first icon.

## Writing a blog post

Add a file to `content/blog/`, e.g. `content/blog/my-post.md`:

```md
---
title: "Post Title"
date: "2026-01-15"
excerpt: "One line for the listing page and link previews."
pinned: false
tags: ["optional"]
---

Body in Markdown.
```

Set `pinned: true` to have it show up in the Start Menu's "Recent
Documents" ahead of newer, unpinned posts. Commit and deploy — the slug is
the filename, and the page is statically generated at build time
(`generateStaticParams` in `app/blog/[slug]/page.tsx`).

## Future subdomains

This repo is scoped to the main site only (`waletimothy.com`). The plan for
a future subdomain (e.g. a stylist site) is a **separate Vercel
project/repo** pointed at that subdomain, not a route inside this app —
this keeps each site's stack and deploy independent, and there's nothing in
this codebase (config, routing, build) that assumes it owns the whole
domain.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to /out
```
