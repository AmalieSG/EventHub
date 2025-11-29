"use client";

import type { FilterState } from "@/app/lib/utils/filtering";
import { LocationFilter } from "./LocationFilter";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { PopularFilter } from "./PopularFilter";
import { DateRangeFilter } from "./DateRangeFilter";

type Props = {
  filters: FilterState;
  onChangeFilters: (next: FilterState) => void;
  availableCities: string[];
  availableCategories: string[];
};

export function FilterBar({
  filters,
  onChangeFilters,
  availableCities,
  availableCategories,
}: Props) {
  const setFilter = (partial: Partial<FilterState>) => {
    onChangeFilters({ ...filters, ...partial });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <DateRangeFilter
        dateFrom={filters.dateFrom}
        dateTo={filters.dateTo}
        onChange={({dateFrom, dateTo}) => setFilter({ dateFrom, dateTo })
        }
      />
      <LocationFilter
        value={filters.location}
        cities={availableCities}
        onChange={(location) => setFilter({ location })}
      />
      <CategoryFilter
        value={filters.category}
        categories={availableCategories}
        onChange={(category) => setFilter({ category })}
      />
      <PriceFilter
        value={filters.priceSort}
        onChange={(priceSort) => setFilter({ priceSort })}
      />
      <PopularFilter
        value={filters.popularSort}
        onChange={(popularSort) => setFilter({ popularSort })}
      />
    </div>
  );
}
