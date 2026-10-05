import type { Metadata } from "next";
import Link from "next/link";
import { Window } from "@/components/window/Window";
import { getAllPosts, type PostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "My Documents",
  description: "Articles and writing, including yearly reviews.",
};

function PostIcons({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="xp-icon"
          style={{ color: "#000", textShadow: "none", width: 96 }}
        >
          <span className="xp-icon-glyph" aria-hidden style={{ filter: "none" }}>
            {post.draft ? "✏️" : post.pinned ? "📌" : "📄"}
          </span>
          <span className="truncate w-full">{post.title}</span>
          <span className="text-[10px] opacity-60">{post.draft ? "draft" : post.date}</span>
        </Link>
      ))}
    </div>
  );
}

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const seriesNames = [...new Set(posts.map((p) => p.series).filter(Boolean))] as string[];
  const standalone = posts.filter((p) => !p.series);

  return (
    <div className="xp-page">
      <Window title="My Documents" icon="📁">
        {posts.length === 0 ? (
          <p className="xp-prose">
            No posts yet — add a <code>.md</code> file to <code>content/blog/</code>.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {seriesNames.map((name) => (
              <section key={name}>
                <h2 className="text-[13px] font-bold mb-2">📂 {name}</h2>
                <PostIcons posts={posts.filter((p) => p.series === name)} />
              </section>
            ))}
            {standalone.length > 0 && (
              <section>
                {seriesNames.length > 0 && <h2 className="text-[13px] font-bold mb-2">📂 Writing</h2>}
                <PostIcons posts={standalone} />
              </section>
            )}
          </div>
        )}
      </Window>
    </div>
  );
}
