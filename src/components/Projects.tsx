import { getRepos } from "@/lib/github";
import { featuredRepos, profile } from "@/lib/content";
import TerminalWindow from "./TerminalWindow";
import ProjectCard from "./ProjectCard";

export default async function Projects() {
  const repos = await getRepos(profile.handle);

  const featured = featuredRepos
    .map((name) => repos.find((r) => r.name === name))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-8">
      <TerminalWindow command="visitor@web ~ % ls ~/projects/featured">
        <p className="text-fg-dim">
          <span className="text-accent">$</span> ls ~/projects/featured
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((repo) => (
            <ProjectCard key={repo.name} repo={repo} featured />
          ))}
        </div>

        {featured.length === 0 && (
          <p className="mt-4 text-sm text-fg-dim">
            Could not load repositories from GitHub right now — check back later or visit{" "}
            <a href={profile.github} className="text-accent underline" target="_blank" rel="noreferrer">
              github.com/{profile.handle}
            </a>
            .
          </p>
        )}

        <p className="mt-8 text-sm text-fg-dim">
          <span className="text-accent">$</span> open{" "}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="text-cyan underline hover:text-accent"
          >
            github.com/{profile.handle}
          </a>{" "}
          — xem tất cả repo khác
        </p>
      </TerminalWindow>
    </section>
  );
}
