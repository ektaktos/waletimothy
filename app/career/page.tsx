import type { Metadata } from "next";
import Link from "next/link";
import { Window } from "@/components/window/Window";

export const metadata: Metadata = {
  title: "My Career",
  description: "Software engineering work, projects, and resume.",
};

export default function CareerPage() {
  return (
    <div className="xp-page">
      <Window title="My Career" icon="💼">
        <div className="xp-prose">
          <h2>What I Do</h2>
          <p>
            TODO — short summary of your software engineering focus/role.
          </p>

          <h2>Projects</h2>
          <p>TODO — list real projects here, one per line or as cards.</p>

          <h2>Resume</h2>
          <p>
            <Link href="/career/resume">Open Resume →</Link>
          </p>
        </div>
      </Window>
    </div>
  );
}
