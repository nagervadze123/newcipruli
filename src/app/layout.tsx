import type { Metadata, Viewport } from "next";
import { Noto_Sans_Georgian, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/navigation/TopNav";
import { Footer } from "@/components/navigation/Footer";

const body = Noto_Sans_Georgian({
  variable: "--font-body",
  subsets: ["latin", "georgian"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Cipruli — ციფრული ნამუშევრების ბაზარი",
    template: "%s · Cipruli",
  },
  description:
    "Cipruli.store — ქართული ციფრული ბაზარი პრომპტებისა და ციფრული ნამუშევრებისთვის. შექმენი, გაყიდე, აღმოაჩინე.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Cipruli.store",
    description: "ქართული ციფრული ბაზარი პრომპტებისა და ციფრული ნამუშევრებისთვის.",
    locale: "ka_GE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ka"
      className={`${body.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col bg-[var(--bg-0)] text-[var(--fg)]">
        <TopNav />
        <main className="flex-1 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
