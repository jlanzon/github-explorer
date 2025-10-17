export default function FilterBar({ language, minStars, sort, onChange }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2 items-center">
      <input
        className="px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-800"
        placeholder="Language (e.g. JavaScript)"
        value={language}
        onChange={(e) =>
          onChange({ lang: e.target.value, stars: minStars, sort })
        }
      />
      <input
        className="px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-800"
        placeholder="Min stars"
        inputMode="numeric"
        value={minStars}
        onChange={(e) =>
          onChange({ lang: language, stars: e.target.value, sort })
        }
      />
      <select
        className="px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-800"
        value={sort}
        onChange={(e) =>
          onChange({ lang: language, stars: minStars, sort: e.target.value })
        }
      >
        <option value="stars">Stars</option>
        <option value="forks">Forks</option>
        <option value="updated">Recently updated</option>
      </select>
    </div>
  );
}
