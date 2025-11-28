"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

type FilterChipProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

export function FilterChip({ icon, label, children }: FilterChipProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-300">
        <span className="w-4 h-4 flex items-center justify-center text-gray-400">
          {icon}
        </span>
        <span className="whitespace-nowrap">{label}</span>
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </MenuButton>
      <MenuItems className="absolute z-20 mt-2 w-44 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
        {children}
      </MenuItems>
    </Menu>
  );
}
