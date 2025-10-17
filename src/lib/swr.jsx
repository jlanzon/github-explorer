import { SWRConfig } from "swr";

const fetcher = async (url) => {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  const res = await fetch(url, { signal: ctrl.signal });
  clearTimeout(t);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`HTTP ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
};

export const SWRProvider = ({ children }) => (
  <SWRConfig
    value={{
      fetcher,
      dedupingInterval: 1000,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }}
  >
    {children}
  </SWRConfig>
);

export default SWRProvider;
