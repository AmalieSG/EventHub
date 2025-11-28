"use client";

import { MenuItems, MenuItem } from "@headlessui/react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { FilterChip } from "./FilterChip";

type Props = {
  dateFrom: string | null;
  dateTo: string | null;
  onChange: (partial: { dateFrom: string | null; dateTo: string | null }) => void;
};

export function DateRangeFilter({ dateFrom, dateTo, onChange }: Props) {
  return (
    <FilterChip icon={<CalendarDaysIcon className="w-4 h-4" />} label="Date">
        <MenuItems className="absolute z-20 mt-2 w-64 origin-top-left rounded-md bg-white p-3 shadow-lg ring-1 ring-black/5 text-sm space-y-3">

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Fra</label>
          <input
            type="date"
            value={dateFrom ?? ""}
            onChange={(e) =>
              onChange({ dateFrom: e.target.value || null, dateTo: dateTo })
            }
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Til</label>
          <input
            type="date"
            value={dateTo ?? ""}
            onChange={(e) =>
              onChange({ dateFrom: dateFrom, dateTo: e.target.value || null })
            }
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </div>

        <MenuItem>
          {({ active }) => (
            <button
              type="button"
              onClick={() => onChange({ dateFrom: null, dateTo: null })}
              className={`w-full mt-2 px-3 py-1.5 rounded-md ${
                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
              }`}
            >
              Nullstill dato
            </button>
          )}
        </MenuItem>
      </MenuItems>
    </FilterChip>
  );
}
