import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Blog posts are plain markdown files in /content/blog. No CMS, no database —
 * writing a post is "add a .md file, commit it". Parsing happens at build
 * time (generateStaticParams below prerenders every post), so none of this
 * — fs, gray-matter, marked — ever ships to the client bundle.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO date string, e.g. "2026-01-15"
  excerpt: string;
  pinned?: boolean;
  tags?: string[];
  /** Groups related posts in the blog index, e.g. "Year in Review". */
  series?: string;
  /** Drafts are visible in `npm run dev` only and never built/listed in production. */
  draft?: boolean;
}

export interface Post extends PostMeta {
  html: string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    excerpt: (data.excerpt as string) ?? "",
    pinned: Boolean(data.pinned),
    tags: (data.tags as string[]) ?? [],
    series: (data.series as string) || undefined,
    draft: Boolean(data.draft),
  };
}

const showDrafts = process.env.NODE_ENV === "development";

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => toMeta(slug, readPostFile(slug).data))
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  if (!readSlugs().includes(slug)) return null;
  const { data, content } = readPostFile(slug);
  const meta = toMeta(slug, data);
  if (meta.draft && !showDrafts) return null;
  return { ...meta, html: marked.parse(content, { async: false }) as string };
}

/**
 * Pinned posts first (in file order), topped up with the most recent
 * remaining posts. Used for "Recent Documents" in the Start Menu and any
 * featured-posts spot on the homepage.
 */
export function getFeaturedPosts(limit = 3): PostMeta[] {
  const all = getAllPosts();
  const pinned = all.filter((p) => p.pinned);
  const rest = all.filter((p) => !p.pinned);
  return [...pinned, ...rest].slice(0, limit);
}
