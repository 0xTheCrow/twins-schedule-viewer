import Image from "next/image";
import Dashboard from "../pages/(dashboard)/page";

export default function Home() {

  return (
    <div className="flex justify-center font-sans bg-background min-h-screen">
      <div className="flex w-full max-w-4xl mx-auto flex-col">
        <header className="flex items-center gap-2 md:gap-4 w-full px-3 py-2.5 md:px-6 md:py-6 text-white bg-background-secondary rounded-b-md">
          <div className="flex items-center justify-center size-10 md:size-24 rounded-full bg-[#002B5C] p-1 md:p-2">
            <div className="flex items-center justify-center size-full rounded-full bg-white p-1 md:p-2.5 overflow-hidden">
              <Image src="/twins_logo.svg" alt="Minnesota Twins logo" width={64} height={64} className="object-contain" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base md:text-2xl font-bold tracking-tight">Minnesota Twins</h1>
            <span className="text-[10px] md:text-sm font-medium text-white/70 tracking-widest uppercase">2026 Schedule</span>
          </div>
        </header>
        <main className="flex flex-1 flex-col text-white">
          <Dashboard/>
        </main>
      </div>
    </div>
  );
}
