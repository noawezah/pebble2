import type { Localized } from "./content";
import type { FoodProduct } from "./menu-food-types";

const localized = (ro: string, en: string): Localized => ({ ro, en });
const productName = (name: string) => localized(name, name);

const nutrientLabels = {
  energy: localized("Valoare energetică", "Energy"),
  fat: localized("Grăsimi", "Fat"),
  saturatedFat: localized("Din care acizi grași saturați", "Of which saturates"),
  carbohydrates: localized("Glucide", "Carbohydrate"),
  sugars: localized("Din care zaharuri", "Of which sugars"),
  fibre: localized("Fibre", "Fibre"),
  protein: localized("Proteine", "Protein"),
  salt: localized("Sare", "Salt"),
};

type Nutrient = keyof typeof nutrientLabels;
type ArchiveNutrition = NonNullable<FoodProduct["nutrition"]>;

function nutrition(
  basis: ArchiveNutrition["basis"],
  energy: readonly [kJ: string, kcal: string],
  grams: Record<Exclude<Nutrient, "energy" | "fibre">, string> & { fibre?: string },
): ArchiveNutrition {
  const values = { energy: `${energy[0]} kJ / ${energy[1]} kcal`, ...grams };
  const rows = (Object.keys(nutrientLabels) as Nutrient[]).flatMap((nutrient) => {
    const value = values[nutrient];
    if (value === undefined) return [];
    const amount = nutrient === "energy" ? value : `${value} g`;
    return [{ label: nutrientLabels[nutrient], value: localized(amount.replaceAll(".", ","), amount) }];
  });
  return { basis, rows };
}

const cookieBaseContains = localized("Grâu (gluten), lapte, ouă, soia", "Wheat (gluten), milk, eggs, soy");
const cookieEquipment = localized(
  "Furnizorul declară că aceste fursecuri sunt preparate pe echipamente comune care procesează lapte, arahide, soia, fructe cu coajă lemnoasă și grâu.",
  "The supplier makes these cookies on shared equipment that processes milk, peanuts, soy, tree nuts and wheat.",
);
const cookieDeclaredAllergens = localized(
  "Lapte, ouă, soia, grâu, arahide și fructe cu coajă lemnoasă.",
  "Milk, eggs, soy, wheat, peanuts and tree nuts.",
);

// Supplier sheets in `produse + alergeni.zip`. Cookie ingredient lists identify
// what the recipes contain. The supplier lists allergens and shared equipment separately.
export const archiveProducts: readonly FoodProduct[] = [
  {
    id: "salty-kiss",
    name: productName("Salty Kiss"),
    contains: cookieBaseContains,
    declaredAllergens: cookieDeclaredAllergens,
    allergenNote: cookieEquipment,
    ingredients: localized(
      "Făină, ciocolată neagră [masă de cacao, zahăr, unt de cacao, emulsifiant: lecitină de soia (E322), aromă naturală de vanilie; substanță uscată de cacao 54,5%; poate conține lapte], ciocolată cu lapte [zahăr, unt de cacao, lapte praf integral, masă de cacao, emulsifiant: lecitină de soia (E322), aromă naturală de vanilie; substanță uscată de cacao 33,6%], zahăr, unt, ouă pasteurizate [ou întreg de găină, corector de aciditate: acid citric (E330)], amidon, praf de copt, bicarbonat de sodiu, sare.",
      "Flour, dark chocolate [cocoa mass, sugar, cocoa butter, emulsifier: soy lecithin (E322), natural vanilla flavouring; 54.5% cocoa solids; may contain milk], milk chocolate [sugar, cocoa butter, whole milk powder, cocoa mass, emulsifier: soy lecithin (E322), natural vanilla flavouring; 33.6% cocoa solids], sugar, butter, pasteurised eggs [whole hen's egg, acidity regulator: citric acid (E330)], starch, baking powder, sodium bicarbonate, salt.",
    ),
    nutrition: nutrition("100g", ["1915.96", "457.93"], {
      fat: "23.30", saturatedFat: "11.62", carbohydrates: "56.51", sugars: "28.93", fibre: "0.83", protein: "5.31", salt: "0.12",
    }),
  },
  {
    id: "pistachio-fever",
    name: productName("Pistachio Fever"),
    contains: localized("Grâu (gluten), lapte, ouă, soia, fistic", "Wheat (gluten), milk, eggs, soy, pistachios"),
    declaredAllergens: cookieDeclaredAllergens,
    allergenNote: cookieEquipment,
    ingredients: localized(
      "Făină, ciocolată cu lapte [zahăr, unt de cacao, lapte praf integral, masă de cacao, emulsifiant: lecitină de soia (E322), aromă naturală de vanilie; substanță uscată de cacao 33,6%], ciocolată albă [zahăr, unt de cacao, lapte praf integral, emulsifiant: lecitină de soia (E322), aromă naturală de vanilie; substanță uscată de cacao min. 32%], zahăr, unt, ouă pasteurizate [ou întreg de găină, corector de aciditate: acid citric (E330)], fistic, pastă de fistic (100% fistic copt), cremă de ciocolată albă [zahăr, uleiuri și grăsimi vegetale (floarea-soarelui, palmier), lapte praf (17%), ciocolată albă 10% (zahăr, unt de cacao, lapte praf), lapte praf degresat (5%), lactoză (din lapte), emulsifiant (lecitină), arome], amidon, praf de copt, bicarbonat de sodiu, sare.",
      "Flour, milk chocolate [sugar, cocoa butter, whole milk powder, cocoa mass, emulsifier: soy lecithin (E322), natural vanilla flavouring; 33.6% cocoa solids], white chocolate [sugar, cocoa butter, whole milk powder, emulsifier: soy lecithin (E322), natural vanilla flavouring; at least 32% cocoa solids], sugar, butter, pasteurised eggs [whole hen's egg, acidity regulator: citric acid (E330)], pistachios, pistachio paste (100% roasted pistachios), white chocolate cream [sugar, vegetable oils and fats (sunflower, palm), milk powder (17%), white chocolate 10% (sugar, cocoa butter, milk powder), skimmed milk powder (5%), lactose (from milk), emulsifier (lecithin), flavourings], starch, baking powder, sodium bicarbonate, salt.",
    ),
    nutrition: nutrition("100g", ["1912", "457"], {
      fat: "24.9", saturatedFat: "12.6", carbohydrates: "51.1", sugars: "26.5", fibre: "2.6", protein: "7.2", salt: "0.22",
    }),
  },
  {
    id: "caramel-pecan",
    name: productName("Caramel Pecan"),
    contains: localized("Grâu (gluten), lapte, ouă, soia, nuci pecan", "Wheat (gluten), milk, eggs, soy, pecans"),
    declaredAllergens: cookieDeclaredAllergens,
    allergenNote: cookieEquipment,
    ingredients: localized(
      "Făină, unt, zahăr, ciocolată cu lapte și caramel 31,7% (zahăr 37,0%; unt de cacao 26,5%; lapte praf integral 25,9%; masă de cacao 6,5%; lapte praf degresat 2,0%; zahăr caramelizat 1,5%; emulsifiant: lecitină de soia), nuci pecan, ouă pasteurizate (ou întreg de găină, corector de aciditate: acid citric), amidon, praf de copt, bicarbonat de sodiu, sare.",
      "Flour, butter, sugar, milk chocolate with caramel 31.7% (sugar 37.0%; cocoa butter 26.5%; whole milk powder 25.9%; cocoa mass 6.5%; skimmed milk powder 2.0%; caramelised sugar 1.5%; emulsifier: soy lecithin), pecans, pasteurised eggs (whole hen's egg, acidity regulator: citric acid), starch, baking powder, sodium bicarbonate, salt.",
    ),
    nutrition: nutrition("100g", ["1891.71", "452"], {
      fat: "22.35", saturatedFat: "12.37", carbohydrates: "55.6", sugars: "26.81", fibre: "3.1", protein: "6.6", salt: "0.31",
    }),
  },
  {
    id: "snickers-bomb",
    name: productName("Snickers Bomb"),
    contains: localized("Grâu (gluten), lapte, ouă, soia, arahide", "Wheat (gluten), milk, eggs, soy, peanuts"),
    declaredAllergens: cookieDeclaredAllergens,
    allergenNote: cookieEquipment,
    ingredients: localized(
      "Făină, ciocolată cu lapte [zahăr, unt de cacao, lapte praf integral, masă de cacao, emulsifiant: lecitină de soia (E322), aromă naturală de vanilie; substanță uscată de cacao 33,6%], arahide, zahăr, unt, ouă pasteurizate [ou întreg de găină, corector de aciditate: acid citric (E330)], unt de arahide, Snickers [zahăr, sirop de glucoză, arahide, lapte praf degresat, unt de cacao, masă de cacao, ulei de floarea-soarelui, lactoză, pudră de zer (din lapte), grăsimi din lapte, grăsime de palmier, sare, lecitină de soia, pudră de albuș de ou, proteine din lapte, extract natural de vanilie], amidon, praf de copt, bicarbonat de sodiu, sare.",
      "Flour, milk chocolate [sugar, cocoa butter, whole milk powder, cocoa mass, emulsifier: soy lecithin (E322), natural vanilla flavouring; 33.6% cocoa solids], peanuts, sugar, butter, pasteurised eggs [whole hen's egg, acidity regulator: citric acid (E330)], peanut butter, Snickers [sugar, glucose syrup, peanuts, skimmed milk powder, cocoa butter, cocoa mass, sunflower oil, lactose, whey powder (from milk), milk fat, palm fat, salt, soy lecithin, egg white powder, milk proteins, natural vanilla extract], starch, baking powder, sodium bicarbonate, salt.",
    ),
    nutrition: nutrition("100g", ["1932", "464"], {
      fat: "26.2", saturatedFat: "12.00", carbohydrates: "50.4", sugars: "21.8", fibre: "3", protein: "8.2", salt: "0.12",
    }),
  },
  {
    id: "bloody-cookie",
    name: productName("Bloody Cookie"),
    // The ingredient list specifies black sesame paste even though the allergen summary omits sesame.
    contains: localized("Grâu (gluten), lapte, ouă, soia, nuci, susan", "Wheat (gluten), milk, eggs, soy, walnuts, sesame"),
    declaredAllergens: cookieDeclaredAllergens,
    allergenNote: cookieEquipment,
    ingredients: localized(
      "Făină, ciocolată neagră [masă de cacao, zahăr, unt de cacao, emulsifiant: lecitină de soia (E322), aromă naturală de vanilie; substanță uscată de cacao 54,5%; poate conține lapte], ciocolată cu lapte [zahăr, unt de cacao, lapte praf integral, masă de cacao, emulsifiant: lecitină de soia (E322), aromă naturală de vanilie; substanță uscată de cacao 33,6%], zahăr, unt, ouă pasteurizate [ou întreg de găină, corector de aciditate: acid citric (E330)], cacao, colivă [arpacaș din grâu, pastă de susan negru, apă, zahăr, nucă, extract pur de portocală și lămâie, coajă de lămâie și portocală confiată, esențe de vanilie și rom, fructe de pădure, pectină], amidon, praf de copt, bicarbonat de sodiu, sare.",
      "Flour, dark chocolate [cocoa mass, sugar, cocoa butter, emulsifier: soy lecithin (E322), natural vanilla flavouring; 54.5% cocoa solids; may contain milk], milk chocolate [sugar, cocoa butter, whole milk powder, cocoa mass, emulsifier: soy lecithin (E322), natural vanilla flavouring; 33.6% cocoa solids], sugar, butter, pasteurised eggs [whole hen's egg, acidity regulator: citric acid (E330)], cocoa, colivă [pearled wheat, black sesame paste, water, sugar, walnuts, pure orange and lemon extract, candied lemon and orange peel, vanilla and rum essences, berries, pectin], starch, baking powder, sodium bicarbonate, salt.",
    ),
    nutrition: nutrition("100g", ["1850", "442"], {
      fat: "23.5", saturatedFat: "11.5", carbohydrates: "49.5", sugars: "26", fibre: "2.5", protein: "6.5", salt: "0.4",
    }),
  },
  {
    id: "carrot-cake",
    name: localized("Prăjitură cu morcovi, nuci și scorțișoară", "Carrot cake with walnuts and cinnamon"),
    portionG: 99.6,
    contains: localized("Grâu (gluten), ouă, lapte, nuci", "Wheat (gluten), eggs, milk, walnuts"),
    ingredients: localized(
      "Zahăr (21 g), ulei de floarea-soarelui (16 ml), lapte (16 ml), morcov (13 g), făină de grâu (13 g), nuci (7,90 g), ou (5,20 g), albuș de ou (4,80 g), gălbenuș de ou (1,60 g), praf de copt (0,60 g), scorțișoară (0,30 g), nucșoară (0,10 g), sare (0,10 g).",
      "Sugar (21 g), sunflower oil (16 ml), milk (16 ml), carrot (13 g), wheat flour (13 g), walnuts (7.90 g), egg (5.20 g), egg white (4.80 g), egg yolk (1.60 g), baking powder (0.60 g), cinnamon (0.30 g), nutmeg (0.10 g), salt (0.10 g).",
    ),
    nutrition: nutrition("100g", ["1501.3", "360.1"], {
      fat: "22.9", saturatedFat: "2.8", carbohydrates: "32.8", sugars: "22.9", protein: "4.7", salt: "0.3",
    }),
    nutritionPerPortion: nutrition("portion", ["1495.3", "358.7"], {
      fat: "22.8", saturatedFat: "2.8", carbohydrates: "32.7", sugars: "22.8", protein: "4.7", salt: "0.3",
    }),
  },
  {
    id: "chocolate-cake",
    name: localized("Prăjitură cu ciocolată", "Chocolate cake"),
    portionG: 83.3,
    contains: localized("Grâu (gluten), ouă, lapte", "Wheat (gluten), eggs, milk"),
    ingredients: localized(
      "Făină de grâu (16 g), lapte (16 g), ulei de floarea-soarelui (16 g), zahăr (16 g), albuș de ou (8,70 g), gălbenuș de ou (5 g), pudră de cacao (3,90 g), glazură de ciocolată (1 g), praf de copt (0,60 g), sare (0,10 g).",
      "Wheat flour (16 g), milk (16 g), sunflower oil (16 g), sugar (16 g), egg white (8.70 g), egg yolk (5 g), cocoa powder (3.90 g), chocolate glaze (1 g), baking powder (0.60 g), salt (0.10 g).",
    ),
    nutrition: nutrition("100g", ["1580.8", "378.7"], {
      fat: "23.5", saturatedFat: "4", carbohydrates: "37.2", sugars: "20.9", protein: "5.9", salt: "0.4",
    }),
    nutritionPerPortion: nutrition("portion", ["1316.8", "315.5"], {
      fat: "19.6", saturatedFat: "3.4", carbohydrates: "31", sugars: "17.4", protein: "4.9", salt: "0.3",
    }),
  },
];
