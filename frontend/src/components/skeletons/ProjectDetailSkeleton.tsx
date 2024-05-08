const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const ProjectDetailSkeleton = () => {
  return (
    <div className={`relative ${shimmer} overflow-hidden`}>
      <div className="w-full px-1.5 animate-pulse">
        <div className="flex justify-between w-full py-2">
          <div className="flex gap-2 items-center">
            <div className="p-1 h-6 bg-gray-100 rounded w-48"></div>
            <div className="bg-gray-100 p-1 rounded-sm h-6 w-6"></div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="py-1 px-2 bg-gray-100 rounded-sm h-8 w-24"></div>
            <div className="py-1 px-2 bg-gray-100 rounded-sm h-8 w-24"></div>
          </div>
        </div>
        <div>
          <div className="rounded w-full h-20 p-1 bg-gray-100"></div>
        </div>
      </div>
      <div className="mt-5 ml-2">
        <div className="w-20 h-8 rounded bg-gray-100 mb-3"></div>
        <div className="mt-1 bg-gray-50/80 p-2 rounded-sm flex flex-col gap-0.5">
          <div className="flex justify-between w-full py-2">
            <div className="flex gap-2 items-center">
              <div className="p-1 h-6 bg-gray-100 rounded w-48"></div>
              <div className="bg-gray-100 p-1 rounded-sm h-6 w-6"></div>
            </div>
            <div className="flex gap-1 items-center">
              <div className="py-1 px-2 bg-gray-100 rounded-sm h-7 w-24"></div>
              <div className="py-1 px-2 bg-gray-100 rounded-sm h-7 w-24"></div>
            </div>
          </div>
          <div>
            <div className="h-8 w-28 rounded bg-gray-100"></div>
          </div>
          <div>
            <div className="rounded w-full h-12 p-1 bg-gray-100"></div>
          </div>
        </div>
        <div className="mt-2 w-20 h-10 rounded bg-gray-100"></div>
      </div>
    </div>
  );
};
