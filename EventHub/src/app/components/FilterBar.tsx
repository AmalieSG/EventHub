export function FilterBar() {
    const filters = ["Date", "Location", "Category", "Price", "Most Popular"];
    
    return (
        <section className="flex flex-wrap gap-2" aria-label="Filtermeny">
            {filters.map((filter) => (
                <button 
                key={filter}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100"
                aria-label={`Filer based on ${filter.toLowerCase()}`}
                >
                    {filter}
                </button>
            ))}
        </section>
    );
}
