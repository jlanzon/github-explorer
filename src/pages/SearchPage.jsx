import useSWR from "swr";
import { useSearchParams } from "react-router-dom";
import { searchRepos } from "../lib/github";
import SearchForm from "../components/SearchForm";
import FilterBar from "../components/FilterBar";
import RepoCard from "../components/RepoCard";
import Skeleton from "../components/Skeleton";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "react";
  const page = Number(params.get("page") || 1);
  const language = params.get("lang") || "";
  const minStars = params.get("stars") || "";
  const sort = params.get("sort") || "stars";

  const url = searchRepos({ q, page, sort, language, minStars });
  const { data, error, isLoading } = useSWR(url);

  const total = data?.total_count ?? 0;
  const items = data?.items ?? [];

  return (
    <section>
      <SearchForm
        defaultQuery={q}
        onSearch={(next) => {
          setParams({ q: next, page: 1 });
        }}
      />
      <FilterBar
        language={language}
        minStars={minStars}
        sort={sort}
        onChange={(obj) => setParams({ q, page: 1, ...obj })}
      />
      {isLoading && <Skeleton count={6} />}
      {error && <ErrorMessage error={error} />}
      {!isLoading && !error && items.length === 0 && <EmptyState query={q} />}

      <ul className="grid gap-4 mt-4">
        {items.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </ul>

      <Pagination
        page={page}
        hasNext={
          items.length === 20 && page < Math.ceil(Math.min(total, 1000) / 20)
        }
        onPage={(p) =>
          setParams({ q, page: p, lang: language, stars: minStars, sort })
        }
      />
    </section>
  );
}
