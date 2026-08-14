import type { Metadata } from "next";
import { Window } from "@/components/window/Window";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume — Alabi Wale Timothy.",
};

export default function ResumePage() {
  return (
    <div className="xp-page">
      <Window title="Resume.pdf" icon="📄" closeHref="/career">
        <div className="xp-prose">
          <p>The full PDF, as attached to applications.</p>
          <p>
            <a href="/resume.pdf" download="Alabi-Wale-Timothy-Resume.pdf" className="xp-btn inline-block">
              ⬇ Download Resume.pdf
            </a>
          </p>
          <p>
            Or read it inline:
          </p>
          <object
            data="/resume.pdf"
            type="application/pdf"
            width="100%"
            height="600"
            className="xp-inset"
            aria-label="Resume PDF"
          >
            <p>
              Your browser can&rsquo;t preview PDFs inline —{" "}
              <a href="/resume.pdf">open the PDF directly</a> instead.
            </p>
          </object>
        </div>
      </Window>
    </div>
  );
}
