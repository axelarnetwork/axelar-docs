import { useState, useEffect } from "react";
import { fetchNodeInfo } from "../lib/axelarscan-api";

const cache = {};

export default ({ environment = "mainnet" }) => {
  const [version, setVersion] = useState(() => cache[environment] || null);

  useEffect(() => {
    if (cache[environment]) {
      setVersion(cache[environment]);
      return;
    }

    let cancelled = false;

    fetchNodeInfo(environment)
      .then((nodeInfo) => {
        if (cancelled) return;
        const v = nodeInfo?.application_version?.version;
        if (v) {
          cache[environment] = v;
          setVersion(v);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [environment]);

  return <span>{version || "..."}</span>;
};
