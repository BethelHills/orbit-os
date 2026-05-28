import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "@/components/providers";
import { Web3Provider } from "@/components/providers/web3-provider";
import { GlobePrefetch } from "@/components/globe/globe-prefetch";
import { SITE_URL } from "@/lib/env";
import { THEME_STORAGE_KEY } from "@/lib/theme";
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
  metadataBase: new URL(SITE_URL),
  title: "OrbitOS — AI Operating System for On-chain Actions",
  description:
    "AI Operating System for On-chain Actions. Launch, monitor, and manage on-chain activity from one command center.",
  applicationName: "OrbitOS",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "OrbitOS",
    title: "OrbitOS — AI Operating System for On-chain Actions",
    description:
      "AI Operating System for On-chain Actions. Launch, monitor, and manage on-chain activity from one command center.",
    images: [
      {
        url: "/og-preview.png",
        width: 1024,
        height: 682,
        alt: "OrbitOS — AI Operating System for On-chain Actions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OrbitOS — AI Operating System for On-chain Actions",
    description:
      "AI Operating System for On-chain Actions. Launch, monitor, and manage on-chain activity from one command center.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k)||'dark';var d=t==='system'?window.matchMedia('(prefers-color-scheme: dark)').matches:t==='dark';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(d?'dark':'light');document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <link rel="preload" href="/globe/earth-night.jpg" as="image" />
        <link rel="preload" href="/globe/earth-topology.png" as="image" />
      </head>
      <body className="min-h-full flex flex-col bg-orbit-page text-orbit-foreground">
        <GlobePrefetch />
        <Providers>
          <Web3Provider>{children}</Web3Provider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
