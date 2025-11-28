"use client";

import { MenuItem } from "@headlessui/react";
import { TagIcon } from "@heroicons/react/24/outline";
import { FilterChip } from "./FilterChip";
import type { FilterState } from "@/app/lib/utils/filtering";

type Props = {
  value: FilterState["category"];    // nå: string[]
  categories: string[];
  onChange: (value: FilterState["category"]) => void;
};

export function CategoryFilter({ value, categories, onChange }: Props) {
  const selected = value ?? [];

  const toggleCategory = (cat: string) => {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  };

  return (
    <FilterChip icon={<TagIcon className="w-4 h-4" />} label="Kategori">
      {categories.map((cat) => {
        const isActive = selected.includes(cat);
        return (
          <MenuItem key={cat}>
            {({ active }) => (
              <button
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`block w-full px-3 py-1.5 text-left text-xs sm:text-sm ${
                  active || isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                }`}
              >
                {/* Du kan evt. legge til en liten "✔" foran valgte */}
                {isActive ? "• " : ""}{cat}
              </button>
            )}
          </MenuItem>
        );
      })}
    </FilterChip>
  );
}
