"use client";

import { MenuItems } from "@headlessui/react";
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

        <section className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">From</label>
          <input
            type="date"
            value={dateFrom ?? ""}
            onChange={(e) =>
              onChange({ dateFrom: e.target.value || null, dateTo: dateTo })
            }
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </section>

        <section className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">To</label>
          <input
            type="date"
            value={dateTo ?? ""}
            onChange={(e) =>
              onChange({ dateFrom: dateFrom, dateTo: e.target.value || null })
            }
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          />
        </section>
      </MenuItems>
    </FilterChip>
  );
}
