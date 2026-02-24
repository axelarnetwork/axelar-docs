import { useState, useEffect } from "react";
import {
  fetchChains,
  fetchContracts,
  fetchAssets,
} from "../lib/axelarscan-api";
import {
  transformChains,
  transformGateways,
  transformGasServices,
  transformITSAddress,
  transformEvmAssets,
} from "../lib/transform-api-data";

// In-memory cache with TTL to avoid refetching across components on the same page.
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const cache = {};

function getCached(key) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    delete cache[key];
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache[key] = { data, timestamp: Date.now() };
}

function getCacheKey(environment, dataType) {
  return `${environment}:${dataType}`;
}

/**
 * Fetches chain + contract data from the axelarscan API.
 * Returns { chains, gateways, gasServices, loading, error }
 */
export function useChainData(environment = "mainnet") {
  const cacheKey = getCacheKey(environment, "chains");
  const [data, setData] = useState(() => getCached(cacheKey));
  const [loading, setLoading] = useState(!getCached(cacheKey));
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = getCached(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([fetchChains(environment), fetchContracts(environment)])
      .then(([chainsResponse, contractsResponse]) => {
        if (cancelled) return;
        const result = {
          chains: transformChains(chainsResponse),
          gateways: transformGateways(chainsResponse),
          gasServices: transformGasServices(contractsResponse),
          itsAddress: transformITSAddress(contractsResponse),
        };
        setCache(cacheKey, result);
        setData(result);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to fetch chain data:", err);
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [environment]);

  return {
    chains: data?.chains || [],
    gateways: data?.gateways || [],
    gasServices: data?.gasServices || [],
    itsAddress: data?.itsAddress || null,
    loading,
    error,
  };
}

/**
 * Fetches asset data from the axelarscan API.
 * Returns { evmAssets, loading, error }
 */
export function useAssetData(environment = "mainnet") {
  const cacheKey = getCacheKey(environment, "assets");
  const [data, setData] = useState(() => getCached(cacheKey));
  const [loading, setLoading] = useState(!getCached(cacheKey));
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = getCached(cacheKey);
    if (cached) {
      setData(cached);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAssets(environment)
      .then((assetsResponse) => {
        if (cancelled) return;
        const result = {
          evmAssets: transformEvmAssets(assetsResponse),
        };
        setCache(cacheKey, result);
        setData(result);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Failed to fetch asset data:", err);
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [environment]);

  return {
    evmAssets: data?.evmAssets || [],
    loading,
    error,
  };
}
