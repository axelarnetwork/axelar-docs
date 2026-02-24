import { resolveImageUrl } from "./axelarscan-api";

const CHAIN_TYPE_LABELS = { evm: "evm", vm: "amplifier", cosmos: "cosmos" };

/**
 * Transform getChains API response into the shape expected by evm/chains.jsx.
 * Includes EVM, VM (Amplifier), and Cosmos chains.
 */
export function transformChains(apiChains) {
  if (!Array.isArray(apiChains)) return [];
  return apiChains
    .filter((c) => c.chain_type === "evm" || c.chain_type === "vm" || c.chain_type === "cosmos")
    .filter((c) => c.chain_type !== "vm" || c.voting_verifier?.address || c.gateway?.address)
    .map((chain) => ({
      id: chain.id,
      name: chain.name,
      chain_id: chain.chain_id,
      network_id: chain.chain_name || chain.maintainer_id || chain.id,
      chain_type: CHAIN_TYPE_LABELS[chain.chain_type] || chain.chain_type,
      provider_params: chain.provider_params || [],
      image: resolveImageUrl(chain.image),
      explorer: chain.explorer,
      is_staging: chain.is_staging,
      prefix_address: chain.prefix_address,
      endpoints: chain.endpoints,
      no_inflation: chain.no_inflation,
      deprecated: chain.deprecated,
    }))
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
}

/**
 * Extract gateway addresses from getChains response.
 * Output shape matches gateways.json: [{ id, address }]
 */
export function transformGateways(apiChains) {
  if (!Array.isArray(apiChains)) return [];
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
 * Extract the Interchain Token Service (ITS) address from getContracts response.
 * ITS is deployed via Create3 so the address is the same across all chains.
 *
 * The API shape is: { interchain_token_service_contract: { addresses: ["0x..."] } }
 * We also handle a potential single `address` string for forward-compatibility.
 * Returns the primary ITS address string, or null.
 */
export function transformITSAddress(contractsResponse) {
  if (!contractsResponse) return null;
  const its = contractsResponse.interchain_token_service_contract;
  if (!its) return null;
  if (Array.isArray(its.addresses) && its.addresses.length > 0) {
    return its.addresses[0];
  }
  if (typeof its.address === "string" && its.address) {
    return its.address;
  }
  return null;
}

/**
 * Chains that have been deprecated and should be excluded from asset listings.
 */
const DEPRECATED_ASSET_CHAINS = ["aurora"];

/**
 * Transform getAssets API response into the shape expected by evm/assets.jsx.
 *
 * API shape:  { id, denom, name, symbol, decimals, image, addresses: { [chain]: { symbol, address } } }
 * Output shape matches evm_assets.json:
 *   { id, name, symbol, image, contracts: [{ chain, address, symbol, decimals }] }
 */
export function transformEvmAssets(apiAssets) {
  if (!Array.isArray(apiAssets)) return [];
  return apiAssets
    .map((asset) => ({
      id: asset.id || asset.denom,
      name: asset.name
        ? `${asset.symbol} - ${asset.name}`
        : asset.symbol || "",
      symbol: asset.symbol || "",
      image: resolveImageUrl(asset.image),
      contracts: Object.entries(asset.addresses || {})
        .filter(([chainId, addrData]) => addrData?.address && !DEPRECATED_ASSET_CHAINS.includes(chainId))
        .map(([chainId, addrData]) => ({
          chain: chainId,
          address: addrData.address,
          symbol: addrData.symbol || asset.symbol,
          decimals: addrData.decimals || asset.decimals,
        })),
    }))
    .filter((asset) => asset.contracts.length > 0);
}
