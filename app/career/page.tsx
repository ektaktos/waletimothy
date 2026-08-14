import type { Metadata } from "next";
import Link from "next/link";
import { Window } from "@/components/window/Window";
import { summary, skills, experience, projects, education } from "@/lib/career-data";

export const metadata: Metadata = {
  title: "My Career",
  description: "Software engineering work, projects, and resume.",
};

export default function CareerPage() {
  return (
    <div className="xp-page xp-page-wide">
      <Window title="My Career" icon="💼">
        <div className="xp-prose">
          <h2>What I Do</h2>
          <p>{summary}</p>

          <h2>Skills</h2>
          <div className="flex flex-col gap-2 mb-3">
            {skills.map((group) => (
              <div key={group.label}>
                <p className="font-bold text-[11px] mb-1">{group.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="xp-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2>Experience</h2>
          {experience.map((role) => (
            <div key={`${role.company}-${role.dates}`} className="xp-card">
              <p className="font-bold text-[13px]">{role.company}</p>
              <p className="text-[11px] opacity-70 mb-1">
                {role.location} · {role.dates}
              </p>
              <p className="italic text-[12px] mb-2">{role.title}</p>
              <p className="mb-2">{role.summary}</p>
              <ul>
                {role.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {role.awards && (
                <p className="mt-2 text-[11px] opacity-80">🏆 {role.awards.join(" · ")}</p>
              )}
            </div>
          ))}

          <h2>Selected Projects</h2>
          {projects.map((project) => (
            <div key={project.name} className="xp-card">
              <p className="font-bold text-[13px]">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </p>
              <p className="text-[11px] opacity-70 mb-1">
                {project.role}
                {project.location ? ` · ${project.location}` : ""}
              </p>
              <p>{project.description}</p>
            </div>
          ))}

          <h2>Education</h2>
          <div className="xp-card">
            <p className="font-bold text-[13px]">{education.school}</p>
            <p className="text-[11px] opacity-70 mb-1">
              {education.location} · {education.dates}
            </p>
            <p className="mb-2">{education.degree}</p>
            <p className="font-bold text-[11px] mb-1">Leadership</p>
            <ul>
              {education.leadership.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong> ({item.dates}) — {item.description}
                </li>
              ))}
            </ul>
          </div>

          <h2>Resume</h2>
          <p>
            <Link href="/career/resume">Open Resume →</Link>
          </p>
        </div>
      </Window>
    </div>
  );
}
