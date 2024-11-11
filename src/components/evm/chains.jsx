import React, { useState, useEffect } from "react";
import { ellipse } from "../../utils";
import Copy from "../copy";
import AddChain from "../web3";

function toHex(decimal) {
  return decimal.toString(16).toUpperCase();
}

export default ({ environment = "mainnet" }) => {
  const [chainConfigs, setChainConfigs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (environment == "mainnet") {
          url =
            "https://axelar-mainnet.s3.us-east-2.amazonaws.com/configs/mainnet-config-1.x.json";
        } else {
          url =
            "https://axelar-testnet.s3.us-east-2.amazonaws.com/configs/testnet-config-1.x.json";
        }

        const chainConfigResponse = await fetch(url);
        const chainConfigData = await chainConfigResponse.json();
        setChainConfigs(chainConfigData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [environment]);

  return (
    <div className="grid lg:grid-cols-2 gap-5 not-prose">
      Items in chains:
      {chainConfigs &&
        chainConfigs.chains &&
        Object.values(chainConfigs.chains).length}
      Thanks!
      {chainConfigs &&
        chainConfigs.chains &&
        Object.values(chainConfigs.chains || {})
          .filter((chain) => chain.chainType === "evm")
          .sort((a, b) => a.displayName.localeCompare(b.displayName))
          .map((chain, index) => {
            const { id, externalChainId, displayName, iconUrl } = {
              ...chain,
            };

            const provider_params = {
              chanId: toHex(chain.externalChainId),
              chainName: chain.displayName,
              rpcUrls: chain.config.rpc,
              nativeCurrency: chain.nativeCurrency,
              blockExplorerUrls:
                chain.blockExplorers?.map((explorer) => explorer.url) || [],
            };

            const explorer_url = provider_params?.[0]?.blockExplorerUrls?.[0];
            const gateway_contract_address =
              chain.config.contracts?.AxelarGateway?.address;
            const gas_service_address =
              chain.config.contracts?.AxelarGasService?.address;

            return (
              <div
                key={index}
                className="bg-background-neutral-dark rounded-xl p-5"
              >
                <div className="flex items-center justify-between pb-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    {iconUrl && (
                      <img
                        src={iconUrl}
                        alt=""
                        width={34}
                        height={34}
                        className="rounded-full size-8"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-base font-semibold font-clash">
                        {displayName}
                      </span>
                      <span className="text-foreground text-sm font-medium">
                        Chain ID: {externalChainId}
                      </span>
                    </div>
                  </div>
                  <AddChain environment={environment} chain={id} />
                </div>
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col pt-5  flex-wrap justify-between">
                    <span className="whitespace-nowrap text-sm text-foreground">
                      Chain Name:
                    </span>
                    <div className="flex items-center text-sm space-x-1">
                      <Copy size={18} title={id} value={id} />
                    </div>
                  </div>
                  <div className="flex flex-col flex-wrap justify-between">
                    <span className="whitespace-nowrap text-sm text-foreground">
                      Gateway Contract:
                    </span>
                    <div className="flex items-center text-sm space-x-1">
                      {gateway_contract_address ? (
                        <a
                          href={`${explorer_url}/address/${gateway_contract_address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline text-primary font-clash font-semibold"
                        >
                          {ellipse(gateway_contract_address, 14)}
                        </a>
                      ) : (
                        <span className="text-foreground font-semibold">-</span>
                      )}
                      {gateway_contract_address && (
                        <Copy
                          size={18}
                          hide={true}
                          value={gateway_contract_address}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col flex-wrap justify-between">
                    <span className="whitespace-nowrap text-sm text-foreground">
                      Gas Service Contract:
                    </span>
                    <div className="flex items-center text-sm space-x-1">
                      {gas_service_address ? (
                        <a
                          href={`${explorer_url}/address/${gas_service_address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline text-primary font-clash font-semibold"
                        >
                          {ellipse(gas_service_address, 14)}
                        </a>
                      ) : (
                        <span className="text-gray-500 dark:text-white font-semibold">
                          -
                        </span>
                      )}
                      {gas_service_address && (
                        <Copy
                          size={18}
                          hide={true}
                          value={gas_service_address}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};
