import Link from "next/link";
import type { ReactNode } from "react";
import CafeHeader from "@/components/cafe-header";
import CafeMenuFood from "@/components/cafe-menu-food";
import CafeMenuIslands from "@/components/cafe-menu-islands";
import { SpotlightRail } from "@/components/spotlight-vine-rail";
import { cafeRoutes } from "@/lib/cafe-routes";
import type { Locale } from "@/lib/content";
import { menuGroups, type DrinkMenuGroup } from "@/lib/menu";
import { archiveProducts } from "@/lib/food-archive";
import { sandwichProducts } from "@/lib/food-sandwiches";
import styles from "./cafe-menu.module.css";

const copy = {
  ro: {
    cafe: "Înapoi la PEBBLE",
    skip: "Sari la conținut",
    contents: "Secțiunile meniului",
    index: { drinks: "Cafea", cocktails: "Cocktailuri", food: "Gustări" },
    drinks: "Cafea și alte băuturi",
    cocktails: "Cocktailuri",
    food: "Sandvișuri și gustări",
    foodNote: "Disponibilitatea variază. Vezi la tejghea ce avem astăzi.",
    sandwiches: "Sandvișuri",
    sweets: "Fursecuri și prăjituri",
    origin: "Întreabă barista despre originea cafelei folosite pentru espresso.",
    alternativeMilk: "Lapte de ovăz sau de mazăre (+4 lei).",
    legend: "O inimă = un shot de espresso.",
    shots: { 1: "1 shot de espresso", 2: "2 shoturi de espresso" },
  },
  en: {
    cafe: "Back to PEBBLE",
    skip: "Skip to content",
    contents: "Menu sections",
    index: { drinks: "Coffee", cocktails: "Cocktails", food: "Snacks" },
    drinks: "Coffee and other drinks",
    cocktails: "Cocktails",
    food: "Sandwiches and snacks",
    foodNote: "Availability varies. Check the counter to see what’s available today.",
    sandwiches: "Sandwiches",
    sweets: "Cookies and cakes",
    origin: "Ask the barista about the espresso origins.",
    alternativeMilk: "Oat milk or pea milk (+4 lei).",
    legend: "One heart = one espresso shot.",
    shots: { 1: "1 espresso shot", 2: "2 espresso shots" },
  },
};

const chapters = [
  { id: "drinks", groups: ["coffee", "other-drinks"], variant: 0 },
  { id: "cocktails", groups: ["aperitivo", "cocktails"], variant: 1 },
] as const;

function MenuIsland({ id, title, variant, children }: {
  id: "drinks" | "cocktails" | "food";
  title: string;
  variant: number;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} tabIndex={-1}>
      <div className={styles.island} data-menu-island={id}>
        <SpotlightRail className={styles.islandRail} variant={variant} compact />
        <div className={styles.islandContent}>
          <h2 id={`${id}-title`} className={styles.islandHeading}>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

function MenuGroup({ group, locale }: { group: DrinkMenuGroup; locale: Locale }) {
  const t = copy[locale];

  return (
    <div className={styles.group}>
      <h3>{group.title[locale]}</h3>
      <ul className={styles.items} role="list">
        {group.items.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.itemCopy}>
              <p className={styles.itemName}>{item.name[locale]}</p>
              {item.volumeMl || item.shots ? (
                <p className={styles.itemMeta}>
                  {item.volumeMl && <span>{item.volumeMl} ml</span>}
                  {item.shots && (
                    <>
                      <span className={styles.hearts} aria-hidden="true">{"♥".repeat(item.shots)}</span>
                      <span className="sr-only">{t.shots[item.shots]}</span>
                    </>
                  )}
                </p>
              ) : null}
              {item.ingredients && <p className={styles.ingredients}>{item.ingredients[locale]}</p>}
            </div>
            <p className={styles.price}>{item.price} <span>lei</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CafeMenu({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const home = cafeRoutes.home[locale];
  const grid = `pebble-pad seven-grid ${styles.grid}`;

  return (
    <div className={`cafe ${styles.menuPage}`}>
      <a className="skip-link" href="#menu-main">{t.skip}</a>
      <CafeHeader locale={locale} page="menu" />

      <main className={styles.menuMain} aria-labelledby="cafe-menu-title">
        <div className={grid}>
          <nav className={styles.index} aria-label={t.contents}>
            {chapters.map(({ id }) => <a href={`#${id}`} key={id}>{t.index[id]}</a>)}
            <a href="#food">{t.index.food}</a>
          </nav>
        </div>

        <CafeMenuIslands className={styles.viewport} label={t.contents}>
          <div className={grid}>
            <div id="menu-main" className={styles.deck} tabIndex={-1}>
              {chapters.map(({ id, groups, variant }) => (
                <MenuIsland key={id} id={id} title={t[id]} variant={variant}>
                  {id === "drinks" && (
                    <div className={styles.notes}>
                      <p>{t.origin}</p>
                      <p>{t.alternativeMilk}</p>
                      <p><span className={styles.hearts} aria-hidden="true">♥</span> {t.legend}</p>
                    </div>
                  )}
                  <div className={styles.groups}>
                    {menuGroups.filter((group) => groups.some((groupId) => groupId === group.id)).map((group) => (
                      <MenuGroup key={group.id} group={group} locale={locale} />
                    ))}
                  </div>
                </MenuIsland>
              ))}

              <div className={styles.ending}>
                <MenuIsland id="food" title={t.food} variant={2}>
                  <p className={styles.foodAvailability}>{t.foodNote}</p>
                  <CafeMenuFood
                    locale={locale}
                    groups={[
                      { title: t.sandwiches, products: sandwichProducts },
                      { title: t.sweets, products: archiveProducts },
                    ]}
                    rail={<SpotlightRail className={styles.islandRail} variant={3} compact />}
                  />
                </MenuIsland>

                <footer className={styles.footer}>
                  <Link href={home} className="pebble-text-link">
                    <i className="ri-arrow-left-line" aria-hidden="true" />{t.cafe}
                  </Link>
                </footer>
              </div>
            </div>
          </div>
        </CafeMenuIslands>
      </main>
    </div>
  );
}
