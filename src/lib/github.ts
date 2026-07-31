import { excludedRepos } from "./content";

export type Repo = {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  updatedAt: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
};

export async function getRepos(username: string): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];

  const data: GitHubRepo[] = await res.json();

  return data
    .filter(
      (repo) =>
        !repo.fork && !excludedRepos.has(repo.name) && Boolean(repo.description)
    )
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      htmlUrl: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
    }));
}
