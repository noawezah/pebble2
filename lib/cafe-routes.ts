import type { Metadata } from "next";
import type { Locale } from "@/lib/content";
import { siteOrigin } from "@/lib/site-origin";

export const cafeRoutes = {
  home: { ro: "/", en: "/en" },
  menu: { ro: "/meniu", en: "/en/menu" },
} as const;

export type CafePage = keyof typeof cafeRoutes;

export function cafeAlternates(
  locale: Locale,
  page: CafePage,
): Metadata["alternates"] {
  const origin = siteOrigin();
  if (!origin) return undefined;
  const { ro, en } = cafeRoutes[page];
  return {
    canonical: new URL(cafeRoutes[page][locale], origin),
    languages: {
      ro: new URL(ro, origin),
      en: new URL(en, origin),
      "x-default": new URL(ro, origin),
    },
  };
}
