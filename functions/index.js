// functions/index.js
const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

setGlobalOptions({
  region: "europe-west2",
  maxInstances: 10,
});

const GITHUB_TOKEN = defineSecret("GITHUB_TOKEN");

// helper
async function ghFetch(url, { accept, raw } = {}) {
  const headers = {
    "User-Agent": "firebase-fn",
    Accept: accept || "application/vnd.github+json",
    Authorization: `Bearer ${GITHUB_TOKEN.value()}`,
  };
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(`GitHub ${res.status} ${res.statusText} – ${text}`);
    err.status = res.status;
    throw err;
  }
  return raw ? res.text() : res.json();
}

// NB: rewrites use wildcards, so we read owner/name from the path
function getOwnerRepoFromPath(req, expectedBase) {
  // e.g. /api/github/repo/facebook/react
  const parts = req.path.replace(expectedBase, "").split("/").filter(Boolean);
  const owner = parts[0];
  const name = parts[1];
  return { owner, name };
}

// GET /api/github/repo/:owner/:name
exports.githubRepoDetails = onRequest(
  { cors: true, secrets: [GITHUB_TOKEN] },
  async (req, res) => {
    try {
      const { owner, name } = getOwnerRepoFromPath(req, "/api/github/repo/");
      if (!owner || !name)
        return res.status(400).json({ error: "owner and name are required" });
      const data = await ghFetch(
        `https://api.github.com/repos/${owner}/${name}`
      );
      res.set("Cache-Control", "public, max-age=60");
      res.json(data);
    } catch (e) {
      res.status(e.status || 500).json({ error: e.message });
    }
  }
);

// GET /api/github/readme/:owner/:name
exports.githubReadmeRaw = onRequest(
  { cors: true, secrets: [GITHUB_TOKEN] },
  async (req, res) => {
    try {
      const { owner, name } = getOwnerRepoFromPath(req, "/api/github/readme/");
      if (!owner || !name)
        return res.status(400).send("owner and name are required");

      const content = await ghFetch(
        `https://api.github.com/repos/${owner}/${name}/readme`,
        { accept: "application/vnd.github.v3.raw", raw: true }
      );

      res.set("Content-Type", "text/markdown; charset=utf-8");
      res.set("Cache-Control", "public, max-age=60");
      res.send(content);
    } catch (e) {
      res.status(e.status || 500).send(e.message);
    }
  }
);
