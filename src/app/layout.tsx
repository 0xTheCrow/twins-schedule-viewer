import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Twins 2026 Schedule Viewer",
  description: "View the Minnesota Twins 2026 season schedule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-background flex min-h-screen justify-center font-sans">
          <div className="mx-auto flex w-full max-w-4xl flex-col">
            <header
              className="bg-background-secondary flex w-full items-center gap-2
                rounded-b-md px-3 py-2.5 text-white md:gap-4 md:px-6 md:py-6"
            >
              <div
                className="flex size-10 items-center justify-center rounded-full
                  bg-[#002B5C] p-1 md:size-24 md:p-2"
              >
                <div
                  className="flex size-full items-center justify-center
                    overflow-hidden rounded-full bg-white p-1 md:p-2.5"
                >
                  <Image
                    src="/twins_logo.svg"
                    alt="Minnesota Twins logo"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-bold tracking-tight md:text-2xl">
                  Minnesota Twins
                </h1>
                <span
                  className="text-[10px] font-medium tracking-widest text-white/70
                    uppercase md:text-sm"
                >
                  2026 Schedule
                </span>
              </div>
            </header>
            <main className="flex flex-1 flex-col text-white">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
