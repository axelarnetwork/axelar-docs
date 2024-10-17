import { useState } from "react";

import cosmos_chains from "../../data/cosmos_chains.json";
import evm_assets from "../../data/evm_assets.json";
import evm_chains from "../../data/evm_chains.json";
import ibc_assets from "../../data/ibc_assets.json";
import Dropdown from "../dropdown";

export default ({ environment = "mainnet" }) => {
  const _evm_chains = evm_chains?.[environment] || [];
  const _cosmos_chains = cosmos_chains?.[environment] || [];
  const _evm_assets = evm_assets?.[environment] || [];
  const _ibc_assets = ibc_assets?.[environment] || [];

  const [assetData, setAssetData] = useState(
    _evm_assets.find(
      (a) => a?.id === (environment === "testnet" ? "uausdc" : "uusdc"),
    ),
  );
  const [sourceChainData, setSourceChainData] = useState(
    _evm_assets.find((c) => c?.id === "avalanche"),
  );
  const [destinationChainData, setDestinationChainData] = useState(
    _evm_assets.find((c) => c?.id === "osmosis"),
  );

  const getTransferFee = (chain) => {
    let transfer_fee;

    if (chain && assetData?.id) {
      const evm_chain_data = _evm_chains.find((c) => c?.id === chain);
      const cosmos_chain_data = _cosmos_chains.find((c) => c?.id === chain);

      if (evm_chain_data) {
        const asset_data = _evm_assets.find((a) => a?.id === assetData.id);
        transfer_fee =
          asset_data?.contracts?.find((c) => c?.chain === chain)
            ?.transfer_fee ||
          (asset_data?.contracts?.findIndex((c) => c?.chain === chain) > -1
            ? asset_data?.transfer_fee
            : null);
      } else if (cosmos_chain_data) {
        const asset_data = _ibc_assets.find((a) => a?.id === assetData.id);
        transfer_fee = asset_data?.transfer_fee;
      }
    }

    return transfer_fee || 0;
  };

  const sourceTransferFee = getTransferFee(sourceChainData?.id);
  const destinationTransferFee = getTransferFee(destinationChainData?.id);
  const totalFee = parseFloat(
    (sourceTransferFee + destinationTransferFee).toFixed(6),
  );

  return (
    <div className=" border border-border bg-background-neutral-dark not-prose rounded-xl flex flex-col p-6">
      <div className="flex flex-col md:flex-row gap-6 ">
        <div className="flex flex-col md:w-[30%]  gap-2">
          <span className="text-base font-bold">Asset</span>
          <Dropdown
            environment={environment}
            dataName="assets"
            placeholder="Select Asset"
            defaultSelectedKey={assetData?.id || ""}
            onSelect={(a) => setAssetData(a)}
          />
          <span className="whitespace-nowrap text-sm font-semibold text-text-dark-gray ">
            Fee
          </span>
        </div>
        <div className="flex flex-col md:w-[30%]  gap-2">
          <span className="text-base font-bold">Source chain</span>
          <Dropdown
            environment={environment}
            dataName="chains"
            placeholder="Select Chain"
            defaultSelectedKey={sourceChainData?.id || ""}
            onSelect={(c) => setSourceChainData(c)}
          />
          <span className="whitespace-nowrap text-sm font-semibold text-text-dark-gray ">
            {sourceTransferFee || "N/A"} {assetData?.symbol}
          </span>
        </div>

        <div className="flex items-center justify-center">
          <span className="text-xl font-bold">+</span>
        </div>
        <div className="flex flex-col md:w-[30%]  gap-2">
          <span className="text-base font-bold">Destination chain</span>
          <Dropdown
            environment={environment}
            dataName="chains"
            placeholder="Select Chain"
            defaultSelectedKey={destinationChainData?.id || ""}
            onSelect={(c) => setDestinationChainData(c)}
          />
          <span className="whitespace-nowrap text-sm font-semibold text-text-dark-gray ">
            {destinationTransferFee || "N/A"} {assetData?.symbol}
          </span>
        </div>
      </div>

      <div className="flex items-center text-white relative justify-between bg-primary hover:rounded-xl transition-all rounded-[60px] py-2 mt-10 px-4">
        <div class="absolute left-0 top-0 size-[3px] rounded-full bg-black dark:bg-white"></div>
        <div class="absolute left-0 bottom-0 size-[3px] rounded-full bg-black dark:bg-white"></div>
        <div class="absolute right-0 top-0 size-[3px] rounded-full bg-black dark:bg-white"></div>
        <div class="absolute right-0 bottom-0 size-[3px] rounded-full bg-black dark:bg-white" />
        <span className=" font-bold">Total</span>
        <span className="text-lg font-bold">
          {totalFee} {assetData?.symbol}
        </span>
      </div>
    </div>
  );
};
