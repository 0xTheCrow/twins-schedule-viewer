"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div
      className="flex min-h-[60vh] w-full flex-col items-center justify-center
        gap-4 text-center"
    >
      <p className="text-lg font-semibold text-white">
        Something went wrong
      </p>
      <button
        onClick={reset}
        className="cursor-pointer rounded-md bg-white px-4 py-2 text-sm
          font-medium text-[#002B5C] transition-colors hover:bg-white/90"
      >
        Try again
      </button>
    </div>
  );
}
