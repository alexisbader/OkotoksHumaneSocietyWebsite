import type { Metadata } from "next";
import { Geist_Mono, Source_Sans_3 } from "next/font/google";

import { Analytics } from "@/components/analytics/google-analytics";

import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Okotoks Humane Society",
    template: "%s · Okotoks Humane Society",
  },
  description:
    "Okotoks Humane Society — caring for animals and connecting them with loving homes.",
  icons: {
    icon: "/ohs-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
