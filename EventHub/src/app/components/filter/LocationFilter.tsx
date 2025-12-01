"use client";

import { MenuItem } from "@headlessui/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { FilterChip } from "./FilterChip";
import type { FilterState } from "@/app/lib/utils/filtering";

type Props = {
  value: FilterState["location"];
  cities: string[];
  onChange: (value: FilterState["location"]) => void;
};

export function LocationFilter({ value, cities, onChange }: Props) {
  return (
    <FilterChip icon={<MapPinIcon className="w-4 h-4" />} label="Location">
      {cities.map((city) => (
        <MenuItem key={city}>
          {({ active }) => (
            <button
              type="button"
              onClick={() => onChange(city)}
              className={`block w-full px-3 py-1.5 text-left text-xs sm:text-sm ${
                active || value === city
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
              }`}
            >
              {city}
            </button>
          )}
        </MenuItem>
      ))}
    </FilterChip>
  );
}
