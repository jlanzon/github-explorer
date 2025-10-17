export default function Pagination({ page, hasNext, onPage }) {
  return (
    <div className="mt-6 flex gap-2">
      <button
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="px-3 py-2 rounded-xl border disabled:opacity-40"
      >
        Previous
      </button>
      <span className="px-3 py-2">{page}</span>
      <button
        disabled={!hasNext}
        onClick={() => onPage(page + 1)}
        className="px-3 py-2 rounded-xl border disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
