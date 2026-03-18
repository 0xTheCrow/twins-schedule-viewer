import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
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
        <div
          className="bg-background flex min-h-screen justify-center font-sans"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col">
            <Header />
            <PageContent>{children}</PageContent>
          </div>
        </div>
      </body>
    </html>
  );
}
