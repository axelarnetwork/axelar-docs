import _ from "lodash";

import cosmos_chains from "../../data/cosmos_chains.json";
import ibc_channels from "../../data/ibc_channels.json";

const MAIN_CHAIN = "axelarnet";

export default ({ environment = "mainnet" }) => {
  const _cosmos_chains = cosmos_chains?.[environment] || [];
  const _ibc_channels = ibc_channels?.[environment] || [];

  const pairs = Object.entries(
    _.groupBy(
      _ibc_channels.map((c) => {
        return {
          ...c,
          other_chain: _.head(
            [c?.from, c?.to].filter((cid) => cid && cid !== MAIN_CHAIN),
          ),
        };
      }),
      "other_chain",
    ),
  ).map(([other_chain, channels]) => {
    return {
      chain_data: _cosmos_chains.find((c) => c?.id === MAIN_CHAIN),
      other_chain_data: _cosmos_chains.find((c) => c?.id === other_chain),
      channels,
    };
  });

  return (
    <div className="ibc-channels grid grid-flow-row grid-cols-1 sm:grid-cols-2  gap-4 not-prose">
      {pairs.map((p, i) => {
        const { chain_data, other_chain_data, channels } = { ...p };

        return (
          <div
            key={i}
            className="border border-border bg-background-neutral-dark rounded-xl grid grid-cols-3 gap-4 p-3"
          >
            <div className="flex flex-col items-center space-y-2">
              {chain_data?.image && (
                <img
                  src={chain_data.image}
                  alt=""
                  className="rounded-lg size-12"
                />
              )}
              <div className="flex flex-col items-center">
                <span className="whitespace-nowrap text-sm font-semibold font-clash ">
                  {chain_data?.name}
                </span>
                {chain_data?.network_id && (
                  <span className="whitespace-nowrap text-primary text-xs font-medium">
                    {chain_data.network_id}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2.5 items-center justify-center">
              <span className="whitespace-nowrap text-gray-600 dark:text-gray-400 text-sm">
                {channels.find((c) => c?.from === chain_data?.id)?.channel_id}
              </span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"></path>
              </svg>
              <span className="whitespace-nowrap text-gray-600 dark:text-gray-400 text-sm">
                {
                  channels.find((c) => c?.from === other_chain_data?.id)
                    ?.channel_id
                }
              </span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              {other_chain_data?.image && (
                <img
                  src={other_chain_data.image}
                  alt=""
                  className={`${["fetch"].includes(other_chain_data.id) ? "bg-background rounded-lg size-12 " : "rounded-lg size-12"}`}
                />
              )}
              <div className="flex flex-col items-center">
                <span className="whitespace-nowrap text-sm font-clash font-semibold">
                  {other_chain_data?.name}
                </span>
                {other_chain_data?.network_id && (
                  <span className="whitespace-nowrap text-primary text-xs font-medium">
                    {other_chain_data.network_id}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
