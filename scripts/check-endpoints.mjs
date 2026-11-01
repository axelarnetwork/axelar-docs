// Checks every public endpoint listed on the Network page (src/data/resources.json).
//
//   node scripts/check-endpoints.mjs [--json]
//
// For each RPC, LCD, gRPC and websocket endpoint it verifies that the endpoint answers, serves
// the expected chain, and is not stuck (latest block younger than MAX_BLOCK_AGE_S). It also
// records whether HTTP endpoints allow cross-origin browser requests (CORS). Exits 1 if any
// endpoint fails.
import http2 from 'node:http2';
import { readFileSync } from 'node:fs';

const resources = JSON.parse(
  readFileSync(new URL('../src/data/resources.json', import.meta.url), 'utf8'),
);

const CHAIN_IDS = {
  mainnet: 'axelar-dojo-1',
  testnet: 'axelar-testnet-lisbon-3',
};
const TIMEOUT_MS = 10_000;
const MAX_BLOCK_AGE_S = 120;
const MAX_BLOCKS_BEHIND = 50;
const ORIGIN = 'https://docs.axelar.dev';

const join = (base, path) => base.replace(/\/+$/, '') + path;
// Nodes that never set a block time report the Unix epoch; treat that as unknown.
const ageSeconds = (time) =>
  Date.parse(time) > 0
    ? Math.round((Date.now() - Date.parse(time)) / 1000)
    : undefined;

async function getJson(url, retries = 1) {
  const res = await fetch(url, {
    headers: { Origin: ORIGIN },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  // Public endpoints rate-limit bursts; retry once before calling it a failure.
  if (res.status === 429 && retries > 0) {
    await new Promise((r) => setTimeout(r, 2000));
    return getJson(url, retries - 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const cors = res.headers.get('access-control-allow-origin');
  return { body: await res.json(), cors: cors === '*' || cors === ORIGIN };
}

// CometBFT RPC: /status
async function checkRpc(url) {
  const { body, cors } = await getJson(join(url, '/status'));
  const { node_info, sync_info } = body.result ?? body;
  return {
    chainId: node_info.network,
    height: Number(sync_info.latest_block_height),
    age: ageSeconds(sync_info.latest_block_time),
    catchingUp: sync_info.catching_up,
    cors,
  };
}

// Cosmos REST (LCD): latest block
async function checkLcd(url) {
  const { body, cors } = await getJson(
    join(url, '/cosmos/base/tendermint/v1beta1/blocks/latest'),
  );
  const header = (body.sdk_block ?? body.block).header;
  return {
    chainId: header.chain_id,
    height: Number(header.height),
    age: ageSeconds(header.time),
    cors,
  };
}

// CometBFT websocket: JSON-RPC `status` over the socket. Browsers don't apply CORS to websockets.
function checkWebsocket(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const timer = setTimeout(() => {
      ws.close();
      reject(new Error('timeout'));
    }, TIMEOUT_MS);
    ws.onopen = () =>
      ws.send(
        JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'status', params: {} }),
      );
    ws.onerror = () => {
      clearTimeout(timer);
      reject(new Error('connection failed'));
    };
    ws.onmessage = (event) => {
      clearTimeout(timer);
      ws.close();
      try {
        const { node_info, sync_info } = JSON.parse(event.data).result;
        resolve({
          chainId: node_info.network,
          height: Number(sync_info.latest_block_height),
          age: ageSeconds(sync_info.latest_block_time),
          catchingUp: sync_info.catching_up,
          cors: true,
        });
      } catch {
        reject(new Error('unexpected response'));
      }
    };
  });
}

// gRPC: raw call to cosmos.base.tendermint.v1beta1.Service/GetNodeInfo with an empty request.
// The response is protobuf; rather than decoding it, look for the expected chain ID in the bytes.
function grpcGetNodeInfo(authority) {
  return new Promise((resolve, reject) => {
    const client = http2.connect(authority);
    const fail = (err) => {
      client.destroy();
      reject(err);
    };
    const timer = setTimeout(() => fail(new Error('timeout')), TIMEOUT_MS);
    client.on('error', (err) => {
      clearTimeout(timer);
      fail(err);
    });
    const req = client.request({
      ':method': 'POST',
      ':path': '/cosmos.base.tendermint.v1beta1.Service/GetNodeInfo',
      'content-type': 'application/grpc',
      te: 'trailers',
    });
    const chunks = [];
    let status;
    req.on('response', (headers) => {
      if (headers[':status'] !== 200)
        fail(new Error(`HTTP ${headers[':status']}`));
      status = headers['grpc-status'] ?? status;
    });
    req.on(
      'trailers',
      (trailers) => (status = trailers['grpc-status'] ?? status),
    );
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      clearTimeout(timer);
      client.close();
      if (status !== undefined && status !== '0')
        return reject(new Error(`grpc-status ${status}`));
      resolve(Buffer.concat(chunks));
    });
    req.on('error', (err) => {
      clearTimeout(timer);
      fail(err);
    });
    req.end(Buffer.alloc(5)); // uncompressed, zero-length message
  });
}

async function checkGrpc(hostPort, expectedChainId) {
  let body;
  try {
    body = await grpcGetNodeInfo(`https://${hostPort}`);
  } catch (err) {
    // The server answered over TLS, so its error is the real result; don't retry in plaintext.
    if (/^(HTTP|grpc-status) /.test(err.message)) throw err;
    body = await grpcGetNodeInfo(`http://${hostPort}`); // plaintext (h2c)
  }
  const text = body.toString('latin1');
  return {
    chainId: text.includes(expectedChainId) ? expectedChainId : 'unknown',
  };
}

const CHECKS = {
  'RPC endpoints': ['RPC', checkRpc],
  'LCD endpoints': ['LCD', checkLcd],
  'gRPC endpoints': ['gRPC', checkGrpc],
  Websocket: ['WS', checkWebsocket],
};

async function runCheck(env, kind, fn, url) {
  const started = Date.now();
  try {
    const r = await fn(url, CHAIN_IDS[env]);
    const problems = [];
    if (r.chainId !== CHAIN_IDS[env])
      problems.push(`wrong chain (${r.chainId})`);
    if (r.catchingUp) problems.push('catching up');
    if (r.age !== undefined && r.age > MAX_BLOCK_AGE_S)
      problems.push(`stale (${r.age}s old)`);
    return {
      env,
      kind,
      url,
      ok: problems.length === 0,
      ms: Date.now() - started,
      ...r,
      problems,
    };
  } catch (err) {
    return {
      env,
      kind,
      url,
      ok: false,
      ms: Date.now() - started,
      problems: [err.cause?.code ?? err.message],
    };
  }
}

const jobs = [];
for (const [env, categories] of Object.entries(resources)) {
  for (const { name, value } of categories) {
    if (!CHECKS[name]) continue;
    const [kind, fn] = CHECKS[name];
    for (const { value: url } of value) jobs.push(runCheck(env, kind, fn, url));
  }
}
const results = await Promise.all(jobs);

// Flag nodes that answer but lag behind the best height seen on the same network.
for (const env of Object.keys(CHAIN_IDS)) {
  const best = Math.max(
    0,
    ...results.filter((r) => r.env === env && r.height).map((r) => r.height),
  );
  for (const r of results.filter((r) => r.env === env && r.height)) {
    if (best - r.height > MAX_BLOCKS_BEHIND) {
      r.ok = false;
      r.problems.push(`${best - r.height} blocks behind`);
    }
  }
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const r of results) {
    const status = r.ok ? 'ok  ' : 'FAIL';
    const height = r.height ? `height ${r.height}` : '';
    const cors =
      r.kind === 'RPC' || r.kind === 'LCD' ? (r.cors ? 'cors' : 'no-cors') : '';
    const details = [height, cors, ...r.problems].filter(Boolean).join(', ');
    console.log(
      `${status} ${r.env.padEnd(7)} ${r.kind.padEnd(4)} ${r.url.padEnd(48)} ${String(r.ms).padStart(5)}ms  ${details}`,
    );
  }
  const failed = results.filter((r) => !r.ok).length;
  console.log(
    `\n${results.length - failed}/${results.length} endpoints healthy`,
  );
}

process.exitCode = results.some((r) => !r.ok) ? 1 : 0;
