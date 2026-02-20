const BASE_URLS = {
  mainnet: "https://api.axelarscan.io",
  testnet: "https://testnet.api.axelarscan.io",
};

const AXELARSCAN_IMAGE_BASE = "https://axelarscan.io";

export function resolveImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/logos/")) {
    return `${AXELARSCAN_IMAGE_BASE}${imagePath}`;
  }
  return imagePath;
}

export async function fetchChains(environment = "mainnet") {
  const res = await fetch(`${BASE_URLS[environment]}/api/getChains`);
  if (!res.ok) throw new Error(`Failed to fetch chains: ${res.status}`);
  return res.json();
}

export async function fetchContracts(environment = "mainnet") {
  const res = await fetch(`${BASE_URLS[environment]}/gmp/getContracts`);
  if (!res.ok) throw new Error(`Failed to fetch contracts: ${res.status}`);
  return res.json();
}

export async function fetchAssets(environment = "mainnet") {
  const res = await fetch(`${BASE_URLS[environment]}/api/getAssets`);
  if (!res.ok) throw new Error(`Failed to fetch assets: ${res.status}`);
  return res.json();
}

const LCD_URLS = {
  mainnet: "https://lcd-axelar.imperator.co",
  testnet: "https://axelar-testnet-lcd.qubelabs.io",
};

export async function fetchNodeInfo(environment = "mainnet") {
  const res = await fetch(
    `${LCD_URLS[environment]}/cosmos/base/tendermint/v1beta1/node_info`,
  );
  if (!res.ok) throw new Error(`Failed to fetch node info: ${res.status}`);
  return res.json();
}
