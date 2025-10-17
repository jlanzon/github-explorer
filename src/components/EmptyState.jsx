export default function EmptyState({ query }) {
  return (
    <p className="mt-6 opacity-80">No repositories found for “{query}”.</p>
  );
}
