import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SearchPage from "./pages/SearchPage";
import RepoPage from "./pages/RepoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <SearchPage /> },
      { path: "repo/:owner/:name", element: <RepoPage /> },
    ],
  },
]);
