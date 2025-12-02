"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FormEvent } from "react";
import { navigate } from "rwsdk/client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  label?: string;
}

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit?.();
  }

  return (
    <form
      role="search"
      aria-label="Search events"
      onSubmit={handleFormSubmit}
      className={`flex w-full max-w-3xl items-center gap-3`}
    >
      <section className="relative flex-1">
        <label className="sr-only">
          {"Search events"}
        </label>

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </span>

        <input
          id="global-search"
          name="q"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for events..."
          className="w-full rounded-md bg-gray-100 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none border border-gray-200 focus:border-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-400"
        />
      </section>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 transition hover:cursor-pointer"
        onClick={()=>navigate(`/events?q=${encodeURIComponent(value)}`)} // <- opprettet med github-copilot
      >
        Search
      </button>
    </form>
  );
}
