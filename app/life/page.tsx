import type { Metadata } from "next";
import { Window } from "@/components/window/Window";

export const metadata: Metadata = {
  title: "My Life",
  description: "The personal side — not the software engineer part.",
};

export default function LifePage() {
  return (
    <div className="xp-page">
      <Window title="My Life" icon="🙂">
        <div className="xp-prose">
          <h2>About Me</h2>
          <p>
            TODO — replace with the real bio. Who you are outside of work:
            interests, where you&rsquo;re based, whatever you want this
            section to lead with.
          </p>

          <h2>Interests</h2>
          <p>TODO — hobbies, photography, music, whatever belongs here.</p>

          <h2>Elsewhere</h2>
          <p>TODO — links to socials, if any belong on this page.</p>
        </div>
      </Window>
    </div>
  );
}
