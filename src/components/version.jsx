import { useState, useEffect } from "react";
import { fetchLatestRelease, fetchNodeInfo } from "../lib/axelarscan-api";

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const cache = {};

function getCached(key) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    delete cache[key];
    return null;
  }
  return entry.value;
}

function setCache(key, value) {
  cache[key] = { value, timestamp: Date.now() };
}

/**
 * Displays a live version string.
 *
 * Usage:
 *   <Version environment="mainnet" />           — fetches axelar-core version from LCD
 *   <Version repo="tofnd" />                    — fetches latest GitHub release tag
 */
export default ({ environment = "mainnet", repo }) => {
  // repo-based fetches (e.g. tofnd) are environment-agnostic (single GitHub release),
  // so we use just the repo name as cache key to avoid duplicate fetches.
  const cacheKey = repo ? repo : environment;
  const [version, setVersion] = useState(() => getCached(cacheKey));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (getCached(cacheKey)) {
      setVersion(getCached(cacheKey));
      return;
    }

    let cancelled = false;

    const promise = repo
      ? fetchLatestRelease(repo).then((r) => r?.tag_name?.replace(/^v/, ""))
      : fetchNodeInfo(environment).then((r) => r?.application_version?.version);

    promise
      .then((v) => {
        if (cancelled) return;
        if (!v) {
          setFailed(true);
          return;
        }
        setCache(cacheKey, v);
        setVersion(v);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(`Failed to fetch version (${cacheKey}):`, err);
        setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [cacheKey]);

  if (failed) return <span>N/A</span>;
  return <span>{version || "..."}</span>;
};
