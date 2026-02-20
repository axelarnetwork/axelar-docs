import { Menu, Transition } from "@headlessui/react";
import _ from "lodash";
import { Fragment, useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";
import cosmos_chains from "../data/cosmos_chains.json";
import evm_assets from "../data/evm_assets.json";
import evm_chains from "../data/evm_chains.json";
import gateways from "../data/gateways.json";
import ibc_assets from "../data/ibc_assets.json";
import { equals_ignore_case } from "../utils";

const staticData = {
  evm_chains,
  cosmos_chains,
  evm_assets,
  ibc_assets,
  gateways,
};

/**
 * Flatten asset objects so each contract becomes its own option row.
 * When a specific chain is selected, only that chain's contract is kept.
 * Otherwise, take just the first contract per asset to avoid duplicates.
 */
function flattenAssetContracts(assets, chain) {
  return assets?.flatMap((asset) => {
    const contracts = (asset?.contracts || [])
      .filter((c) => !chain || equals_ignore_case(c?.chain, chain))
      .filter((c, i) => chain || i < 1);

    return contracts.map((c) => ({ ...asset, ...c, name: asset?.symbol }));
  });
}

/** Resolve options when the parent passes data directly (live API path). */
function resolveExternalOptions(externalData, dataName, chain) {
  if (dataName === "evm_assets") {
    return flattenAssetContracts(externalData, chain);
  }
  return Array.isArray(externalData)
    ? externalData.filter((c) => !c?.is_staging)
    : externalData;
}

/** Resolve options from bundled static JSON (fallback for fee calculator, etc.). */
function resolveStaticOptions(dataName, environment, chain) {
  switch (dataName) {
    case "evm_chains":
      return staticData.evm_chains?.[environment]?.filter((c) => !c?.is_staging);
    case "evm_assets":
      return flattenAssetContracts(staticData.evm_assets?.[environment], chain);
    case "chains":
      return _.concat(
        staticData.evm_chains?.[environment]?.filter((c) => !c?.is_staging) || [],
        staticData.cosmos_chains?.[environment] || [],
      );
    case "assets":
      return _.uniqBy(
        _.concat(
          staticData.evm_assets?.[environment] || [],
          staticData.ibc_assets?.[environment] || [],
        ),
        "id",
      );
    default:
      return staticData[dataName];
  }
}

export default ({
  environment,
  chain,
  dataName,
  externalData,
  placeholder,
  hasAllOptions,
  allOptionsName = "All",
  defaultSelectedKey,
  onSelect,
  align = "left",
  className = "",
}) => {
  const [options, setOptions] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    const options = externalData !== undefined
      ? resolveExternalOptions(externalData, dataName, chain)
      : resolveStaticOptions(dataName, environment, chain);

    setOptions(options || []);
  }, [environment, chain, dataName, externalData]);

  useEffect(() => {
    setSelectedKey(defaultSelectedKey);
  }, [defaultSelectedKey]);

  const selectedData =
    options?.find((o) => o?.id === selectedKey) || selectedKey;

  return (
    <Menu as="div" className={`dropdown   relative  text-left ${className}`}>
      {({ open }) => (
        <>
          <Menu.Button className="flex justify-between gap-2 w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white dark:bg-black border border-gray-300  rounded-full relative shadow-sm hover:bg-gray-50 items-center dark:hover:bg-gray-900 dark:border-gray-700 focus:outline-none dark:text-gray-100">
            <div class="absolute left-0 top-0 size-[3px] rounded-full bg-black dark:bg-white"></div>
            <div class="absolute left-0 bottom-0 size-[3px] rounded-full bg-black dark:bg-white"></div>
            <div class="absolute right-0 top-0 size-[3px] rounded-full bg-black dark:bg-white"></div>
            <div class="absolute right-0 bottom-0 size-[3px] rounded-full bg-black dark:bg-white" />
            {selectedData ? (
              <div className="flex items-center space-x-2">
                {selectedData.image && (
                  <img
                    src={selectedData.image}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="font-bold line-clamp-1">
                  {selectedData.name}
                </span>
              </div>
            ) : selectedData === "" ? (
              <span className="font-bold">{allOptionsName}</span>
            ) : (
              placeholder || "Select Options"
            )}

            <ChevronDown />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              style={{ maxHeight: "50vh" }}
              className={`dropdown-menu bg-background-neutral-dark sidebar-scroll border-border w-48 overflow-y-auto min-w-max dark:bg-dark absolute z-10 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-${align} ${align}-0 mt-2`}
            >
              {hasAllOptions && (
                <Menu.Item key={-1}>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        setSelectedKey("");
                        if (onSelect) {
                          onSelect("");
                        }
                      }}
                      className={`${
                        active
                          ? "bg-gray-100 dark:bg-gray-900 text-dark dark:text-white"
                          : "text-gray-800 dark:text-gray-200"
                      } ${
                        selectedKey === ""
                          ? "font-bold"
                          : active
                            ? "font-semibold"
                            : "font-medium"
                      } cursor-pointer flex items-center text-sm space-x-2 py-2 px-4`}
                    >
                      <span>{allOptionsName}</span>
                    </div>
                  )}
                </Menu.Item>
              )}
              {options?.map((o, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        setSelectedKey(o.id);
                        if (onSelect) {
                          onSelect(options?.find((_o) => _o?.id === o.id));
                        }
                      }}
                      className={`dropdown-menu-item ${
                        active
                          ? "bg-gray-100 dark:bg-gray-900 text-dark dark:text-white"
                          : "text-gray-800 dark:text-gray-200"
                      } ${
                        selectedKey === o.id
                          ? "font-bold"
                          : active
                            ? "font-semibold"
                            : "font-medium"
                      } cursor-pointer flex items-center text-sm space-x-2 py-2 px-4`}
                    >
                      {o.image && (
                        <img
                          src={o.image}
                          alt=""
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span>{o.name}</span>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
