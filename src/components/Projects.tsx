import { getRepos } from "@/lib/github";
import { featuredRepos, profile } from "@/lib/content";
import TerminalWindow from "./TerminalWindow";
import ProjectCard from "./ProjectCard";

export default async function Projects() {
  const repos = await getRepos(profile.handle);

  const featured = featuredRepos
    .map((name) => repos.find((r) => r.name === name))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const rest = repos
    .filter((r) => !featuredRepos.includes(r.name))
    .slice(0, 9);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-8">
      <TerminalWindow command={`visitor@web ~ % ls ~/projects --sort=updated`}>
        <p className="text-fg-dim">
          <span className="text-accent">$</span> ls ~/projects/featured
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {featured.map((repo) => (
            <ProjectCard key={repo.name} repo={repo} featured />
          ))}
        </div>

        {rest.length > 0 && (
          <>
            <p className="mt-8 text-fg-dim">
              <span className="text-accent">$</span> ls ~/projects --all
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((repo) => (
                <ProjectCard key={repo.name} repo={repo} />
              ))}
            </div>
          </>
        )}

        {repos.length === 0 && (
          <p className="mt-4 text-sm text-fg-dim">
            Could not load repositories from GitHub right now — check back later or visit{" "}
            <a href={profile.github} className="text-accent underline" target="_blank" rel="noreferrer">
              github.com/{profile.handle}
            </a>
            .
          </p>
        )}
      </TerminalWindow>
    </section>
  );
}
