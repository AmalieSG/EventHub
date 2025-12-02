// kanskje legge til dato i url?

import type { FilterState } from "./filtering";
import { defaultFilters } from "./filtering";

export type ParsedFiltersResult = {
  search: string;
  filters: FilterState;
};

export function parseFiltersFromSearchParams(
  searchParams: URLSearchParams
): ParsedFiltersResult {
  const search = searchParams.get("q") ?? searchParams.get("query") ?? "";
  const rawFilters = searchParams.get("filters") ?? "";

  const tokens = rawFilters
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const location = searchParams.get("location") ?? null;
  const category: string[] = [];
  let popularSort: FilterState["popularSort"] = null;
  let priceSort: FilterState["priceSort"] = null;
  
  for (const token of tokens) {
    if (token === "most-popular") {
      popularSort = "popularDesc";
      continue;
    }
    if (token === "least-popular") {
      popularSort = "popularAsc";
      continue;
    }

    if (token === "price-low-high") {
      priceSort = "priceAsc";
      continue;
    }
    if (token === "price-high-low") {
      priceSort = "priceDesc";
      continue;
    }

    category.push(token.toLowerCase());
  }

  return {
    search,
    filters: {
      ...defaultFilters,
      location,
      category,
      popularSort,
      priceSort,
    },
  };
}

export function filtersToSearchParams(
  filters: FilterState,
  search: string
): URLSearchParams {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("q", search.trim());
  }

  const parts: string[] = [];

  for (const cat of filters.category) {
    if (cat.trim()) parts.push(cat.trim().toLowerCase());
  }

  for (const loc of [filters.location]) {
    if (loc?.trim()) parts.push(loc.trim().toLowerCase());
  }

  if (filters.popularSort === "popularDesc") {
    parts.push("most-popular");
  } else if (filters.popularSort === "popularAsc") {
    parts.push("least-popular");
  }

  if (filters.priceSort === "priceAsc") {
    parts.push("price-low-high");
  } else if (filters.priceSort === "priceDesc") {
    parts.push("price-high-low");
  }

  if (parts.length > 0) {
    params.set("filters", parts.join(" "));
  }
  

  /*if (filters.location) {
    params.set("location", filters.location);
  }*/

  return params;
}
