import Image from "next/image";
import Dashboard from "../pages/(dashboard)/page";

export default function Home() {

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <header className="w-full py-6 text-center text-white bg-background-secondary">
        <p>Minnesota Twins Schedule Viewer</p>
      </header>
      <div className="flex flex-1 justify-center">
        <main className="flex flex-1 w-full max-w-6xl flex-col py-8 px-16 bg-white sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <Dashboard/>
        </main>
      </div>
    </div>
  );
}
