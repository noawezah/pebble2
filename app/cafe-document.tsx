import type { Metadata } from "next";
import localFont from "next/font/local";
import type { Locale } from "@/lib/content";
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

const sharedMetadata: Metadata = {
  ...(siteOrigin() ? { metadataBase: new URL(siteOrigin()!) } : {}),
  icons: { icon: "/images/snail.svg" },
};

export const cafeMetadata: Record<Locale, Metadata> = {
  ro: {
    ...sharedMetadata,
    title: "PEBBLE — Cafea de specialitate, București",
    description:
      "Puțin ascuns. Ușor de iubit. Cafea MERON, plante și o atmosferă primitoare la PEBBLE, Mendeleev 10, București.",
  },
  en: {
    ...sharedMetadata,
    title: "PEBBLE — Specialty coffee, Bucharest",
    description:
      "A little hidden. Easy to love. MERON specialty coffee, plants and a welcoming atmosphere at PEBBLE, Mendeleev 10, Bucharest.",
  },
};

export default function CafeDocument({
  children,
  locale,
}: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  return (
    <html lang={locale} className={hurme.variable}>
      <body>{children}</body>
    </html>
  );
}
