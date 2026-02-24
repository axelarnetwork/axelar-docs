import gateways_static from "../../data/gateways.json";
import gas_services_static from "../../data/gas_services.json";
import { useChainData } from "../../hooks/useAxelarscanData";
import { ellipse } from "../../utils";
import Copy from "../copy";
import { ChainCardSkeleton, ErrorMessage } from "../loading-skeleton";
import AddChain from "../web3";

const CHAIN_TYPE_STYLES = {
  evm: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  amplifier: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  cosmos: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

const CHAIN_TYPE_DISPLAY = {
  evm: "EVM",
  amplifier: "Amplifier",
  cosmos: "Cosmos",
};

// Non-EVM chains where MetaMask doesn't work.
const HIDE_METAMASK_CHAINS = ["hedera", "stellar", "sui", "xrpl"];

// Non-EVM native chains where the EVM ITS contract address doesn't apply.
const NON_EVM_ITS_CHAINS = ["stellar", "sui", "xrpl"];

function AddressRow({ label, address, explorerLink, suiObjectPath }) {
  const link = explorerLink?.(address, suiObjectPath);
  return (
    <div className="flex flex-col flex-wrap justify-between">
      <span className="whitespace-nowrap text-sm text-foreground">{label}:</span>
      <div className="flex items-center text-sm space-x-1">
        {address ? (
          link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-primary font-clash font-semibold"
            >
              {ellipse(address, 14)}
            </a>
          ) : (
            <span className="font-clash font-semibold">
              {ellipse(address, 14)}
            </span>
          )
        ) : (
          <span className="text-foreground font-semibold">-</span>
        )}
        {address && <Copy size={18} hide={true} value={address} />}
      </div>
    </div>
  );
}

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
          const { id, chain_id, network_id, name, chain_type, provider_params, image } = {
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

          const suiObjectPath = id === "sui" ? "/object/{address}" : null;
          const showMetaMask = chain_type !== "cosmos" && !HIDE_METAMASK_CHAINS.includes(id);
          const isCosmos = chain_type === "cosmos";
          const prefix = c.prefix_address;
          const lcdEndpoint = c.endpoints?.lcd?.[0];

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
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold font-clash">
                        {name}
                      </span>
                      {chain_type && (
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded uppercase ${
                          CHAIN_TYPE_STYLES[chain_type] || ""
                        }`}>
                          {CHAIN_TYPE_DISPLAY[chain_type] || chain_type}
                        </span>
                      )}
                    </div>
                    <span className="text-foreground text-sm font-medium">
                      Chain ID: {chain_id}
                    </span>
                  </div>
                </div>
                {showMetaMask && (
                  <AddChain
                    environment={environment}
                    chain={id}
                    chainData={c}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-col pt-5 flex-wrap justify-between">
                  <span className="whitespace-nowrap text-sm text-foreground">
                    Chain Name:
                  </span>
                  <div className="flex items-center text-sm space-x-1">
                    <Copy size={18} title={network_id} value={network_id} />
                  </div>
                </div>
                {!isCosmos && (
                  <>
                    <AddressRow
                      label="Gateway Contract"
                      address={gateway_contract_address}
                      explorerLink={explorerLink}
                      suiObjectPath={suiObjectPath}
                    />
                    {id === "sui" && gateway_object_id && (
                      <AddressRow
                        label="Gateway Object ID"
                        address={gateway_object_id}
                        explorerLink={explorerLink}
                        suiObjectPath={suiObjectPath}
                      />
                    )}
                    <AddressRow
                      label="Gas Service Contract"
                      address={gas_service_address}
                      explorerLink={explorerLink}
                      suiObjectPath={suiObjectPath}
                    />
                    {id === "sui" && gas_service_object_id && (
                      <AddressRow
                        label="Gas Service Object ID"
                        address={gas_service_object_id}
                        explorerLink={explorerLink}
                        suiObjectPath={suiObjectPath}
                      />
                    )}
                    {itsAddress && !NON_EVM_ITS_CHAINS.includes(id) && (
                      <AddressRow
                        label="ITS Contract"
                        address={itsAddress}
                        explorerLink={explorerLink}
                      />
                    )}
                  </>
                )}
                {isCosmos && (
                  <>
                    {prefix && (
                      <div className="flex flex-col flex-wrap justify-between">
                        <span className="whitespace-nowrap text-sm text-foreground">
                          Address Prefix:
                        </span>
                        <div className="flex items-center text-sm space-x-1">
                          <Copy size={18} title={prefix} value={prefix} />
                        </div>
                      </div>
                    )}
                    {lcdEndpoint && (
                      <div className="flex flex-col flex-wrap justify-between">
                        <span className="whitespace-nowrap text-sm text-foreground">
                          LCD Endpoint:
                        </span>
                        <div className="flex items-center text-sm space-x-1">
                          <a
                            href={lcdEndpoint}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline text-primary font-clash font-semibold"
                          >
                            {ellipse(lcdEndpoint, 20)}
                          </a>
                          <Copy size={18} hide={true} value={lcdEndpoint} />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
