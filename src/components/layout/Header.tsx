import Image from "next/image";

export default function Header() {
  return (
    <header
      className="bg-background-secondary flex w-full items-center gap-2
        rounded-b-md px-3 py-2.5 text-white md:gap-4 md:px-6 md:py-6"
    >
      <div
        className="flex size-11 items-center justify-center rounded-full
          bg-[#002B5C] p-1 md:size-[6.5rem] md:p-2"
      >
        <div
          className="flex size-full items-center justify-start
            overflow-hidden rounded-full bg-white p-1 md:p-2.5"
        >
          <Image
            src="/twins_logo.svg"
            alt="Minnesota Twins logo"
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <h1 className="text-base font-bold tracking-tight md:text-4xl">
        Minnesota Twins
      </h1>
      <div className="ml-auto flex flex-col items-end">
        <span
          className="text-2xl leading-tight font-bold tracking-tight
            md:text-5xl"
        >
          2026
        </span>
        <span
          className="text-[8px] font-medium tracking-widest
            text-white/70 uppercase md:text-xs"
        >
          Season Schedule
        </span>
      </div>
    </header>
  );
}
