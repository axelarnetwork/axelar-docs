export function ChainCardSkeleton({ count = 6 }) {
  return (
    <div className="grid lg:grid-cols-2 gap-5 not-prose">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-background-neutral-dark rounded-xl p-5 animate-pulse"
        >
          <div className="flex items-center gap-3 pb-5 border-b border-border">
            <div className="rounded-full size-8 bg-gray-300 dark:bg-gray-700" />
            <div className="flex flex-col gap-1">
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
          <div className="flex flex-col gap-2.5 pt-5">
            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AssetTableSkeleton() {
  return (
    <div className="flex flex-col gap-10 mt-4 not-prose animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg" />
    </div>
  );
}

export function ErrorMessage({ message }) {
  return (
    <div className="not-prose p-6 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
      <p className="text-red-700 dark:text-red-400 font-medium">
        {message || "Failed to load data. Please refresh the page."}
      </p>
    </div>
  );
}
