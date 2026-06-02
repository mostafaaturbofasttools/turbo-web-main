import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AnalyticsGate } from "@/components/analytics-gate";
import { CookieConsentLoader } from "@/components/cookie-consent-loader";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.descriptor}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "TRBO publishes and grows apps with AI-powered development, hybrid paid + organic distribution, and partner publishing through Supercent, Voodoo, and Homa.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.descriptor,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo-icon.svg", type: "image/svg+xml" },
      { url: "/logo-48.png", sizes: "48x48", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} dark h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsentLoader />
        <AnalyticsGate />
      </body>
    </html>
  );
}
