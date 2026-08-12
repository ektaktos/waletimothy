import Link from "next/link";

export function DesktopIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <Link href={href} className="xp-icon">
      <span className="xp-icon-glyph" aria-hidden>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
