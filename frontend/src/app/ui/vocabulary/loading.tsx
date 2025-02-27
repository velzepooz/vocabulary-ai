export function LoadingState() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Skeleton Header */}
      <div className="grid grid-cols-[1fr,2fr,auto] md:grid-cols-[1fr,3fr,auto] gap-4 px-6 py-3 bg-gray-50 border-b">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Skeleton Items */}
      <div className="divide-y divide-gray-200">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="grid grid-cols-[1fr,2fr,auto] md:grid-cols-[1fr,3fr,auto] gap-4 px-6 py-4 items-center">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
} 