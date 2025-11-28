"use client";

import { MenuItem } from "@headlessui/react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { FilterChip } from "./FilterChip";
import type { FilterState } from "@/app/lib/utils/filtering";

type Props = {
  value: FilterState["priceSort"];
  onChange: (value: FilterState["priceSort"]) => void;
};

export function PriceFilter({ value, onChange }: Props) {
  const options: { value: FilterState["priceSort"]; label: string }[] = [
    { value: "priceAsc", label: "Price (low to high)" },
    { value: "priceDesc", label: "Price (high to low)" },
  ];

  return (
    <FilterChip icon={<CurrencyDollarIcon className="w-4 h-4" />} label="Price">
      {options.map((opt) => (
        <MenuItem key={opt.value}>
          {({ active }) => (
            <button
              type="button"
              onClick={() => onChange(opt.value)}
              className={`block w-full px-3 py-1.5 text-left text-xs sm:text-sm ${
                active || value === opt.value
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          )}
        </MenuItem>
      ))}
    </FilterChip>
  );
}
