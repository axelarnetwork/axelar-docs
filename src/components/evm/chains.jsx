import gateways_static from "../../data/gateways.json";
import gas_services_static from "../../data/gas_services.json";
import { useChainData } from "../../hooks/useAxelarscanData";
import { ellipse } from "../../utils";
import Copy from "../copy";
import { ChainCardSkeleton, ErrorMessage } from "../loading-skeleton";
import AddChain from "../web3";

// Chains where the MetaMask "Add Chain" button should be hidden
// because MetaMask doesn't support them.
const HIDE_METAMASK_CHAINS = ["hedera", "stellar", "sui", "xrpl", "xrpl-evm"];

export default ({ environment = "mainnet" }) => {
  const { chains, gateways, gasServices, itsAddress, loading, error } =
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
          const gateway_static = (gateways_static?.[environment] || []).find((_c) => _c?.id === id);
          const gateway_object_id = gateway_static?.objectId;
          const gas_service_data = gasServices.find((_c) => _c?.id === id);
          const gas_service_address = gas_service_data?.address;
          const gas_service_static = (gas_services_static?.[environment] || []).find((_c) => _c?.id === id);
          const gas_service_object_id = gas_service_static?.objectId;

          const addressPath = c.explorer?.address_path || "/address/{address}";

          const explorerLink = (addr, pathOverride) => {
            if (!explorer_url || !addr) return null;
            const path = pathOverride || addressPath;
            return `${explorer_url}${path.replace("{address}", addr)}`;
          };

          // Sui contracts are objects, not accounts — use /object/ path
          const suiObjectPath = id === "sui" ? "/object/{address}" : null;

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
                {!HIDE_METAMASK_CHAINS.includes(id) && (
                  <AddChain
                    environment={environment}
                    chain={id}
                    chainData={c}
                  />
                )}
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
                      explorerLink(gateway_contract_address, suiObjectPath) ? (
                        <a
                          href={explorerLink(gateway_contract_address, suiObjectPath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline text-primary font-clash font-semibold"
                        >
                          {ellipse(gateway_contract_address, 14)}
                        </a>
                      ) : (
                        <span className="font-clash font-semibold">
                          {ellipse(gateway_contract_address, 14)}
                        </span>
                      )
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
                {id === "sui" && gateway_object_id && (
                  <div className="flex flex-col flex-wrap justify-between">
                    <span className="whitespace-nowrap text-sm text-foreground">
                      Gateway Object ID:
                    </span>
                    <div className="flex items-center text-sm space-x-1">
                      {explorerLink(gateway_object_id, suiObjectPath) ? (
                        <a
                          href={explorerLink(gateway_object_id, suiObjectPath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline text-primary font-clash font-semibold"
                        >
                          {ellipse(gateway_object_id, 14)}
                        </a>
                      ) : (
                        <span className="font-clash font-semibold">
                          {ellipse(gateway_object_id, 14)}
                        </span>
                      )}
                      <Copy
                        size={18}
                        hide={true}
                        value={gateway_object_id}
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col flex-wrap justify-between">
                  <span className="whitespace-nowrap text-sm text-foreground">
                    Gas Service Contract:
                  </span>
                  <div className="flex items-center text-sm space-x-1">
                    {gas_service_address ? (
                      explorerLink(gas_service_address, suiObjectPath) ? (
                        <a
                          href={explorerLink(gas_service_address, suiObjectPath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline text-primary font-clash font-semibold"
                        >
                          {ellipse(gas_service_address, 14)}
                        </a>
                      ) : (
                        <span className="font-clash font-semibold">
                          {ellipse(gas_service_address, 14)}
                        </span>
                      )
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
                {id === "sui" && gas_service_object_id && (
                  <div className="flex flex-col flex-wrap justify-between">
                    <span className="whitespace-nowrap text-sm text-foreground">
                      Gas Service Object ID:
                    </span>
                    <div className="flex items-center text-sm space-x-1">
                      {explorerLink(gas_service_object_id, suiObjectPath) ? (
                        <a
                          href={explorerLink(gas_service_object_id, suiObjectPath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline text-primary font-clash font-semibold"
                        >
                          {ellipse(gas_service_object_id, 14)}
                        </a>
                      ) : (
                        <span className="font-clash font-semibold">
                          {ellipse(gas_service_object_id, 14)}
                        </span>
                      )}
                      <Copy
                        size={18}
                        hide={true}
                        value={gas_service_object_id}
                      />
                    </div>
                  </div>
                )}
                {itsAddress && (
                  <div className="flex flex-col flex-wrap justify-between">
                    <span className="whitespace-nowrap text-sm text-foreground">
                      ITS Contract:
                    </span>
                    <div className="flex items-center text-sm space-x-1">
                      {explorerLink(itsAddress, suiObjectPath) ? (
                        <a
                          href={explorerLink(itsAddress, suiObjectPath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline text-primary font-clash font-semibold"
                        >
                          {ellipse(itsAddress, 14)}
                        </a>
                      ) : (
                        <span className="font-clash font-semibold">
                          {ellipse(itsAddress, 14)}
                        </span>
                      )}
                      <Copy size={18} hide={true} value={itsAddress} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
