import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { isProduction, SITE_URL } from "@/lib/site";
import { SITE_DEFAULT_SEO } from "@/lib/seoMetadata";

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_DEFAULT_SEO.metaTitle,
  description: SITE_DEFAULT_SEO.metaDescription,
  authors: [{ name: "JIVO Energy", url: SITE_URL }],
  creator: "JIVO Energy",
  publisher: "JIVO Energy",
  icons: {
    icon: "/favicon.ico",
  },
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "JIVO Energy",
    title: SITE_DEFAULT_SEO.metaTitle,
    description: SITE_DEFAULT_SEO.metaDescription,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_SEO.metaTitle,
    description: SITE_DEFAULT_SEO.metaDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased`}>
        {children}
        <Script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
 