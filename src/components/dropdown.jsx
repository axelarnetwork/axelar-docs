import { Fragment, useState, useEffect } from "react";
import _ from "lodash";
import { Menu, Transition } from "@headlessui/react";

import { equals_ignore_case } from "../utils";
import evm_chains from "../data/evm_chains.json";
import cosmos_chains from "../data/cosmos_chains.json";
import evm_assets from "../data/evm_assets.json";
import ibc_assets from "../data/ibc_assets.json";
import gateways from "../data/gateways.json";

const data = {
  evm_chains,
  cosmos_chains,
  evm_assets,
  ibc_assets,
  gateways,
};

export default ({
  environment,
  chain,
  dataName,
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
    let _options;
    switch (dataName) {
      case "evm_chains":
        _options = data[dataName]?.[environment].filter((c) => !c?.is_staging);
        break;
      case "evm_assets":
        _options = data[dataName]?.[environment]
          ?.flatMap((o) => {
            const contracts =
              o?.contracts
                ?.filter((c) => !chain || equals_ignore_case(c?.chain, chain))
                .filter((c, i) => chain || i < 1) || [];
            return contracts.map((c) => {
              return {
                ...o,
                ...c,
              };
            });
          })
          .map((o) => {
            return {
              ...o,
              name: o?.symbol,
            };
          });
        break;
      case "chains":
        _options = _.concat(
          data.evm_chains?.[environment].filter((c) => !c?.is_staging) || [],
          data.cosmos_chains?.[environment] || []
        );
        break;
      case "assets":
        _options = _.uniqBy(
          _.concat(
            data.evm_assets?.[environment] || [],
            data.ibc_assets?.[environment] || []
          ),
          "id"
        );
        break;
      default:
        _options = data[dataName];
        break;
    }
    setOptions(_options || []);
  }, [environment, chain, dataName]);

  useEffect(() => {
    setSelectedKey(defaultSelectedKey);
  }, [defaultSelectedKey]);

  const selectedData =
    options?.find((o) => o?.id === selectedKey) || selectedKey;

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white dark:bg-black border border-gray-300  rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-900 dark:border-gray-700 focus:outline-none dark:text-gray-100">
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
                  <span className="font-bold">{selectedData.name}</span>
                </div>
              ) : selectedData === "" ? (
                <span className="font-bold">{allOptionsName}</span>
              ) : (
                placeholder || "Select Options"
              )}
              {open ? (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
              ) : (
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg>
              )}
            </Menu.Button>
          </div>
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
              className={`bg-white dark:bg-black dark:border dark:border-grey-300 w-48 overflow-y-auto min-w-max dark:bg-dark absolute z-10 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-${align} ${align}-0 mt-2`}
            >
              <div className="py-1">
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
                        className={`${
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
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
