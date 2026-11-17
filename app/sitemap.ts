import type { MetadataRoute } from "next";
import { cafeRoutes } from "@/lib/cafe-routes";
import { siteOrigin } from "@/lib/site-origin";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return Object.values(cafeRoutes).flatMap(({ ro, en }) => {
    const languages = {
      ro: new URL(ro, origin).href,
      en: new URL(en, origin).href,
      "x-default": new URL(ro, origin).href,
    };
    return [languages.ro, languages.en].map((url) => ({
      url,
      alternates: { languages },
    }));
  });
}
