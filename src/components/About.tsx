import { profile, skills } from "@/lib/content";
import TerminalWindow from "./TerminalWindow";

function SkillGroup({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-fg-dim">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded border border-border px-2 py-1 text-xs"
            style={{ color }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-8">
      <TerminalWindow command="visitor@web ~ % cat about.md && cat skills.json">
        <p className="text-fg-dim">
          <span className="text-accent">$</span> cat about.md
        </p>
        <p className="mt-3 max-w-2xl leading-relaxed text-fg">{profile.bio}</p>
        <p className="mt-2 text-sm text-fg-dim">📍 {profile.location}</p>

        <p className="mt-8 text-fg-dim">
          <span className="text-accent">$</span> cat skills.json
        </p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <SkillGroup title="Languages" items={skills.languages} color="var(--accent)" />
          <SkillGroup title="Frameworks" items={skills.frameworks} color="var(--cyan)" />
          <SkillGroup title="Tools" items={skills.tools} color="var(--amber)" />
          <SkillGroup title="Concepts" items={skills.concepts} color="var(--pink)" />
          <SkillGroup title="Soft Skills" items={skills.soft} color="var(--fg)" />
        </div>
      </TerminalWindow>
    </section>
  );
}
