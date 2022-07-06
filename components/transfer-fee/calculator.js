import Image from "next/image";
import { useState } from "react";

import Dropdown from "../dropdown";
import Copy from "../copy";
import evm_chains from "../../data/evm_chains.json";
import cosmos_chains from "../../data/cosmos_chains.json";
import evm_assets from "../../data/evm_assets.json";
import ibc_assets from "../../data/ibc_assets.json";

export default ({ environment = "mainnet" }) => {
  const _evm_chains = evm_chains?.[environment] || [];
  const _cosmos_chains = cosmos_chains?.[environment] || [];
  const _evm_assets = evm_assets?.[environment] || [];
  const _ibc_assets = ibc_assets?.[environment] || [];

  const [assetData, setAssetData] = useState(_evm_assets.find(a => a?.id === (environment === "testnet" ? "uausdc" : "uusdc")));
  const [sourceChainData, setSourceChainData] = useState(_evm_assets.find(c => c?.id === "avalanche"));
  const [destinationChainData, setDestinationChainData] = useState(_evm_assets.find(c => c?.id === "osmosis"));

  const getTransferFee = chain => {
    let transfer_fee;

    if (chain && assetData?.id) {
      const evm_chain_data = _evm_chains.find(c => c?.id === chain);
      const cosmos_chain_data = _cosmos_chains.find(c => c?.id === chain);

      if (evm_chain_data) {
        const asset_data = _evm_assets.find(a => a?.id === assetData.id);
        transfer_fee = asset_data?.contracts?.find(c => c?.chain === chain)?.transfer_fee ||
          (asset_data?.contracts?.findIndex(c => c?.chain === chain) > -1 ? asset_data?.transfer_fee : null);
      }
      else if (cosmos_chain_data) {
        const asset_data = _ibc_assets.find(a => a?.id === assetData.id);
        transfer_fee = asset_data?.transfer_fee;
      }
    }

    return transfer_fee || 0;
  };

  const sourceTransferFee = getTransferFee(sourceChainData?.id);
  const destinationTransferFee = getTransferFee(destinationChainData?.id);
  const totalFee = parseFloat((sourceTransferFee + destinationTransferFee).toFixed(6));

  return (
    <div className="max-w-lg border dark:border-gray-500 rounded-2xl shadow dark:shadow-gray-500 flex flex-col p-6">
      <div className="grid grid-cols-3 items-center gap-6">
        <span className="text-base font-bold">
          Asset
        </span>
        <Dropdown
          environment={environment}
          dataName="assets"
          placeholder="Select Asset"
          defaultSelectedKey={assetData?.id || ""}
          onSelect={a => setAssetData(a)}
          className="min-w-max"
        />
        <span className="whitespace-nowrap text-base font-semibold text-right">
          Fee
        </span>
      </div>
      <div className="grid grid-cols-3 items-center gap-6 mt-4">
        <span className="text-base font-bold">
          Source chain
        </span>
        <Dropdown
          environment={environment}
          dataName="chains"
          placeholder="Select Chain"
          defaultSelectedKey={sourceChainData?.id || ""}
          onSelect={c => setSourceChainData(c)}
          className="min-w-max"
        />
        <span className="whitespace-nowrap text-base font-semibold text-right">
          {sourceTransferFee || 'N/A'} {assetData?.symbol}
        </span>
      </div>
      <div className="flex items-center justify-end">
        <span className="text-xl font-bold">
          +
        </span>
      </div>
      <div className="grid grid-cols-3 items-center gap-6 mt-1">
        <span className="text-base font-bold">
          Destination chain
        </span>
        <Dropdown
          environment={environment}
          dataName="chains"
          placeholder="Select Chain"
          defaultSelectedKey={destinationChainData?.id || ""}
          onSelect={c => setDestinationChainData(c)}
          className="min-w-max"
        />
        <span className="whitespace-nowrap text-base font-semibold text-right">
          {destinationTransferFee || 'N/A'} {assetData?.symbol}
        </span>
      </div>
      <div className="border-t-2 dark:border-gray-500 mt-4" />
      <div className="flex items-center justify-between mt-3">
        <span className="text-lg font-bold">
          Total
        </span>
        <span className="text-xl font-bold">
          {totalFee} {assetData?.symbol}
        </span>
      </div>
      <div className="h-3 border-y-2 dark:border-gray-500 mt-1" />
    </div>
  );
};