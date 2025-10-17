import { Link } from "react-router-dom";

export default function RepoCard({ repo }) {
  const to = `/repo/${repo.owner.login}/${repo.name}`;
  return (
    <li className="rounded-2xl border-l-2 border-l-blue-600 border-r-2 border-r-indigo-500 outline outline-zinc-200 dark:outline-zinc-800 p-4 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40">
      <h3 className="font-semibold text-lg">
        <Link to={to} className="underline decoration-dotted">
          {repo.full_name}
        </Link>
      </h3>
      <p className="text-sm opacity-80 mt-1 line-clamp-2">{repo.description}</p>
      <div className="mt-2 text-sm flex gap-4">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>🐞 {repo.open_issues_count}</span>
      </div>
      <div className="mt-2 text-sm">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          View on GitHub
        </a>
      </div>
    </li>
  );
}
