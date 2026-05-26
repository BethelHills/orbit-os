import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { GlobePrefetch } from "@/components/globe/globe-prefetch";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://orbit-os-rho.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OrbitOS — Zora Creator Assistant on Base",
  description:
    "Aomi-powered Zora Creator Assistant on Base. Launch, monitor, and manage your creator coin from one chat.",
  applicationName: "OrbitOS",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "OrbitOS",
    title: "OrbitOS — Zora Creator Assistant on Base",
    description:
      "Aomi-powered Zora Creator Assistant on Base. Launch, monitor, and manage your creator coin from one chat.",
    images: [
      {
        url: "/og-preview.png",
        width: 1024,
        height: 682,
        alt: "OrbitOS cyberpunk dashboard — Zora Creator Assistant on Base",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OrbitOS — Zora Creator Assistant on Base",
    description:
      "Aomi-powered Zora Creator Assistant on Base. Launch, monitor, and manage your creator coin from one chat.",
    images: ["/og-preview.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href="/globe/earth-night.jpg" as="image" />
        <link rel="preload" href="/globe/earth-topology.png" as="image" />
      </head>
      <body className="min-h-full flex flex-col">
        <GlobePrefetch />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
