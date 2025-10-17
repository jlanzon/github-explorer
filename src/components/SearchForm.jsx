import { useState } from "react";

export default function SearchForm({ defaultQuery = "", onSearch }) {
  const [value, setValue] = useState(defaultQuery);
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(value);
      }}
      role="search"
      aria-label="Search GitHub repositories"
    >
      <input
        className="input input-bordered flex-1 px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-800"
        placeholder="Search repositories…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
        Search
      </button>
    </form>
  );
}
