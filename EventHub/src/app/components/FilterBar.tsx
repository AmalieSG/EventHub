"use client";
/* import {
  CalendarDaysIcon,
  MapPinIcon,
  TagIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { type ReactNode } from "react";

export type FilterState = {
  date?: string | null;
  location?: string | null;
  category?: string | null;
  price?: string | null;
};

export const defaultFilters: FilterState = {
  date: null,
  location: null,
  category: null,
  price: null,
};

export type LayoutType = "grid" | "list";

interface FilterBarProps {
  filters?: FilterState;
  onChangeFilters?: (next: FilterState) => void;
  layout?: LayoutType;
  setLayout?: (layout: LayoutType) => void;
  className?: string;
}

type FilterButtonProps = {
  icon: ReactNode;
  label: string;
};

function FilterButton({ icon, label }: FilterButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition"
    >
      <span className="w-4 h-4 flex items-center justify-center text-gray-400">
        {icon}
      </span>
      <span className="whitespace-nowrap">{label}</span>
      <ChevronDownIcon className="w-4 h-4 text-gray-400" />
    </button>
  );
}

export function FilterBar({ className }: FilterBarProps) {
  return (
    <div
      className={
        "flex flex-wrap items-center gap-2 sm:gap-3 py-2 " +
        (className ?? "")
      }
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-gray-600 mr-1">
          <FunnelIcon className="w-4 h-4 text-gray-400" />
          Filtre
        </span>

        <FilterButton
          icon={<CalendarDaysIcon className="w-4 h-4" />}
          label="Dato"
        />
        <FilterButton
          icon={<MapPinIcon className="w-4 h-4" />}
          label="Sted"
        />
        <FilterButton
          icon={<TagIcon className="w-4 h-4" />}
          label="Kategori"
        />
        <FilterButton
          icon={<CurrencyDollarIcon className="w-4 h-4" />}
          label="Pris"
        />
      </div>
    </div>
  );
} */

import { useMemo, useEffect } from 'react';
import { XMarkIcon, } from '@heroicons/react/24/outline';
import { EventWithRelations } from '../api/events/eventsRepository';
export type LayoutType = 'grid' | 'list';

export interface FilterState {
    onlineOnly: boolean;
    cities: string[];
    categories: string[];
}

export const defaultFilters: FilterState = { onlineOnly: false, cities: [], categories: [] };

export interface FilterBarProps {
    events: EventWithRelations[]; 
    currentFilters: FilterState;
    onApplyFilters: (filters: FilterState) => void;
    isFilterOpen: boolean;
    setIsFilterOpen: (isOpen: boolean) => void;
}

export function FilterBar({ 
    events, 
    currentFilters, 
    onApplyFilters, 
    isFilterOpen, 
    setIsFilterOpen 
}: FilterBarProps) { 
    
    const availableCities = useMemo(() => {
        const unique = new Set<string>();
        events.forEach(e => {
            if (e.address?.city) unique.add(e.address.city); 
        });
        return Array.from(unique).sort();
    }, [events]); 

    
    const availableCategories = useMemo(() => {
        const unique = new Set<string>();
        events.forEach(e => {
            if (e.category) unique.add(e.category);
        });
        return Array.from(unique).sort();
    }, [events]);

    const handleCityToggle = (city: string) => {
        const current = currentFilters.cities || [];
        const selected = current.includes(city);
        const nextCities = selected
            ? current.filter(c => c !== city)
            : [...current, city];
        onApplyFilters({ ...currentFilters, cities: nextCities });
    }

    
    const handleCategoryToggle = (category: string) => {
        const current = currentFilters.categories || [];
        const selected = current.includes(category);
        const nextCategories = selected
            ? current.filter(c => c !== category)
            : [...current, category];
            
        onApplyFilters({ ...currentFilters, categories: nextCategories });
    }

    const handleOnlineToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        onApplyFilters({ ...currentFilters, onlineOnly: e.target.checked });
    }

    const handleClear = () => {
        onApplyFilters(defaultFilters);
    }

    
    useEffect(() => {
        if (!isFilterOpen) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsFilterOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFilterOpen, setIsFilterOpen]);

    
    if (!isFilterOpen) return null;


    return (
        
        <div className="fixed inset-0 z-50">
            
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setIsFilterOpen(false)}
                aria-hidden="true"
            />
            
        
            <div className="absolute inset-y-0 right-0 w-full max-w-xs">
                <div 
                    className="h-full bg-white shadow-xl border-l border-gray-100 transform transition-transform duration-300 ease-in-out"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="filter-modal-title"
                >
                    <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h4 id="filter-modal-title" className="text-lg font-semibold text-gray-900">Filters</h4>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            aria-label="Close filters"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="p-5 space-y-6 overflow-y-auto h-[calc(100%-100px)]">
                        
                        <div>
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={currentFilters.onlineOnly}
                                    onChange={handleOnlineToggle}
                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600" 
                                />
                                <span className="text-sm font-medium text-gray-800">Online events only</span>
                            </label>
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cities</label>
                            <div className="flex flex-wrap gap-2">
                                {availableCities.map((city) => {
                                    const selected = currentFilters.cities.includes(city);
                                    return (
                                        <button
                                            key={city}
                                            type="button"
                                            onClick={() => handleCityToggle(city)}
                                            className={`${selected ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 rounded-full px-3 py-1 text-sm cursor-pointer transition-colors`}
                                            aria-pressed={selected}
                                        >
                                            {city}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {availableCategories.map((category) => {
                                    const selected = currentFilters.categories.includes(category);
                                    return (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => handleCategoryToggle(category)}
                                            className={`${selected ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 rounded-full px-3 py-1 text-sm cursor-pointer transition-colors`}
                                            aria-pressed={selected}
                                        >
                                            {category}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                    
                    
                    <div className="px-5 py-4 border-t border-gray-100 flex justify-center">
                        <button
                            onClick={handleClear}
                            className="text-sm text-gray-600 hover:text-red-700 font-medium cursor-pointer underline transition-colors"
                        >
                            Reset All Filters
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
