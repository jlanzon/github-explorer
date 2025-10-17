export default function ErrorMessage({ error }) {
  return (
    <div className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-red-800">
      <p className="font-semibold">Something went wrong</p>
      <p className="text-sm opacity-80">{error?.message}</p>
    </div>
  );
}
