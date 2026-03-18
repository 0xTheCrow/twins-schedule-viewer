import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import PageContent from "../components/layout/PageContent";
import ScheduleDataProvider from "../providers/ScheduleDataProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
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
        className={`${geistSans.variable} antialiased`}
      >
        <div
          className="bg-background flex min-h-screen justify-center font-sans"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col">
            <Header />
            <ScheduleDataProvider>
              <PageContent>{children}</PageContent>
            </ScheduleDataProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
