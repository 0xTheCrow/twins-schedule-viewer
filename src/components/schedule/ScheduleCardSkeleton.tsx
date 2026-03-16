const ShimmerBar = ({ className }: { className?: string }) => (
  <div
    className={`animate-shimmer rounded bg-gradient-to-r from-gray-200
      via-gray-100 to-gray-200 bg-[length:200%_100%] ${className}`}
  />
);

export default function ScheduleCardSkeleton({ index }: { index: number }) {
  return (
    <div
      className="flex flex-row items-center overflow-hidden rounded-md bg-white
        text-sm shadow-md"
    >
      <div
        className="animate-shimmer flex w-12 shrink-0 items-center
          justify-center self-stretch bg-gradient-to-r from-gray-300
          via-gray-200 to-gray-300 bg-[length:200%_100%] md:w-16"
      />
      <div className={`flex-1 ${index % 2 === 1 ? "bg-gray-200" : ""}`}>
        <div className="flex flex-col gap-1.5 px-3 py-2 md:hidden">
          <ShimmerBar className="h-4 w-36" />
          <ShimmerBar className="h-3 w-48" />
        </div>
        <div
          className="hidden grid-cols-[12rem_8rem_5rem_1rem] items-center gap-4
            px-4 py-3 md:grid"
        >
          <ShimmerBar className="h-4 w-32" />
          <ShimmerBar className="h-4 w-24" />
          <ShimmerBar className="h-4 w-16" />
          <ShimmerBar className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  );
}
