import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { SWRProvider } from "./lib/swr";
import { PostHogProvider } from "posthog-js/react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={"phc_4YIRqW5yabGNLn1k3NPI8vRPGVE7SIpyuPXoe3yIItI"}
      options={{
        api_host: "https://eu.i.posthog.com",
        defaults: "2025-05-24",
        capture_exceptions: true, // This enables capturing exceptions using Error Tracking
        debug: import.meta.env.MODE === "development",
      }}
    >
      <SWRProvider>
        <RouterProvider router={router} />
      </SWRProvider>
    </PostHogProvider>
  </React.StrictMode>
);

// DEV NOTE
// With the way this is set up, without a proxy i mean, the api request wont work
// so add your key VITE_GITHUB_TOKEN= to .env and change fetcher the vite config key
