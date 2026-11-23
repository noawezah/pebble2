import Link from "next/link";
import CafeHeader from "@/components/cafe-header";
import { cafeRoutes } from "@/lib/cafe-routes";
import type { Locale } from "@/lib/content";
import { menuGroups, type DrinkMenuGroup } from "@/lib/menu";
import styles from "./cafe-menu.module.css";

const copy = {
  ro: {
    heading: "Meniu",
    tagline: "Cafea de specialitate, băuturi și cocktailuri.",
    cafe: "Înapoi la PEBBLE",
    skip: "Sari la conținut",
    contents: "Secțiunile meniului",
    index: { drinks: "Cafea", cocktails: "Cocktailuri", food: "Gustări" },
    drinks: "Cafea și alte băuturi",
    cocktails: "Cocktailuri",
    food: "Sandvișuri și gustări",
    foodNote: "Pentru sandvișuri, produse de patiserie și alte gustări, întreabă-ne la bar ce avem astăzi.",
    nutrition: "Informații nutriționale",
    nutritionNote: "Valorile nutriționale vor fi adăugate după confirmare.",
    origin: "Întreabă barista despre originea cafelei folosite pentru espresso.",
    alternativeMilk: "Lapte de ovăz sau de mazăre (+4 lei).",
    legend: "O inimă = un shot de espresso.",
    shots: { 1: "1 shot de espresso", 2: "2 shoturi de espresso" },
  },
  en: {
    heading: "Menu",
    tagline: "Specialty coffee, drinks and cocktails.",
    cafe: "Back to PEBBLE",
    skip: "Skip to content",
    contents: "Menu sections",
    index: { drinks: "Coffee", cocktails: "Cocktails", food: "Snacks" },
    drinks: "Coffee and other drinks",
    cocktails: "Cocktails",
    food: "Sandwiches and snacks",
    foodNote: "Ask us at the counter what sandwiches, pastries and other snacks are available today.",
    nutrition: "Nutrition information",
    nutritionNote: "Nutrition values will be added once confirmed.",
    origin: "Ask the barista about the espresso origins.",
    alternativeMilk: "Oat milk or pea milk (+4 lei).",
    legend: "One heart = one espresso shot.",
    shots: { 1: "1 espresso shot", 2: "2 espresso shots" },
  },
};

const chapters = [
  { id: "drinks", groups: ["coffee", "other-drinks"] },
  { id: "cocktails", groups: ["aperitivo", "cocktails"] },
] as const;

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

  return (
    <div className="cafe">
      <a className="skip-link" href="#menu-main">{t.skip}</a>
      <CafeHeader locale={locale} page="menu" />

      <main id="menu-main" className="pebble-pad" tabIndex={-1}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p className="eyebrow">PEBBLE / {locale === "ro" ? "București" : "Bucharest"}</p>
            <h1>{t.heading}</h1>
            <p className={styles.lede}>{t.tagline}</p>
            <nav className={styles.index} aria-label={t.contents}>
              {chapters.map(({ id }) => <a href={`#${id}`} key={id}>{t.index[id]}</a>)}
              <a href="#food">{t.index.food}</a>
            </nav>
          </div>

          {chapters.map(({ id, groups }, index) => (
            <section key={id} id={id} className={styles.chapter} aria-labelledby={`${id}-title`} tabIndex={-1}>
              <div className={styles.chapterHeading}>
                <p className="eyebrow" aria-hidden="true">0{index + 1}</p>
                <h2 id={`${id}-title`}>{t[id]}</h2>
              </div>
              {id === "drinks" && (
                <div className={styles.notes}>
                  <p>{t.origin} {t.alternativeMilk}</p>
                  <p><span className={styles.hearts} aria-hidden="true">♥</span> {t.legend}</p>
                </div>
              )}
              <div className={styles.groups}>
                {menuGroups.filter((group) => groups.some((groupId) => groupId === group.id)).map((group) => (
                  <MenuGroup key={group.id} group={group} locale={locale} />
                ))}
              </div>
            </section>
          ))}

          <div className={styles.ending}>
            <section id="food" className={styles.chapter} aria-labelledby="food-title" tabIndex={-1}>
              <div className={styles.chapterHeading}>
                <p className="eyebrow" aria-hidden="true">03</p>
                <h2 id="food-title">{t.food}</h2>
              </div>
              <div className={styles.pending}>
                <p>{t.foodNote}</p>
                <div>
                  <h3>{t.nutrition}</h3>
                  <p>{t.nutritionNote}</p>
                </div>
              </div>
            </section>

            <footer className={styles.footer}>
              <Link href={home} className="pebble-text-link">
                <i className="ri-arrow-left-line" aria-hidden="true" />{t.cafe}
              </Link>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
