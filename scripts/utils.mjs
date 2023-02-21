import semver from "semver";

export async function fetchLatestTags({ limit = 1, repository = "" }) {
  const endpoint = `https://api.github.com/repos/${repository}/tags`;
  const versions = await fetch(endpoint).then((res) => res.json());

  const sorted = versions.sort((v1, v2) => semver.compare(v2.name, v1.name));

  return sorted.slice(0, limit).map((v) => String(v.name));
}
