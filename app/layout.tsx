import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAD Crew",
  description:
    "Hands-on CAD for kids — July 13–23, 2026, Mon–Thu, 90-minute sessions at the library.",
  icons: {
    icon: [{ url: "/cadcrew-logo.png", type: "image/png" }],
    apple: "/cadcrew-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body
        className={`${inter.className} flex min-h-full flex-col bg-[var(--background)] text-[var(--foreground)] antialiased text-base sm:text-[1.0625rem]`}
      >
        <SiteHeader />
        <main className="animate-fade-in motion-reduce:animate-none flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
