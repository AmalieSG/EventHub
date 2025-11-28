/*"use client";

import { MenuItem } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { FilterChip } from "./FilterChip";
import type { FilterState } from "@/app/lib/utils/filtering";

type DateFilterProps = {
  value: FilterState["date"];
  onChange: (value: FilterState["date"]) => void;
};

export function DateFilter({ value, onChange }: DateFilterProps) {
  const options: { value: FilterState["date"]; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "this-week", label: "This week" },
    { value: "this-month", label: "This month" },
  ];

  return (
    <FilterChip icon={<CalendarDaysIcon className="w-4 h-4" />} label="Date">
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
*/