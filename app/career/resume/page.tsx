import type { Metadata } from "next";
import { Window } from "@/components/window/Window";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume.",
};

export default function ResumePage() {
  return (
    <div className="xp-page">
      <Window title="Resume.pdf" icon="📄" closeHref="/career">
        <div className="xp-prose">
          <p>
            TODO — either embed a PDF here, or link out to one placed in
            <code>/public</code>.
          </p>
        </div>
      </Window>
    </div>
  );
}
