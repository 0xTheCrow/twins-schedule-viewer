export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] w-full items-center justify-center px-3 py-4
        md:px-8 md:py-6"
    >
      <div
        className="size-8 animate-spin rounded-full border-4 border-white/20
          border-t-white"
      />
    </div>
  );
}
