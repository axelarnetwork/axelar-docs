import { resolveImageUrl } from "./axelarscan-api";

/**
 * Transform getChains API response into the shape expected by evm/chains.jsx.
 * Filters to EVM and VM chains (includes amplifier chains like Hyperliquid).
 *
 * Output shape matches evm_chains.json:
 *   { id, name, chain_id, network_id, provider_params, image, explorer }
 */
export function transformChains(apiChains) {
  return apiChains
    .filter((c) => c.chain_type === "evm" || c.chain_type === "vm")
    .map((chain) => ({
      id: chain.id,
      name: chain.name,
      chain_id: chain.chain_id,
      network_id: chain.chain_name || chain.maintainer_id || chain.id,
      provider_params: chain.provider_params || [],
      image: resolveImageUrl(chain.image),
      explorer: chain.explorer,
      is_staging: chain.is_staging,
    }))
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

/**
 * Extract gateway addresses from getChains response.
 * Output shape matches gateways.json: [{ id, address }]
 */
export function transformGateways(apiChains) {
  return apiChains
    .filter((c) => c.gateway?.address)
    .map((chain) => ({
      id: chain.id,
      address: chain.gateway.address,
    }));
}

/**
 * Extract gas service addresses from getContracts response.
 * The API returns: { gas_service_contracts: { [chainId]: { address } }, ... }
 * Output shape matches gas_services.json: [{ id, address }]
 */
export function transformGasServices(contractsResponse) {
  if (!contractsResponse) return [];

  const gasServices = contractsResponse.gas_service_contracts || {};
  return Object.entries(gasServices)
    .filter(([_, data]) => data?.address)
    .map(([chainId, data]) => ({
      id: chainId,
      address: data.address,
    }));
}

/**
 * Transform getAssets API response into the shape expected by evm/assets.jsx.
 *
 * API shape:  { id, denom, name, symbol, decimals, image, addresses: { [chain]: { symbol, address } } }
 * Output shape matches evm_assets.json:
 *   { id, name, symbol, image, contracts: [{ chain, address, symbol, decimals }] }
 */
export function transformEvmAssets(apiAssets) {
  return apiAssets
    .map((asset) => ({
      id: asset.id || asset.denom,
      name: asset.name
        ? `${asset.symbol} - ${asset.name}`
        : asset.symbol || "",
      symbol: asset.symbol || "",
      image: resolveImageUrl(asset.image),
      contracts: Object.entries(asset.addresses || {})
        .filter(([_, addrData]) => addrData?.address)
        .map(([chainId, addrData]) => ({
          chain: chainId,
          address: addrData.address,
          symbol: addrData.symbol || asset.symbol,
          decimals: addrData.decimals || asset.decimals,
        })),
    }))
    .filter((asset) => asset.contracts.length > 0);
}
