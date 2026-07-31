import type { Repo } from "@/lib/github";

export default function ProjectCard({ repo, featured }: { repo: Repo; featured?: boolean }) {
  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={`block rounded-md border p-4 transition hover:border-accent-dim hover:bg-accent/5 ${
        featured ? "border-accent-dim/60" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-semibold text-fg">{repo.name}</span>
        {repo.stars > 0 && (
          <span className="shrink-0 text-xs text-amber">★ {repo.stars}</span>
        )}
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-fg-dim">
        {repo.description ?? "No description provided."}
      </p>
      {repo.language && (
        <span className="mt-3 inline-block rounded border border-border px-2 py-0.5 text-xs text-cyan">
          {repo.language}
        </span>
      )}
    </a>
  );
}
