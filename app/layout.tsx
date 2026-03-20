import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CommandPalette } from "@/components/CommandPalette";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "daisydaines",
  description: "builder. poet. future dunker.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "daisydaines",
    description: "builder. poet. future dunker.",
    url: "https://daisydaines.com",
    siteName: "daisydaines",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}
      >
        <Providers>
          <CommandPalette />
          <KeyboardShortcuts />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
