import type { Metadata } from "next";
import { Fraunces, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MoltReach by Visionary AI | AI-Powered B2B Lead Generation & Outreach",
  description: "MoltReach finds your perfect B2B customers, writes deeply personalized AI emails, sends automatically, and follows up until they reply. Your pipeline on autopilot.",
  keywords: ["MoltReach", "Visionary AI", "B2B lead generation", "AI outreach", "automated emails", "sales automation", "lead generation", "outreach automation"],
  authors: [{ name: "Visionary AI" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "MoltReach by Visionary AI",
    description: "Your pipeline. On autopilot. AI-powered B2B lead generation and outreach automation.",
    url: "https://moltreach.com",
    siteName: "MoltReach",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoltReach by Visionary AI",
    description: "Your pipeline. On autopilot. AI-powered B2B lead generation and outreach automation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${fraunces.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
