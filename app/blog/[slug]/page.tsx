import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Window } from "@/components/window/Window";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="xp-page">
      <Window title={`${post.title} - WordPad`} icon="📄" closeHref="/blog">
        <p className="text-[11px] opacity-60 mb-3">{post.date}</p>
        <div className="xp-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </Window>
    </div>
  );
}
