const API = "https://api.github.com";

export const searchRepos = ({
  q,
  page = 1,
  sort = "stars",
  order = "desc",
  language,
  minStars,
}) => {
  const terms = [q?.trim()].filter(Boolean);
  if (language) terms.push(`language:${language}`);
  if (minStars) terms.push(`stars:>=${minStars}`);
  const query = encodeURIComponent(terms.join(" "));
  return `${API}/search/repositories?q=${query}&sort=${sort}&order=${order}&page=${page}&per_page=20`;
};

export const repoDetailsUrl = (owner, repo) => `${API}/repos/${owner}/${repo}`;

export const repoReadmeRawUrl = (owner, repo) =>
  `${API}/repos/${owner}/${repo}/readme`; // use Accept: raw when fetching
