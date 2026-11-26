import type { Localized } from "./content";

export type FoodNutrition = {
  basis: "100g" | "portion";
  rows: readonly { label: Localized; value: Localized }[];
};

export type FoodProduct = {
  id: string;
  name: Localized;
  portionG?: number;
  contains: Localized;
  declaredAllergens?: Localized;
  allergenNote?: Localized;
  ingredients?: Localized;
  ingredientsInDialog?: boolean;
  nutrition?: FoodNutrition;
  nutritionPerPortion?: FoodNutrition;
};
