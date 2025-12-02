"use client";

import type { FilterState } from "@/app/lib/utils/filtering";
import { labelFromSlug } from "@/app/lib/utils/filtering";

type Props = {
  filters: FilterState;
  onChangeFilters: (next: FilterState) => void;
};

const popularSortLabels: Record<NonNullable<FilterState["popularSort"]>, string> = {
  popularAsc: "Least popular",
  popularDesc: "Most popular",
}

const priceSortLabels: Record<NonNullable<FilterState["priceSort"]>, string> = {
  priceAsc: "Price (low to high)",
  priceDesc: "Price (high to low)",
}

export function ActiveFilters({ filters, onChangeFilters }: Props) {
  const hasAny =
    filters.location ||
    (filters.category && filters.category.length > 0) ||
    filters.dateFrom ||
    filters.dateTo ||
    filters.popularSort ||
    filters.priceSort;

  if (!hasAny) return null;

  const clearField = (field: keyof FilterState) => {
    if (field === "category") {
      onChangeFilters({
        ...filters,
        category: [],
      });
      return;
    }

    onChangeFilters({
      ...filters,
      [field]: null,
    } as FilterState);
  };

  const clearDateRange = () => {
    onChangeFilters({
      ...filters,
      dateFrom: null,
      dateTo: null,
    });
  };

  const clearSingleCategory = (cat: string) => {
    const nextCategories = (filters.category || []).filter((c) => c !== cat);

    onChangeFilters({
      ...filters,
      category: nextCategories
    });
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {filters.location && (
        <button
          type="button"
          onClick={() => clearField("location")}
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
        >
          <span>{labelFromSlug(filters.location)}</span>
          <span aria-hidden="true" className="text-gray-400">
            ×
          </span>
        </button>
      )}

      {filters.category &&
        filters.category.length > 0 &&
        filters.category.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => clearSingleCategory(cat)}
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
          >
            <span>{labelFromSlug(cat)}</span>
            <span aria-hidden="true" className="text-gray-400">
              ×
            </span>
          </button>
      ))}

      {(filters.dateFrom || filters.dateTo) && (
        <button
          type="button"
          onClick={clearDateRange}
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
        >
          <span>
            {" "}
            {filters.dateFrom && filters.dateTo
              ? `${filters.dateFrom} – ${filters.dateTo}`
              : filters.dateFrom
              ? `from ${filters.dateFrom}`
              : `to ${filters.dateTo}`}
          </span>
          <span aria-hidden="true" className="text-gray-400">
            ×
          </span>
        </button>
      )}

      {filters.priceSort && (
        <button
          type="button"
          onClick={() => clearField("priceSort")}
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
        >
          <span>{priceSortLabels[filters.priceSort]}</span>
          <span aria-hidden="true" className="text-gray-400">
            ×
          </span>
        </button>
      )}

      {filters.popularSort && (
        <button
          type="button"
          onClick={() => clearField("popularSort")}
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
        >
          <span>{popularSortLabels[filters.popularSort]}</span>
          <span aria-hidden="true" className="text-gray-400">
            ×
          </span>
        </button>
      )}
    </div>
  );
}
