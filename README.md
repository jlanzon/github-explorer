# Naimuri Coding Challenge - Github Explorer

**About this repo:** Sooo, this is a coding challenge from **Naimuri**, and it looked very interesting.

**dialogue**: _I get to create a new project from scratch, so I can try out some new things, like a Rust-based JavaScript bundler, to improve build performance and capabilities. Awesome!_

### ⚠️NOTE:

the online version will not work after 13th of Jan becuase my GH token will expire

### 🧱 Tech stack

React 18 + Vite (Rust-powered bundling under the hood via oxc/esbuild where applicable)

- SWR for data fetching & caching
- React Router for routing
- Tailwind CSS for styling
- TypeScript (optional: if the branch uses plain JS, the patterns are the same)
- Firebase for the hosting / Functions

## Deployment (Dev)

Note: you will need your own GHP from github.

To run this project run

```bash
git clone <this-repo-url>
cd <repo-folder>
npm install
npm run dev
```

### 📚 How AI helped

I used AI (ChatGPT) in a few places:

- Choosing the data layer: I asked for options to simplify API requests. I’ve used Axios before, or plain fetch inside useEffect, but AI suggested SWR, which I adopted.

- Fixing SWRProvider: I ran into a config issue and asked AI for help unblocking it. In hindsight, sticking to something I know well might’ve been faster, but this was a good learning exercise.

- Pagination & SearchPage logic: AI assisted with scaffolding the pagination and search code paths, which I then adapted.

/// All AI-provided snippets were reviewed and adjusted to fit the app’s structure.

🙌 Thanks

Thanks to Naimuri for an engaging challenge — it pushed me to try SWR and a faster build stack. If you’ve got feedback or want me to extend any part of this (tests, accessibility, or responsiveness), shout!

P.S - We test in PROD today!!!
