"use client";

import { MenuItem } from "@headlessui/react";
import { TagIcon } from "@heroicons/react/24/outline";
import { FilterChip } from "./FilterChip";
import { labelFromSlug } from "@/app/lib/utils/filtering";

type Props = {
  value: string[];
  categories: string[];
  onChange: (value: string[]) => void;
};

export function CategoryFilter({ value, categories, onChange }: Props) {
  const selected = new Set(value);

  const toggleCategory = (slug: string) => {
    if (selected.has(slug)) {
      onChange(value.filter((c) => c !== slug));
    } else {
      onChange([...value, slug]);
    }
  };

  return (
    <FilterChip icon={<TagIcon className="w-4 h-4" />} label="Category">
      {categories.map((slug) => {
        const isActive = selected.has(slug);
        const label = labelFromSlug(slug);

        return (
          <MenuItem key={slug}>
            {({ active }) => (
              <button
                type="button"
                onClick={() => toggleCategory(slug)}
                className={`block w-full px-3 py-1.5 text-left text-xs sm:text-sm ${
                  active || isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                }`}
              >
                {label}
              </button>
            )}
          </MenuItem>
        );
      })}
    </FilterChip>
  );
}
