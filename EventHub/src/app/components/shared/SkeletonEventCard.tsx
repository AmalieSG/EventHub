export function SkeletonEventCard() {
  return (
    <article
      className="animate-pulse bg-white rounded-xl shadow p-4 flex flex-col"
      aria-label="Loading event card"
    >
      <figure className="bg-gray-200 rounded-lg h-40 w-full mb-4" />
      
      <section className="flex flex-col">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-full mb-2" />
        <div className="h-3 bg-gray-200 rounded w-5/6 mb-4" /> 
      </section>

      <section className="mt-auto">
        <div className="h-10 bg-gray-300 rounded-md" /> 
      </section>
    </article>
  );
}
