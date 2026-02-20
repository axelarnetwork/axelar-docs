import { useState, useEffect } from "react";
import { fetchLatestRelease, fetchNodeInfo } from "../lib/axelarscan-api";

const cache = {};

/**
 * Displays a live version string.
 *
 * Usage:
 *   <Version environment="mainnet" />           — fetches axelar-core version from LCD
 *   <Version repo="tofnd" />                    — fetches latest GitHub release tag
 */
export default ({ environment = "mainnet", repo }) => {
  const cacheKey = repo || environment;
  const [version, setVersion] = useState(() => cache[cacheKey] || null);

  useEffect(() => {
    if (cache[cacheKey]) {
      setVersion(cache[cacheKey]);
      return;
    }

    let cancelled = false;

    const promise = repo
      ? fetchLatestRelease(repo).then((r) => r?.tag_name?.replace(/^v/, ""))
      : fetchNodeInfo(environment).then((r) => r?.application_version?.version);

    promise
      .then((v) => {
        if (cancelled || !v) return;
        cache[cacheKey] = v;
        setVersion(v);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [cacheKey]);

  return <span>{version || "..."}</span>;
};
