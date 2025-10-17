import useSWR from "swr";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Skeleton from "../components/Skeleton";
import ErrorMessage from "../components/ErrorMessage";

const fetcher = async (url, opts) => {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.headers.get("content-type")?.includes("application/json")
    ? res.json()
    : res.text();
};

export default function RepoPage() {
  const { owner, name } = useParams();

  const {
    data: repo,
    error: repoErr,
    isLoading: repoLoad,
  } = useSWR(`/api/github/repo/${owner}/${name}`, fetcher);

  const {
    data: readme,
    error: mdErr,
    isLoading: mdLoad,
  } = useSWR(`/api/github/readme/${owner}/${name}`, fetcher);

  if (repoLoad) return <Skeleton count={3} />;
  if (repoErr) return <ErrorMessage error={repoErr} />;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="mb-2">{repo.full_name}</h1>
      <p className="text-sm opacity-80 mb-4">{repo.description}</p>
      <ul className="flex gap-4 text-sm">
        <li>⭐ {repo.stargazers_count}</li>
        <li>🍴 {repo.forks_count}</li>
        <li>🐞 {repo.open_issues_count}</li>
      </ul>
      <hr className="my-6" />
      <h2>README</h2>
      {mdLoad && <Skeleton count={6} />}
      {mdErr && <p className="text-red-600">No README found.</p>}
      {readme && <ReactMarkdown>{readme}</ReactMarkdown>}
    </article>
  );
}
