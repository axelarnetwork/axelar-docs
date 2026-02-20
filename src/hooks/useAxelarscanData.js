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
  transformEvmAssets,
} from "../lib/transform-api-data";

// In-memory cache to avoid refetching across components on the same page.
const cache = {};

function getCacheKey(environment, dataType) {
  return `${environment}:${dataType}`;
}

/**
 * Fetches chain + contract data from the axelarscan API.
 * Returns { chains, gateways, gasServices, loading, error }
 */
export function useChainData(environment = "mainnet") {
  const cacheKey = getCacheKey(environment, "chains");
  const [data, setData] = useState(() => cache[cacheKey] || null);
  const [loading, setLoading] = useState(!cache[cacheKey]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      setLoading(false);
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
        };
        cache[cacheKey] = result;
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
  const [data, setData] = useState(() => cache[cacheKey] || null);
  const [loading, setLoading] = useState(!cache[cacheKey]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      setLoading(false);
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
        cache[cacheKey] = result;
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
