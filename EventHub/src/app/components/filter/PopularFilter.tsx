// src/app/components/search/PopularFilter.tsx
"use client";

import { MenuItem } from "@headlessui/react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { FilterChip } from "./FilterChip";
import type { FilterState } from "@/app/lib/utils/filtering";

type Props = {
  value: FilterState["popularSort"];
  onChange: (value: FilterState["popularSort"]) => void;
};

export function PopularFilter({ value, onChange }: Props) {
  const options: { value: FilterState["popularSort"]; label: string }[] = [
    { value: "popularAsc", label: "Least popular (low to high)" },
    { value: "popularDesc", label: "Most popular (high to low)" },
  ];

  return (
    <FilterChip
      icon={<ArrowTrendingUpIcon className="w-4 h-4" />}
      label="Popularity"
    >
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
