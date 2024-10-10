import { useState } from "react";

import evm_assets from "../../data/evm_assets.json";
import evm_chains from "../../data/evm_chains.json";
import { ellipse, equals_ignore_case } from "../../utils";
import Copy from "../copy";
import Dropdown from "../dropdown";
import AddToken from "../web3";

const COLUMNS = [
  { id: "asset", title: "Symbol" },
  { id: "chain", title: "Chain" },
  { id: "denom", title: "Denom" },
  { id: "contract_address", title: "Contract address" },
  {
    id: "add_token",
    title: "",
    headerClassName: "text-right",
    className: "text-right",
  },
];

export default ({ environment = "mainnet" }) => {
  const _evm_chains = evm_chains?.[environment] || [];
  const _evm_assets = evm_assets?.[environment] || [];

  const [chainData, setChainData] = useState(null);
  const [assetData, setAssetData] = useState(
    _evm_assets.find(
      (a) => a?.id === (environment === "testnet" ? "uausdc" : "uusdc"),
    ),
  );

  const assets = _evm_assets
    .filter((a) => !assetData || a?.id === assetData.id)
    .flatMap(
      (a) =>
        a?.contracts
          ?.map((c) => {
            return {
              ...a,
              ...c,
            };
          })
          .filter(
            (a) => !chainData || equals_ignore_case(a.chain, chainData.id),
          ) || [],
    );

  return (
    <div className="flex flex-col gap-10 mt-4 not-prose">
      <div className="flex   items-center  gap-3">
        <Dropdown
          environment={environment}
          dataName="evm_chains"
          placeholder="Select Chain"
          hasAllOptions={true}
          allOptionsName="All Chains"
          defaultSelectedKey={chainData?.id || ""}
          onSelect={(c) => {
            setChainData(c);
            if (
              c &&
              _evm_assets.findIndex(
                (a) =>
                  (!assetData || a?.id === assetData.id) &&
                  a?.contracts?.findIndex((_c) => _c?.chain === c?.id) > -1,
              ) < 0
            ) {
              setAssetData("");
            }
          }}
        />
        <Dropdown
          environment={environment}
          chain={chainData?.id}
          dataName="evm_assets"
          placeholder="Select Asset"
          hasAllOptions={true}
          allOptionsName="All Assets"
          defaultSelectedKey={assetData?.id || ""}
          onSelect={(a) => setAssetData(a)}
        />
      </div>
      <div className="asset-table">
        <table className="max-w-fit  block shadow rounded-lg overflow-x-auto sidebar-scroll">
          <thead className="bg-background-neutral-dark uppercase text-xs">
            <tr className="border-none">
              {COLUMNS.map((c, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`${
                    c.id === "chain" ? "sticky-col" : ""
                  } border-none whitespace-nowrap font-medium py-4 text-primary px-4 ${
                    c.headerClassName || ""
                  }`}
                >
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assets.map((a, i) => {
              const { id, address, symbol, image, chain } = { ...a };
              const chain_data = _evm_chains.find((c) => c?.id === chain);
              const explorer_url =
                chain_data?.provider_params?.[0]?.blockExplorerUrls?.[0];
              return (
                <tr key={i} className=" border-t border-t-border">
                  {COLUMNS.map((c, j) => (
                    <td
                      key={j}
                      scope="col"
                      className={`${c.id === "chain" ? "sticky-col" : ""} ${
                        i === assets.length - 1
                          ? j === 0
                            ? "rounded-bl-lg"
                            : j === COLUMNS.length - 1
                              ? "rounded-br-lg"
                              : ""
                          : ""
                      } border-none bg-background-neutral whitespace-nowrap py-3 px-4 ${
                        c.className || ""
                      }`}
                    >
                      {c.id === "asset" ? (
                        <div className="asset-icon min-w-max flex items-center space-x-2">
                          {image && (
                            <img
                              src={image}
                              alt=""
                              width={28}
                              height={28}
                              className="rounded-full"
                            />
                          )}
                          <span className="whitespace-nowrap text-base font-semibold">
                            {symbol}
                          </span>
                        </div>
                      ) : c.id === "chain" ? (
                        <div className="chain-icon min-w-max flex items-center space-x-2.5">
                          {chain_data?.image && (
                            <img
                              src={chain_data.image}
                              alt=""
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="whitespace-nowrap text-sm font-semibold">
                              {chain_data?.name || chain}
                            </span>
                            <span className="whitespace-nowrap text-gray-400 dark:text-gray-500 text-xs font-medium">
                              ID: {chain_data?.network_id}
                            </span>
                          </div>
                        </div>
                      ) : c.id === "denom" ? (
                        <div
                          className={`flex items-center text-base space-x-1.5 ${
                            id.length > 15 ? "wrap-text" : ""
                          }`}
                        >
                          <span className="whitespace-nowrap text-base font-semibold">
                            {id}
                          </span>
                        </div>
                      ) : c.id === "contract_address" ? (
                        <div className="flex items-center text-base space-x-1.5">
                          {address ? (
                            <a
                              href={`${explorer_url}/address/${address}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="no-underline text-primary hover:underline font-medium"
                            >
                              {ellipse(address, 16)}
                            </a>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600">
                              -
                            </span>
                          )}
                          {address && (
                            <Copy value={address} hide={true} size={20} />
                          )}
                        </div>
                      ) : c.id === "add_token" ? (
                        <AddToken environment={environment} {...a} />
                      ) : null}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
