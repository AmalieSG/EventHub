import type { EventWithRelations } from "@/app/api/events/eventsRepository";

export type PopularSort = "popularAsc" | "popularDesc" | null;
export type PriceSort = "priceAsc" | "priceDesc" | null;

export type FilterState = {
  location: string | null;
  category: string[];
  popularSort: PopularSort;
  priceSort: PriceSort;
  dateFrom: string | null;
  dateTo: string | null;
};

export const defaultFilters: FilterState = {
  location: null,
  category: [],
  popularSort: null,
  priceSort: null,
  dateFrom: null,
  dateTo: null
};

export function getAvailableCities(events: EventWithRelations[]): string[] {
  const set = new Set<string>();
  events.forEach((e) => {
    const city = e.address?.split(",")[0]?.trim();
    if (city) set.add(city);
  });
  return Array.from(set).sort();
}

export function getAvailableCategories(
  events: EventWithRelations[]
): string[] {
  return Array.from(
    new Set(events.map((e) => e.category).filter(Boolean) as string[])
  ).sort();
}

export function filterAndSortEvents(
  events: EventWithRelations[],
  searchTerm: string,
  filters: FilterState
): EventWithRelations[] {
  const q = searchTerm.trim().toLowerCase();

  let list = events.filter((e) => {
    const matchesSearch =
      !q ||
      [e.title, e.summary ?? "", e.description ?? "", e.category ?? "", e.address ?? ""]
        .some((field) => field.toLowerCase().includes(q));


    const eventDate = e.eventStart ? new Date(e.eventStart) : null;
    let matchesDate = true;
    if (eventDate && filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      fromDate.setHours(0, 0, 0, 0);
      if (eventDate < fromDate) {
        matchesDate = false;
      }
    }
    if (eventDate && filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      if (eventDate > toDate) {
        matchesDate = false;
      }
    }



    const city = e.address?.split(",")[0]?.trim().toLowerCase() ?? "";
    const matchesLocation =
      !filters.location || city === filters.location.toLowerCase();

    const matchesCategory =
      filters.category.length === 0 || 
      filters.category.includes(e.category)  ;

    return (
      matchesSearch &&
      matchesDate &&
      matchesLocation &&
      matchesCategory
    );
  });

  if (!filters.popularSort && !filters.priceSort) {
    return list;
  }
  
  list = [...list];

  list.sort((a, b) => {
    if (filters.popularSort) {
      const aCount = a.attendees?.length ?? 0;
      const bCount = b.attendees?.length ?? 0;
      if (aCount !== bCount) {
        if (filters.popularSort === "popularAsc") {
          return aCount - bCount;
        } else {
          return bCount - aCount;
        }
      }
    }
    if (filters.priceSort) {
      const aPrice = a.price ?? 0;
      const bPrice = b.price ?? 0;
      if (aPrice !== bPrice) {
        if (filters.priceSort === "priceAsc") {
          return aPrice - bPrice;
        } else {
          return bPrice - aPrice;
        }
      }
    }
    return 0;
  })

  return list;
}
