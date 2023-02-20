import semver from "semver";

export async function fetchLatestTagForRepo(repositoryPath = "") {
  const versions = await fetch(
    `https://api.github.com/repos/${repositoryPath}/tags`
  ).then((res) => res.json());

  const sorted = versions.sort((v1, v2) => semver.compare(v2.name, v1.name));

  return String(sorted[0].name);
}
