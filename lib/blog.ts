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

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => {
      const { data } = readPostFile(slug);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        pinned: Boolean(data.pinned),
        tags: data.tags ?? [],
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  if (!readSlugs().includes(slug)) return null;
  const { data, content } = readPostFile(slug);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    pinned: Boolean(data.pinned),
    tags: data.tags ?? [],
    html: marked.parse(content, { async: false }) as string,
  };
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
