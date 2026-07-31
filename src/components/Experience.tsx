import { timeline } from "@/lib/content";
import TerminalWindow from "./TerminalWindow";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-8">
      <TerminalWindow command="visitor@web ~ % cat experience.log">
        <p className="text-fg-dim">
          <span className="text-accent">$</span> cat experience.log
        </p>
        <ol className="mt-4 space-y-6 border-l border-border pl-6">
          {timeline.map((entry) => (
            <li key={`${entry.org}-${entry.period}`} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="text-xs text-fg-dim">{entry.period}</p>
              <p className="mt-1 font-semibold text-fg">
                {entry.title}{" "}
                <span
                  className={
                    entry.kind === "education" ? "text-cyan" : "text-amber"
                  }
                >
                  @ {entry.org}
                </span>
              </p>
              <p className="mt-1 text-sm text-fg-dim">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </TerminalWindow>
    </section>
  );
}
