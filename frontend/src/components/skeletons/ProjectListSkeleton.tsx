const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const ProjectListSkeleton = () => {
  return (
    <>
      <div
        className={`relative ${shimmer} overflow-hidden shadow-sm w-full h-9 p-2 box-border rounded-md hover:cursor-pointer bg-gray-200 animate-pulse`}
      ></div>
      <div
        className={`relative ${shimmer} overflow-hidden shadow-sm w-full h-9 p-2 box-border rounded-md hover:cursor-pointer bg-gray-200 animate-pulse`}
      ></div>
      <div
        className={`relative ${shimmer} overflow-hidden shadow-sm w-full h-9 p-2 box-border rounded-md hover:cursor-pointer bg-gray-200 animate-pulse`}
      ></div>
      <div
        className={`relative ${shimmer} overflow-hidden shadow-sm w-full h-9 p-2 box-border rounded-md hover:cursor-pointer bg-gray-200 animate-pulse`}
      ></div>
    </>
  );
};

export const ProjectCreateSkeleton = () => {
  return (
    <div
      className={`relative ${shimmer} overflow-hidden shadow-sm w-full h-9 p-2 box-border rounded-md hover:cursor-pointer bg-gray-200 animate-pulse`}
    ></div>
  );
};
