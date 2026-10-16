import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteOrigin } from "@/lib/site-origin";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/dm-sans";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import "./cafe.css";
import "./motion.css";
import "./intro.css";
const hurme = localFont({
  src: [
    {
      path: "./fonts/hurme-geometric-sans-1-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/hurme-geometric-sans-1-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/hurme-geometric-sans-1-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hurme",
  display: "swap",
  fallback: ["DM Sans Variable", "Arial"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  ...(siteOrigin() ? { metadataBase: new URL(siteOrigin()!) } : {}),
  title: "PEBBLE — Specialty coffee, Bucharest",
  description:
    "A little hidden. Easy to love. MERON specialty coffee, plants and a welcoming atmosphere at PEBBLE, Mendeleev 10, Bucharest.",
  icons: { icon: "/images/snail.svg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={hurme.variable}>
      <body>{children}</body>
    </html>
  );
}
