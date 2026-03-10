import {
  AXELARSCAN_API_URLS,
  AXELARSCAN_IMAGE_BASE,
  GITHUB_API_BASE,
  LCD_URLS,
} from "../config/variables";

export function resolveImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/")) {
    return `${AXELARSCAN_IMAGE_BASE}${imagePath}`;
  }
  return imagePath;
}

export async function fetchChains(environment = "mainnet") {
  const res = await fetch(`${AXELARSCAN_API_URLS[environment]}/api/getChains`);
  if (!res.ok) throw new Error(`Failed to fetch chains: ${res.status}`);
  return res.json();
}

export async function fetchContracts(environment = "mainnet") {
  const res = await fetch(`${AXELARSCAN_API_URLS[environment]}/gmp/getContracts`);
  if (!res.ok) throw new Error(`Failed to fetch contracts: ${res.status}`);
  return res.json();
}

export async function fetchAssets(environment = "mainnet") {
  const res = await fetch(`${AXELARSCAN_API_URLS[environment]}/api/getAssets`);
  if (!res.ok) throw new Error(`Failed to fetch assets: ${res.status}`);
  return res.json();
}

export async function fetchLatestRelease(repo) {
  const res = await fetch(
    `${GITHUB_API_BASE}/repos/axelarnetwork/${repo}/releases/latest`,
  );
  if (!res.ok) throw new Error(`Failed to fetch ${repo} release: ${res.status}`);
  return res.json();
}

export async function fetchNodeInfo(environment = "mainnet") {
  const res = await fetch(
    `${LCD_URLS[environment]}/cosmos/base/tendermint/v1beta1/node_info`,
  );
  if (!res.ok) throw new Error(`Failed to fetch node info: ${res.status}`);
  return res.json();
}
