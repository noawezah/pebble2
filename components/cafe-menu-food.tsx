"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import type { Locale } from "@/lib/content";
import type { FoodNutrition, FoodProduct } from "@/lib/menu-food-types";
import styles from "./cafe-menu.module.css";

const copy = {
  ro: {
    close: "Închide detaliile",
    details: "Alergeni și valori nutriționale",
    allergens: "Alergeni",
    contains: "Conține",
    declared: "Alergeni declarați de furnizor",
    per100g: "Per 100 g",
    perPortion: "Per porție",
    ingredients: "Ingrediente",
    nutrition: "Valori nutriționale",
    missingNutrition: "Valorile nutriționale nu sunt disponibile momentan.",
    counter: "Dacă ai o alergie, confirmă ingredientele și riscul de contaminare încrucișată la tejghea.",
  },
  en: {
    close: "Close details",
    details: "Allergens and nutrition",
    allergens: "Allergens",
    contains: "Contains",
    declared: "Allergens listed by the supplier",
    per100g: "Per 100 g",
    perPortion: "Per serving",
    ingredients: "Ingredients",
    nutrition: "Nutrition information",
    missingNutrition: "Nutrition information is currently unavailable.",
    counter: "If you have an allergy, check ingredients and cross-contact with the staff at the counter.",
  },
};

function NutritionTable({ nutrition, locale }: { nutrition: FoodNutrition; locale: Locale }) {
  const t = copy[locale];

  return (
    <table className={styles.nutritionTable}>
      <caption>{nutrition.basis === "100g" ? t.per100g : t.perPortion}</caption>
      <tbody>
        {nutrition.rows.map(({ label, value }) => (
          <tr key={label.en}>
            <th scope="row">{label[locale]}</th>
            <td>{value[locale]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function CafeMenuFood({ locale, groups, rail }: {
  locale: Locale;
  groups: readonly { title: string; products: readonly FoodProduct[] }[];
  rail: ReactNode;
}) {
  const t = copy[locale];
  const [product, setProduct] = useState<FoodProduct | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const formatGrams = new Intl.NumberFormat(locale === "ro" ? "ro-RO" : "en-GB", {
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (product && dialog && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    }
  }, [product]);

  function openProduct(item: FoodProduct, event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setProduct(item);
  }

  function closeProduct() {
    setProduct(null);
    triggerRef.current?.focus({ preventScroll: true });
    triggerRef.current = null;
  }

  function dismissBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const { left, top, right, bottom } = event.currentTarget.getBoundingClientRect();
    if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
      event.currentTarget.close();
    }
  }

  return (
    <>
      <div className={styles.foodGroups}>
        {groups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3>{group.title}</h3>
            <ul className={styles.items} role="list">
              {group.products.map((item) => (
                <li key={item.id}>
                  <button
                    className={styles.foodTrigger}
                    type="button"
                    aria-haspopup="dialog"
                    aria-describedby="food-detail-description"
                    onClick={(event) => openProduct(item, event)}
                  >
                    <span>{item.name[locale]}</span>
                    <i className="ri-arrow-right-up-line" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <span id="food-detail-description" className="sr-only">{t.details}</span>

      <dialog
        ref={dialogRef}
        className={`${styles.island} ${styles.foodDialog}`}
        aria-labelledby={product ? "food-detail-title" : undefined}
        onClose={closeProduct}
        onClick={dismissBackdrop}
      >
        {product && (
          <>
            <form className={styles.closeBar} method="dialog">
              <button className={styles.closeFood} type="submit" aria-label={t.close}>
                <i className="ri-close-line" aria-hidden="true" />
              </button>
            </form>
            {rail}
            <div className={styles.foodDetailContent}>
              <h2 id="food-detail-title">{product.name[locale]}</h2>
              {product.portionG !== undefined && (
                <p className={styles.serving}>{t.perPortion} · {formatGrams.format(product.portionG)} g</p>
              )}
              <section className={styles.allergenBox} aria-labelledby="food-allergens-title">
                <h3 id="food-allergens-title">{t.allergens}</h3>
                <p><strong>{t.contains}:</strong> {product.contains[locale]}</p>
                {product.declaredAllergens && <p><strong>{t.declared}:</strong> {product.declaredAllergens[locale]}</p>}
                {product.allergenNote && <p>{product.allergenNote[locale]}</p>}
                <p className={styles.allergenReminder}>{t.counter}</p>
              </section>
              <section aria-labelledby="food-nutrition-title">
                <h3 id="food-nutrition-title">{t.nutrition}</h3>
                <div className={styles.nutritionTables}>
                  {product.nutrition || product.nutritionPerPortion ? (
                    <>
                      {product.nutrition && <NutritionTable nutrition={product.nutrition} locale={locale} />}
                      {product.nutritionPerPortion && <NutritionTable nutrition={product.nutritionPerPortion} locale={locale} />}
                    </>
                  ) : <p>{t.missingNutrition}</p>}
                </div>
              </section>
              {product.ingredients && (
                <section aria-labelledby="food-ingredients-title">
                  <h3 id="food-ingredients-title">{t.ingredients}</h3>
                  <p>{product.ingredients[locale]}</p>
                </section>
              )}
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
