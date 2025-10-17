import { useState, useMemo } from "react";
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

const fmtDate = (iso) =>
  iso
    ? new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso))
    : "—";

const K = new Intl.NumberFormat("en-GB");

// DEV NOTE
// With the way this is set up, without a proxy i mean, the api request wont work
// so add your key VITE_GITHUB_TOKEN= to .env and change fetcher the vite config key

export default function RepoPage() {
  const { owner, name } = useParams();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showRaw, setShowRaw] = useState(false);

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

  const topics = useMemo(() => (repo?.topics ?? []).slice(0, 12), [repo]);

  if (repoLoad) return <Skeleton count={3} />;
  if (repoErr) return <ErrorMessage error={repoErr} />;

  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1 className="mb-2">{repo.full_name}</h1>
      <p className="text-sm opacity-80 mb-4">
        {repo.description || "No description provided."}
      </p>

      <div className="not-prose grid gap-3 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <a
            className="underline"
            href={repo?.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on GitHub
          </a>
          <span className="opacity-70">|</span>
          <span>
            <strong>Owner:</strong> {repo?.owner?.login}
          </span>
          <span className="opacity-70">|</span>
          <span>
            <strong>Default branch:</strong> {repo.default_branch}
          </span>
        </div>

        <ul className="flex flex-wrap gap-4 text-sm">
          <li>⭐ {K.format(repo.stargazers_count)}</li>
          <li>🍴 {K.format(repo.forks_count)}</li>
          <li>🐞 {K.format(repo.open_issues_count)}</li>
          <li>👀 {K.format(repo.watchers_count)}</li>
        </ul>

        {topics?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Advanced options */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced((s) => !s)}
            className="rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {showAdvanced ? "Hide advanced options" : "Advanced options"}
          </button>
        </div>

        {showAdvanced && (
          <section className="mt-3 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
            <h3 className="text-base font-semibold mb-3">Repository details</h3>

            <div className="grid gap-3 md:grid-cols-2">
              <Detail label="Visibility" value={repo.visibility} />
              <Detail label="Primary language" value={repo.language || "—"} />
              <Detail
                label="Size (approx)"
                value={`${K.format(repo.size)} KB`}
              />
              <Detail label="Created" value={fmtDate(repo.created_at)} />
              <Detail
                label="Last updated (metadata)"
                value={fmtDate(repo.updated_at)}
              />
              <Detail
                label="Last pushed (commits)"
                value={fmtDate(repo.pushed_at)}
              />
              <Detail label="Has issues" value={yesNo(repo.has_issues)} />
              <Detail label="Has projects" value={yesNo(repo.has_projects)} />
              <Detail label="Has wiki" value={yesNo(repo.has_wiki)} />
              <Detail label="Has pages" value={yesNo(repo.has_pages)} />
              <Detail
                label="Has discussions"
                value={yesNo(repo.has_discussions)}
              />
              <Detail label="Is archived" value={yesNo(repo.archived)} />
              <Detail label="Is disabled" value={yesNo(repo.disabled)} />
              <Detail label="Allow forking" value={yesNo(repo.allow_forking)} />
              <Detail label="Open issues" value={K.format(repo.open_issues)} />
              <Detail label="Forks" value={K.format(repo.forks)} />
              <Detail label="Watchers" value={K.format(repo.watchers)} />
              <Detail label="Licence" value={repo.license?.name || "—"} />
            </div>

            <h4 className="mt-4 text-sm font-semibold">Permissions</h4>
            <div className="grid gap-2 md:grid-cols-3 text-sm">
              <Detail label="Admin" value={yesNo(repo.permissions?.admin)} />
              <Detail
                label="Maintain"
                value={yesNo(repo.permissions?.maintain)}
              />
              <Detail label="Push" value={yesNo(repo.permissions?.push)} />
              <Detail label="Triage" value={yesNo(repo.permissions?.triage)} />
              <Detail label="Pull" value={yesNo(repo.permissions?.pull)} />
            </div>

            <h4 className="mt-4 text-sm font-semibold">Useful links</h4>
            <ul className="list-disc pl-6">
              <LiLink
                href={repo?.issues_url?.replace("{/number}", "")}
                text="Issues API"
              />
              <LiLink
                href={repo?.pulls_url?.replace("{/number}", "")}
                text="Pulls API"
              />
              <LiLink
                href={repo?.branches_url?.replace("{/branch}", "")}
                text="Branches API"
              />
              <LiLink href={repo?.tags_url} text="Tags API" />
              <LiLink href={repo?.contributors_url} text="Contributors API" />
              <LiLink href={repo?.languages_url} text="Languages API" />
              <LiLink
                href={repo?.contents_url?.replace("{+path}", "")}
                text="Contents API root"
              />
            </ul>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowRaw((s) => !s)}
                className="rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {showRaw ? "Hide raw JSON" : "Show raw JSON"}
              </button>
              {showRaw && (
                <pre className="mt-3 max-h-96 overflow-auto rounded-md bg-zinc-100 dark:bg-zinc-900 p-3 text-xs">
                  {JSON.stringify(repo, null, 2)}
                </pre>
              )}
            </div>
          </section>
        )}
      </div>

      <hr className="my-6" />

      <h2>README</h2>
      {mdLoad && <Skeleton count={6} />}
      {mdErr && <p className="text-red-600">No README found.</p>}
      {readme && <ReactMarkdown>{readme}</ReactMarkdown>}
    </article>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-start gap-2">
      <span className="min-w-44 text-zinc-600 dark:text-zinc-400">
        {label}:
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function yesNo(v) {
  return v === undefined || v === null ? "—" : v ? "Yes" : "No";
}

function LiLink({ href, text }) {
  if (!href) return null;
  return (
    <li>
      <a
        className="underline"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    </li>
  );
}
