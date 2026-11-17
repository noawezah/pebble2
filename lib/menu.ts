import type { Localized } from "./content";

export type DrinkMenuItem = {
  id: string;
  name: Localized;
  price: number;
  volumeMl?: number;
  shots?: 1 | 2;
  ingredients?: Localized;
};

export type DrinkMenuGroup = {
  id: "coffee" | "other-drinks" | "aperitivo" | "cocktails";
  title: Localized;
  items: readonly DrinkMenuItem[];
};

const sharedName = (name: string): Localized => ({ ro: name, en: name });

// Transcribed from PEBBLE's supplied drinks board and printed cocktail menu.
// The printed menu gives volumes for the spritzes only; other measures below
// belong to individual cocktail ingredients, not to the finished drinks.
export const menuGroups: readonly DrinkMenuGroup[] = [
  {
    id: "coffee",
    title: { ro: "Cafea", en: "Coffee" },
    items: [
      { id: "espresso", name: sharedName("Espresso"), price: 12, volumeMl: 20, shots: 1 },
      {
        id: "double-espresso",
        name: { ro: "Espresso dublu", en: "Double espresso" },
        price: 14,
        volumeMl: 40,
        shots: 2,
      },
      { id: "cortado", name: sharedName("Cortado"), price: 15, volumeMl: 80, shots: 1 },
      { id: "long-black", name: sharedName("Long black"), price: 15, volumeMl: 180, shots: 2 },
      { id: "cappuccino", name: sharedName("Cappuccino"), price: 17, volumeMl: 180, shots: 1 },
      { id: "flat-white", name: sharedName("Flat white"), price: 19, volumeMl: 250, shots: 2 },
      { id: "latte", name: sharedName("Latte"), price: 20, volumeMl: 300, shots: 2 },
      { id: "cold-brew", name: sharedName("Cold brew"), price: 20, volumeMl: 150 },
      { id: "cold-brew-latte", name: sharedName("Cold brew latte"), price: 21, volumeMl: 300 },
      { id: "mocha-latte", name: sharedName("Mocha latte"), price: 20, volumeMl: 250, shots: 1 },
    ],
  },
  {
    id: "other-drinks",
    title: { ro: "Alte băuturi", en: "Other drinks" },
    items: [
      {
        id: "hot-lemon-ginger",
        name: { ro: "Băutură caldă cu lămâie și ghimbir", en: "Hot lemon & ginger" },
        price: 20,
        volumeMl: 300,
      },
      { id: "tea", name: { ro: "Ceai", en: "Tea" }, price: 20, volumeMl: 300 },
      {
        id: "hot-chocolate",
        name: { ro: "Ciocolată caldă", en: "Hot chocolate" },
        price: 22,
        volumeMl: 250,
      },
      {
        id: "chicory-latte",
        name: { ro: "Cicoare latte", en: "Chicory latte" },
        price: 15,
        volumeMl: 300,
      },
      { id: "lemonade", name: { ro: "Limonadă", en: "Lemonade" }, price: 22, volumeMl: 380 },
      { id: "hot-milk", name: { ro: "Lapte cald", en: "Warm milk" }, price: 10, volumeMl: 250 },
      { id: "matcha-latte", name: sharedName("Matcha latte"), price: 28, volumeMl: 300 },
      { id: "velvet-splash-latte", name: sharedName("Velvet splash latte"), price: 27, volumeMl: 300 },
    ],
  },
  {
    id: "aperitivo",
    title: sharedName("Aperitivo"),
    items: [
      {
        id: "aperol-spritz",
        name: sharedName("Aperol Spritz"),
        price: 35,
        volumeMl: 250,
        ingredients: {
          ro: "Aperol, Prosecco Grande Vento, apă minerală, felie de portocală, gheață",
          en: "Aperol, Grande Vento Prosecco, sparkling water, orange slice, ice",
        },
      },
      {
        id: "campari-spritz",
        name: sharedName("Campari Spritz"),
        price: 35,
        volumeMl: 250,
        ingredients: {
          ro: "Campari, Prosecco Grande Vento, apă minerală, felie de portocală, gheață",
          en: "Campari, Grande Vento Prosecco, sparkling water, orange slice, ice",
        },
      },
      {
        id: "crodino-spritz",
        name: sharedName("Crodino Spritz"),
        price: 35,
        volumeMl: 100,
        ingredients: {
          ro: "Crodino, apă minerală, felie de portocală, gheață",
          en: "Crodino, sparkling water, orange slice, ice",
        },
      },
    ],
  },
  {
    id: "cocktails",
    title: { ro: "Gin și cocktailuri", en: "Gin & cocktails" },
    items: [
      {
        id: "tanqueray-dry-tonic",
        name: sharedName("Tanqueray Dry & Tonic"),
        price: 38,
        ingredients: {
          ro: "Tanqueray London Dry (40 ml), apă tonică San Pellegrino, lime",
          en: "Tanqueray London Dry (40 ml), San Pellegrino tonic, lime",
        },
      },
      {
        id: "tanqueray-royale-tonic",
        name: sharedName("Tanqueray Royale & Tonic"),
        price: 38,
        ingredients: {
          ro: "Tanqueray Royale (40 ml), apă tonică San Pellegrino, lime și afine",
          en: "Tanqueray Royale (40 ml), San Pellegrino tonic, lime and blueberry",
        },
      },
      {
        id: "tanqueray-sevilla-tonic",
        name: sharedName("Tanqueray Sevilla & Tonic"),
        price: 38,
        ingredients: {
          ro: "Tanqueray Sevilla (40 ml), apă tonică San Pellegrino, felie de portocală",
          en: "Tanqueray Sevilla (40 ml), San Pellegrino tonic, orange slice",
        },
      },
      {
        id: "tanqueray-rangpur-tonic",
        name: sharedName("Tanqueray Rangpur & Tonic"),
        price: 38,
        ingredients: {
          ro: "Tanqueray Rangpur (40 ml), apă tonică San Pellegrino, felie de lime",
          en: "Tanqueray Rangpur (40 ml), San Pellegrino tonic, lime slice",
        },
      },
      {
        id: "gin-and-drive",
        name: sharedName("Gin and Drive"),
        price: 38,
        ingredients: {
          ro: "Tanqueray 0,0% (40 ml), apă tonică San Pellegrino, lime sau fructe",
          en: "Tanqueray 0.0% (40 ml), San Pellegrino tonic, lime or fruit",
        },
      },
      {
        id: "paloma",
        name: sharedName("Paloma"),
        price: 40,
        ingredients: {
          ro: "Don Julio Blanco (40 ml), băutură carbogazoasă Fever-Tree cu grepfrut, grepfrut proaspăt",
          en: "Don Julio Blanco (40 ml), Fever-Tree grapefruit soda, fresh grapefruit",
        },
      },
      {
        id: "negroni",
        name: sharedName("Negroni"),
        price: 40,
        ingredients: {
          ro: "Tanqueray London Dry (30 ml), Campari (30 ml), Cinzano Rosso 1757 (30 ml)",
          en: "Tanqueray London Dry (30 ml), Campari (30 ml), Cinzano Rosso 1757 (30 ml)",
        },
      },
      {
        id: "negroni-sbagliato",
        name: sharedName("Negroni Sbagliato"),
        price: 40,
        ingredients: {
          ro: "Tanqueray London Dry (30 ml), Cinzano Rosso 1757 (30 ml), Prosecco Grande Vento",
          en: "Tanqueray London Dry (30 ml), Cinzano Rosso 1757 (30 ml), Grande Vento Prosecco",
        },
      },
      {
        id: "disaronno-sour",
        name: sharedName("Disaronno Sour"),
        price: 35,
        ingredients: {
          ro: "Amaretto Disaronno (40 ml), suc de lămâie proaspăt stors (20 ml), sirop de zahăr (20 ml), cireașă Maraschino",
          en: "Amaretto Disaronno (40 ml), fresh lemon juice (20 ml), simple syrup (20 ml), Maraschino cherry",
        },
      },
    ],
  },
];
