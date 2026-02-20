import { useChainData } from "../../hooks/useAxelarscanData";
import { ellipse } from "../../utils";
import Copy from "../copy";
import { ChainCardSkeleton, ErrorMessage } from "../loading-skeleton";
import AddChain from "../web3";

export default ({ environment = "mainnet" }) => {
  const { chains, gateways, gasServices, loading, error } =
    useChainData(environment);

  if (loading) return <ChainCardSkeleton count={8} />;
  if (error) return <ErrorMessage message="Failed to load chain data." />;

  return (
    <div className="grid lg:grid-cols-2 gap-5 not-prose">
      {chains
        .filter((c) => !c?.is_staging)
        .map((c, i) => {
          const { id, chain_id, network_id, name, provider_params, image } = {
            ...c,
          };

          const explorer_url =
            c.explorer?.url ||
            provider_params?.[0]?.blockExplorerUrls?.[0];
          const gateway_data = gateways.find((_c) => _c?.id === id);
          const gateway_contract_address = gateway_data?.address;
          const gas_service_data = gasServices.find((_c) => _c?.id === id);
          const gas_service_address = gas_service_data?.address;

          const addressPath = c.explorer?.address_path || "/address/{address}";

          const explorerLink = (addr) => {
            if (!explorer_url || !addr) return null;
            return `${explorer_url}${addressPath.replace("{address}", addr)}`;
          };

          return (
            <div key={i} className="bg-background-neutral-dark rounded-xl p-5">
              <div className="flex items-center justify-between pb-5 border-b border-border">
                <div className="flex items-center gap-3">
                  {image && (
                    <img
                      src={image}
                      alt=""
                      width={34}
                      height={34}
                      className="rounded-full size-8"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-base font-semibold font-clash">
                      {name}
                    </span>
                    <span className="text-foreground text-sm font-medium">
                      Chain ID: {chain_id}
                    </span>
                  </div>
                </div>
                <AddChain
                  environment={environment}
                  chain={id}
                  chainData={c}
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-col pt-5  flex-wrap justify-between">
                  <span className="whitespace-nowrap text-sm text-foreground">
                    Chain Name:
                  </span>
                  <div className="flex items-center text-sm space-x-1">
                    <Copy size={18} title={network_id} value={network_id} />
                  </div>
                </div>
                <div className="flex flex-col flex-wrap justify-between">
                  <span className="whitespace-nowrap text-sm text-foreground">
                    Gateway Contract:
                  </span>
                  <div className="flex items-center text-sm space-x-1">
                    {gateway_contract_address ? (
                      <a
                        href={explorerLink(gateway_contract_address)}
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
                        href={explorerLink(gas_service_address)}
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
                      <Copy size={18} hide={true} value={gas_service_address} />
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
