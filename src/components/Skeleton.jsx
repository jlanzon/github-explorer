export default function Skeleton({ count = 3 }) {
  return (
    <div className="animate-pulse space-y-3 mt-4">
      {/*  <div className="animate-bounce space-y-3 mt-4"> */}

      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-20 rounded-2xl bg-zinc-200/60 dark:bg-zinc-700/50"
        />
      ))}
    </div>
  );
}
