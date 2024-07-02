export function AchievementItemSkeleton() {
  return (
    <div className="animate-pulse ">
      <div className="py-4 px-4 border-t-2 border-blue-500 rounded-sm shadow-lg relative">
        <div className="flex items-center">
          <div className="h-2 bg-gray-200 rounded-full  w-48 mb-2"></div>
        </div>
        <div className="h-3.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded-full  w-full mb-4"></div>
      </div>
    </div>
  );
}
