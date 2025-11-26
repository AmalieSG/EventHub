// src/app/components/SearchBar.tsx
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FormEvent, KeyboardEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  id?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search for events...",
  label = "Search events",
  className = "",
  id = "home-search",
}: SearchBarProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.(value);
    }
  };

  return (
    <form
      role="search"
      aria-label={label}
      onSubmit={handleFormSubmit}
      className={`flex w-full max-w-3xl items-center gap-3 ${className}`}
    >
      {/* Selve søkefeltet (den lyse, brede baren) */}
      <div className="relative flex-1">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </span>

        <input
          id={id}
          name="q"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full rounded-full bg-gray-100 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none border border-gray-200 focus:border-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Sort “Search”-knapp til høyre */}
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 transition"
      >
        Search
      </button>
    </form>
  );
}
