import { DesktopIcon } from "@/components/desktop/DesktopIcon";
import { DraggableNote } from "@/components/desktop/DraggableNote";

export default function DesktopPage() {
  return (
    <div className="relative min-h-[calc(100dvh-34px)] p-4">
      <div className="flex flex-col flex-wrap gap-2" style={{ height: "calc(100dvh - 34px - 32px)" }}>
        <DesktopIcon href="/life" icon="🙂" label="My Life" />
        <DesktopIcon href="/career" icon="💼" label="My Career" />
        <DesktopIcon href="/blog" icon="📁" label="My Documents" />
        <DesktopIcon href="/career/resume" icon="📄" label="Resume" />
      </div>

      <DraggableNote title="Welcome.txt" icon="📝" initial={{ x: 220, y: 90 }}>
        <div className="xp-prose text-[12px]" style={{ maxWidth: 260 }}>
          <p>
            Hi — this is the desktop. Double-click{" "}
            <strong>My Life</strong> or <strong>My Career</strong> to open
            those sections, or check <strong>My Documents</strong> for
            writing.
          </p>
          <p>Drag this note anywhere. Replace this text with a real intro.</p>
        </div>
      </DraggableNote>
    </div>
  );
}
