import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import PageContent from "../components/layout/PageContent";

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
                    className="object-contain"
                  />
                </div>
              </div>
              <h1 className="text-base font-bold tracking-tight md:text-4xl">
                Minnesota Twins
              </h1>
              <div className="ml-auto flex flex-col items-end">
                <span className="text-2xl font-bold leading-tight tracking-tight md:text-5xl">
                  2026
                </span>
                <span
                  className="text-[8px] font-medium tracking-widest text-white/70
                    uppercase md:text-xs"
                >
                  Season Schedule
                </span>
              </div>
            </header>
            <PageContent>
              {children}
            </PageContent>
          </div>
        </div>
      </body>
    </html>
  );
}
