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
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
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