import { createClient } from "@sanity/client";

export type Locale = "en" | "ro";
export type Localized = { en: string; ro: string };
export type MenuItem = {
  _key: string;
  name: Localized;
  description?: Localized;
  price: number;
};
export type CafeContent = {
  heroTitle: Localized;
  heroText: Localized;
  storyTitle: Localized;
  storyText: Localized;
  coffeeText: Localized;
  retailText: Localized;
  address: string;
  postalCode: string;
  weekdayHours: string;
  weekendHours: string;
  instagram: string;
  facebook: string;
  maps: string;
  menu: MenuItem[];
};
export const defaultContent: CafeContent = {
  heroTitle: {
    en: "A little hidden.\nEasy to love.",
    ro: "Puțin ascuns.\nUșor de iubit.",
  },
  heroText: {
    en: "Specialty coffee. A brighter moment. Your little place in the heart of Bucharest.",
    ro: "Cafea de specialitate. Un moment frumos. Micul tău loc din inima Bucureștiului.",
  },
  storyTitle: {
    en: "Your cosy\ncity hideaway.",
    ro: "Colțul tău\nde liniște.",
  },
  storyText: {
    en: "Step inside and feel the city soften. Sunlight through tall windows, leafy plants, textured brick and the warmth of a small, personal café. A cosy, calming corner for good conversations, a quiet chapter and another beautiful cup.",
    ro: "Intră și lasă agitația orașului la ușă. Lumină prin ferestre înalte, plante, cărămidă cu textură și căldura unei cafenele mici și personale. Un colț intim și liniștitor pentru conversații, câteva pagini și încă o cafea bună.",
  },
  coffeeText: {
    en: "From Cluj-Napoca to your favourite corner of Bucharest. We serve specialty coffee from MERON, roasted in Transylvania to bring out the character of each origin. Carefully made at our bar, ready to make your day.",
    ro: "Din Cluj-Napoca în colțul tău preferat din București. Servim cafea de specialitate MERON, prăjită în Transilvania pentru a pune în valoare caracterul fiecărei origini. Pregătită cu grijă la barul nostru, pentru o zi mai frumoasă.",
  },
  retailText: {
    en: "Zăganu, Grivița and Miedăria beers, plus Sipit drinks. PEBBLE mugs for your morning ritual. Snacks for later. There’s a little more to discover at the counter.",
    ro: "Bere Zăganu, Grivița și Miedăria, plus băuturi Sipit. Căni PEBBLE pentru ritualul de dimineață. Gustări pentru mai târziu. Le găsești pe toate la bar.",
  },
  address: "Str. D. I. Mendeleev 10",
  postalCode: "030167",
  weekdayHours: "09:00–18:00",
  weekendHours: "10:00–19:00",
  instagram: "https://www.instagram.com/pebble.bucharest/",
  facebook: "https://www.facebook.com/profile.php?id=61569199823551",
  maps: "https://www.google.com/maps/search/?api=1&query=Pebble+Bucharest",
  menu: [],
};
const localFields = [
  "heroTitle",
  "heroText",
  "storyTitle",
  "storyText",
  "coffeeText",
  "retailText",
] as const;
const stringFields = [
  "address",
  "postalCode",
  "weekdayHours",
  "weekendHours",
] as const;
const urlFields = ["instagram", "facebook", "maps"] as const;
export function normalizeContent(
  input: Partial<CafeContent> | null,
): CafeContent {
  const result = structuredClone(defaultContent);
  if (!input) return result;
  for (const field of localFields)
    for (const lang of ["en", "ro"] as const) {
      const value = input[field]?.[lang];
      if (typeof value === "string" && value.trim())
        result[field][lang] = value;
    }
  for (const field of stringFields)
    if (typeof input[field] === "string" && input[field]?.trim())
      result[field] = input[field];
  for (const field of urlFields) {
    const value = input[field];
    if (typeof value === "string") {
      try {
        const url = new URL(value);
        if (url.protocol === "https:") result[field] = value;
      } catch {}
    }
  }
  result.menu = Array.isArray(input.menu)
    ? input.menu.filter(
        (item) =>
          item &&
          item.name?.en &&
          item.name?.ro &&
          typeof item.price === "number" &&
          Number.isFinite(item.price) &&
          item.price >= 0,
      )
    : [];
  return result;
}
export async function getCafeContent(): Promise<CafeContent> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset) return structuredClone(defaultContent);
  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion: "2026-09-14",
      useCdn: true,
      timeout: 5000,
      maxRetries: 1,
    });
    const data = await client.fetch<Partial<CafeContent> | null>(
      '*[_type == "cafeSettings"] | order(_updatedAt desc)[0]{heroTitle,heroText,storyTitle,storyText,coffeeText,retailText,address,postalCode,weekdayHours,weekendHours,instagram,facebook,maps,menu}',
      {},
      { next: { revalidate: 60 } },
    );
    return normalizeContent(data);
  } catch {
    console.error(
      "PEBBLE: Sanity content unavailable; using the local café content.",
    );
    return structuredClone(defaultContent);
  }
}
