import type { Metadata } from "next";
import Link from "next/link";
import { Window } from "@/components/window/Window";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "My Documents",
  description: "Articles and writing.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="xp-page">
      <Window title="My Documents" icon="📁">
        {posts.length === 0 ? (
          <p className="xp-prose">
            No posts yet — add a <code>.md</code> file to{" "}
            <code>content/blog/</code>.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="xp-icon"
                style={{ color: "#000", textShadow: "none", width: 96 }}
              >
                <span className="xp-icon-glyph" aria-hidden style={{ filter: "none" }}>
                  {post.pinned ? "📌" : "📄"}
                </span>
                <span className="truncate w-full">{post.title}</span>
                <span className="text-[10px] opacity-60">{post.date}</span>
              </Link>
            ))}
          </div>
        )}
      </Window>
    </div>
  );
}
