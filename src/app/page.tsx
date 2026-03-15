import Image from "next/image";
import Dashboard from "../pages/(dashboard)/page";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <header className="w-full py-6 text-center text-white bg-background-secondary">
        <h1>Minnesota Twins 2026 Schedule Viewer</h1>
      </header>
      <div className="flex flex-1 justify-center">
        <main className="flex w-full max-w-6xl flex-col py-8 px-16 sm:items-start">
          <Dashboard/>
        </main>
      </div>
    </div>
  );
}
