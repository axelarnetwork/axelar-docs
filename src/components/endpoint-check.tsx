'use client';
import { useState } from 'react';
import Copy from '@/components/legacy/copy';

export type EndpointKind = 'rpc' | 'lcd' | 'ws';

type Result =
  | { state: 'checking' }
  | { state: 'ok'; ms: number; height: number }
  | { state: 'failed'; reason: string }
  | { state: 'unreachable' };

const TIMEOUT_MS = 10_000;
const MAX_BLOCK_AGE_S = 120;

type Status = {
  chainId: string;
  height: number;
  time: string;
  catchingUp?: boolean;
};

const join = (base: string, path: string) => base.replace(/\/+$/, '') + path;

class HttpError extends Error {}

async function getJson(url: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new HttpError(`HTTP ${res.status}`);
  return res.json();
}

async function rpcStatus(url: string): Promise<Status> {
  const body = await getJson(join(url, '/status'));
  const { node_info, sync_info } = body.result ?? body;
  return {
    chainId: node_info.network,
    height: Number(sync_info.latest_block_height),
    time: sync_info.latest_block_time,
    catchingUp: sync_info.catching_up,
  };
}

async function lcdStatus(url: string): Promise<Status> {
  const body = await getJson(
    join(url, '/cosmos/base/tendermint/v1beta1/blocks/latest'),
  );
  const header = (body.sdk_block ?? body.block).header;
  return {
    chainId: header.chain_id,
    height: Number(header.height),
    time: header.time,
  };
}

function wsStatus(url: string): Promise<Status> {
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
          time: sync_info.latest_block_time,
          catchingUp: sync_info.catching_up,
        });
      } catch {
        reject(new HttpError('unexpected response'));
      }
    };
  });
}

const STATUS = { rpc: rpcStatus, lcd: lcdStatus, ws: wsStatus };

async function check(
  kind: EndpointKind,
  url: string,
  chainId: string,
): Promise<Result> {
  const started = performance.now();
  try {
    const status = await STATUS[kind](url);
    const ms = Math.round(performance.now() - started);
    const age = (Date.now() - Date.parse(status.time)) / 1000;
    if (status.chainId !== chainId)
      return { state: 'failed', reason: `wrong chain (${status.chainId})` };
    if (status.catchingUp) return { state: 'failed', reason: 'catching up' };
    if (!(age <= MAX_BLOCK_AGE_S))
      return { state: 'failed', reason: 'latest block is stale' };
    return { state: 'ok', ms, height: status.height };
  } catch (err) {
    // A failed fetch in the browser is either a dead endpoint or a CORS block; they look the same.
    if (err instanceof HttpError)
      return { state: 'failed', reason: err.message };
    if (kind === 'ws')
      return { state: 'failed', reason: (err as Error).message };
    return { state: 'unreachable' };
  }
}

function ResultBadge({ result }: { result?: Result }) {
  if (!result) return null;
  switch (result.state) {
    case 'checking':
      return (
        <span className="text-xs text-fd-muted-foreground">checking…</span>
      );
    case 'ok':
      return (
        <span className="text-xs text-green-600 dark:text-green-400">
          ✓ {result.ms} ms · block {result.height.toLocaleString()}
        </span>
      );
    case 'failed':
      return (
        <span className="text-xs text-red-600 dark:text-red-400">
          ✗ {result.reason}
        </span>
      );
    case 'unreachable':
      return (
        <span className="text-xs text-amber-600 dark:text-amber-400">
          can't reach from the browser (down, or browser requests are blocked) —
          run <code>pnpm check:endpoints</code>
        </span>
      );
  }
}

const buttonClass =
  'rounded-md border px-2 py-0.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground disabled:opacity-50';

export function EndpointList({
  items,
  kind,
  chainId,
}: {
  items: { title?: string; value: string }[];
  kind?: EndpointKind;
  chainId: string;
}) {
  const [results, setResults] = useState<Record<string, Result>>({});

  const run = async (url: string) => {
    if (!kind) return;
    setResults((r) => ({ ...r, [url]: { state: 'checking' } }));
    const result = await check(kind, url, chainId);
    setResults((r) => ({ ...r, [url]: result }));
  };

  const busy = Object.values(results).some((r) => r.state === 'checking');

  return (
    <>
      {kind && (
        <button
          type="button"
          className={buttonClass}
          disabled={busy}
          onClick={() => items.forEach(({ value }) => run(value))}
        >
          Check all
        </button>
      )}
      <ul>
        {items.map(({ title, value }) => (
          <li key={value}>
            <span className="inline-flex flex-wrap items-center gap-2">
              <a href={value}>{title ?? value}</a>
              <Copy value={value} />
              {kind && (
                <button
                  type="button"
                  className={buttonClass}
                  disabled={results[value]?.state === 'checking'}
                  onClick={() => run(value)}
                >
                  Check
                </button>
              )}
              <ResultBadge result={results[value]} />
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
