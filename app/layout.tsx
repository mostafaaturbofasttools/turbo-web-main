import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { DeferredClientWidgets } from "@/components/deferred-client-widgets";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { defaultOgImage } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.descriptor}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.heroSubline,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.descriptor,
    description: siteConfig.tagline,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.descriptor,
    description: siteConfig.tagline,
    images: [defaultOgImage.url],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo-icon.svg", type: "image/svg+xml" },
      { url: "/logo-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/logo-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} dark h-full`}>
      <body
        className={`${geistSans.variable} min-h-full flex flex-col bg-background text-foreground antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <DeferredClientWidgets />
      </body>
    </html>
  );
}
