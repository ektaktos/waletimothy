import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export function StartMenu({
  recentPosts,
  onNavigate,
}: {
  recentPosts: PostMeta[];
  onNavigate: () => void;
}) {
  return (
    <div className="xp-start-menu xp-window" role="menu">
      <div className="xp-titlebar">
        <span className="xp-titlebar-title">Wale Timothy</span>
      </div>
      <div className="xp-window-body" style={{ padding: 8 }}>
        <nav className="flex flex-col gap-1">
          <MenuLink href="/" icon="🖥️" label="Desktop" onNavigate={onNavigate} />
          <MenuLink href="/life" icon="🙂" label="My Life" onNavigate={onNavigate} />
          <MenuLink href="/career" icon="💼" label="My Career" onNavigate={onNavigate} />
          <MenuLink href="/blog" icon="📁" label="My Documents (Blog)" onNavigate={onNavigate} />
        </nav>

        {recentPosts.length > 0 && (
          <>
            <div className="mt-2 mb-1 border-t" style={{ borderColor: "var(--xp-shadow)" }} />
            <p className="px-1 pb-1 text-[11px] font-bold opacity-70">Recent Documents</p>
            <nav className="flex flex-col gap-1">
              {recentPosts.map((post) => (
                <MenuLink
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  icon="📄"
                  label={post.title}
                  onNavigate={onNavigate}
                />
              ))}
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

function MenuLink({
  href,
  icon,
  label,
  onNavigate,
}: {
  href: string;
  icon: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center gap-2 rounded-sm px-2 py-1 text-[12px] hover:bg-[#2f6fe4] hover:text-white"
    >
      <span aria-hidden>{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}
