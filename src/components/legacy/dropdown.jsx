'use client';
import { useEffect, useState } from 'react';

import { equals_ignore_case } from './utils';

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

    return contracts.map((c) => {
      const merged = { ...asset, ...c };
      return { ...merged, name: merged.symbol };
    });
  });
}

/** Resolve options when the parent passes data directly (live API path). */
function resolveExternalOptions(externalData, dataName, chain) {
  if (dataName === 'evm_assets') {
    return flattenAssetContracts(externalData, chain);
  }
  return Array.isArray(externalData)
    ? externalData.filter((c) => !c?.is_staging)
    : externalData;
}

export default ({
  chain,
  dataName,
  externalData,
  placeholder,
  hasAllOptions,
  allOptionsName = 'All',
  defaultSelectedKey,
  onSelect,
  className = '',
}) => {
  const [options, setOptions] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    const options = resolveExternalOptions(externalData, dataName, chain);

    setOptions(options || []);
  }, [chain, dataName, externalData]);

  useEffect(() => {
    setSelectedKey(defaultSelectedKey);
  }, [defaultSelectedKey]);

  return (
    <select
      className={`dropdown rounded-lg border bg-fd-background px-3 py-2 text-sm font-medium ${className}`}
      value={selectedKey ?? (hasAllOptions ? '' : undefined)}
      onChange={(e) => {
        const key = e.target.value;
        setSelectedKey(key);
        if (onSelect) {
          onSelect(
            key === '' ? '' : options?.find((o) => String(o?.id) === key),
          );
        }
      }}
    >
      {!hasAllOptions && selectedKey == null && (
        <option value="" disabled>
          {placeholder || 'Select Options'}
        </option>
      )}
      {hasAllOptions && <option value="">{allOptionsName}</option>}
      {options?.map((o, i) => (
        <option key={i} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  );
};
