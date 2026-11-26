import type { Localized } from "./content";
import type { FoodProduct } from "./menu-food-types";

const nutrientLabels: readonly Localized[] = [
  { ro: "Valoare energetică", en: "Energy" },
  { ro: "Grăsimi", en: "Fat" },
  { ro: "din care acizi grași saturați", en: "of which saturates" },
  { ro: "Glucide", en: "Carbohydrate" },
  { ro: "din care zaharuri", en: "of which sugars" },
  { ro: "Proteine", en: "Protein" },
  { ro: "Sare", en: "Salt" },
];

function nutritionPer100g(energy: Localized, grams: readonly [string, string, string, string, string, string]) {
  const values = [
    energy,
    ...grams.map((value) => ({ ro: `${value.replace(".", ",")} g`, en: `${value} g` })),
  ];

  return {
    basis: "100g" as const,
    rows: nutrientLabels.map((label, index) => ({ label, value: values[index] })),
  };
}

// Source: Aperitivo_fise_produse_sandwichuri_client.pdf, pages 1–3.
export const sandwichProducts: readonly FoodProduct[] = [
  {
    id: "focaccia-pollo",
    name: { ro: "Focaccia Pollo", en: "Focaccia Pollo" },
    portionG: 275,
    ingredients: {
      ro: "Focaccia, șnițel de pui, mozzarella, cremă de brânză Philadelphia, rucola.",
      en: "Focaccia, chicken schnitzel, mozzarella, Philadelphia cream cheese, rocket.",
    },
    contains: { ro: "Gluten (grâu), lapte, ouă.", en: "Gluten (wheat), milk, eggs." },
    nutrition: nutritionPer100g(
      { ro: "1.067 kJ / 255 kcal", en: "1,067 kJ / 255 kcal" },
      ["12.9", "5.2", "23.4", "2.4", "11.8", "1.0"],
    ),
  },
  {
    id: "focaccia-caprese",
    name: { ro: "Focaccia Caprese", en: "Focaccia Caprese" },
    portionG: 255,
    ingredients: {
      ro: "Focaccia, roșii, mozzarella, rucola, pesto.",
      en: "Focaccia, tomatoes, mozzarella, rocket, pesto.",
    },
    contains: { ro: "Gluten (grâu), lapte.", en: "Gluten (wheat), milk." },
    allergenNote: {
      ro: "Furnizorul indică posibilă prezență a fructelor cu coajă lemnoasă, în funcție de compoziția sosului pesto.",
      en: "The supplier notes that tree nuts may be present, depending on the pesto ingredients.",
    },
    nutrition: nutritionPer100g(
      { ro: "797 kJ / 190 kcal", en: "797 kJ / 190 kcal" },
      ["8.2", "3.4", "22.1", "2.5", "6.8", "0.8"],
    ),
  },
  {
    id: "focaccia-divino",
    name: { ro: "Focaccia Divino", en: "Focaccia Divino" },
    portionG: 210,
    ingredients: {
      ro: "Focaccia, mortadella cu fistic, cremă de brânză Philadelphia, salsa de trufe.",
      en: "Focaccia, pistachio mortadella, Philadelphia cream cheese, truffle salsa.",
    },
    contains: { ro: "Gluten (grâu), lapte, fistic.", en: "Gluten (wheat), milk, pistachios." },
    nutrition: nutritionPer100g(
      { ro: "1.207 kJ / 289 kcal", en: "1,207 kJ / 289 kcal" },
      ["16.1", "6.2", "25.9", "2.8", "9.4", "1.5"],
    ),
  },
];
