import AddChain from "../web3";
import Copy from "../copy";
import { ellipse } from "../../utils";
import { useEffect, useState } from "react";

export default ({ environment = "mainnet" }) => {
  const CHAIN_CONFIGS = {
    mainnet:
      "https://axelar-mainnet.s3.us-east-2.amazonaws.com/configs/mainnet-config-1.x.json",
    testnet:
      "https://axelar-testnet.s3.us-east-2.amazonaws.com/configs/testnet-config-1.x.json",
  };

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(CHAIN_CONFIGS[environment]);
        console.log("fetching", CHAIN_CONFIGS[environment]);
        const data = await response.json();
        console.log("data", data);
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="resource-grid">
      {isLoading && <p>Loading chain data...</p>}
      {error && <p>Error: {error.message}</p>}
      {data &&
        Object.values(data.chains)
          .filter((chain) => chain.chainType == "evm")
          .map((chain) => {
            const newChain = {};

            newChain.id = chain.id;
            newChain.chain_id = chain.externalChainId;
            newChain.network_id = chain.id;
            newChain.name = chain.displayName;
            newChain.image = chain.iconUrl;
            newChain.provider_params = {
              chainId: "0x" + parseInt(newChain.chain_id, 10).toString(16),
              chainName: chain.displayName,
              rpcUrls: chain.rpcUrls,
              nativeCurrency: chain.nativeCurrency,
              blockExplorerUrls: chain.blockExplorers?.map(
                (explorer) => explorer.url
              ),
            };
            newChain.explorer_url =
              newChain.provider_params.blockExplorerUrls?.[0] || null;
            newChain.gateway_contract_address =
              chain.config?.contracts?.["AxelarGateway"].address;
            newChain.gas_service_address =
              chain.config?.contracts?.["AxelarGasService"].address;
            console.log("new chain data is", newChain);
            return newChain;
          })
          .map((chain, i) => (
            <div className="resource-card" key={i}>
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {chain.image && (
                    <img
                      src={chain.image}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">
                      {chain.name}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">
                      Chain ID: {chain.chain_id}
                    </span>
                  </div>
                </div>
                <AddChain environment={chain.environment} chain={chain.id} />
              </div>
              <div className="flex flex-col flex-wrap justify-between">
                <span className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  Chain Name:
                </span>
                <div className="flex items-center text-sm space-x-1">
                  <Copy
                    size={18}
                    title={chain.network_id}
                    value={chain.network_id}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-wrap justify-between">
                <span className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  Gateway Contract:
                </span>
                <div className="flex items-center text-sm space-x-1">
                  {chain.gateway_contract_address ? (
                    <a
                      href={`${chain.explorer_url}/address/${chain.gateway_contract_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline text-blue-500 dark:text-white font-semibold"
                    >
                      {/* {ellipse(chain.gateway_contract_address, 14)} */}
                    </a>
                  ) : (
                    <span className="text-gray-500 dark:text-white font-semibold">
                      -
                    </span>
                  )}
                  {chain.gateway_contract_address && (
                    <Copy
                      size={18}
                      hide={true}
                      value={chain.gateway_contract_address}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-wrap justify-between">
                <span className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  Gas Service Contract:
                </span>
                <div className="flex items-center text-sm space-x-1">
                  {chain.gas_service_address ? (
                    <a
                      href={`${chain.explorer_url}/address/${chain.gas_service_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline text-blue-500 dark:text-white font-semibold"
                    >
                      {ellipse(chain.gas_service_address, 14)}
                    </a>
                  ) : (
                    <span className="text-gray-500 dark:text-white font-semibold">
                      -
                    </span>
                  )}
                  {chain.gas_service_address && (
                    <Copy
                      size={18}
                      hide={true}
                      value={chain.gas_service_address}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};
