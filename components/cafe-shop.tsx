import type { Locale } from "@/lib/content";
import { SpotlightRail } from "@/components/spotlight-vine-rail";
import styles from "./cafe-shop.module.css";

const shopEmail = "email@email.ro";
const shopPhone = "0712345678";

const products = [
  { id: "cup-01", tone: "stone", ro: "Ceașcă PEBBLE 01", en: "PEBBLE cup 01" },
  { id: "cup-02", tone: "cream", ro: "Ceașcă PEBBLE 02", en: "PEBBLE cup 02" },
  { id: "tea-01", tone: "moss", ro: "Ceai vrac 01", en: "Loose-leaf tea 01" },
  { id: "tea-02", tone: "clay", ro: "Ceai vrac 02", en: "Loose-leaf tea 02" },
] as const;

const copy = {
  ro: {
    label: "Magazin PEBBLE",
    title: "Un pic de PEBBLE acasă.",
    intro: "Cești PEBBLE și ceai vrac la pungă. Scrie-ne sau sună-ne pentru detalii și disponibilitate.",
    ask: "Întreabă-ne",
    askAbout: "Întreabă-ne despre",
    contact: "Ai o întrebare?",
    email: "Scrie-ne la",
    phone: "Sună-ne la",
  },
  en: {
    label: "PEBBLE shop",
    title: "A little PEBBLE to take home.",
    intro: "PEBBLE cups and pouches of loose-leaf tea. Email or call us for details and availability.",
    ask: "Ask us",
    askAbout: "Ask us about",
    contact: "Have a question?",
    email: "Email us at",
    phone: "Call us at",
  },
};

function emailLink(subject?: string) {
  return `mailto:${shopEmail}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

export default function CafeShop({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section id="shop" className="pebble-pad pebble-section" aria-labelledby="shop-title">
      <SpotlightRail variant={2} />
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div>
            <p className="eyebrow pebble-section-label">{t.label}</p>
            <h2 id="shop-title" className="pebble-reveal">{t.title}</h2>
          </div>
          <p className={styles.description}>{t.intro}</p>
        </div>
        <ul className={styles.grid} role="list">
          {products.map((product) => {
            const name = product[locale];

            return (
              <li key={product.id} className="pebble-reveal">
                <a className={styles.card} href={emailLink(`${t.label} — ${name}`)} aria-label={`${t.askAbout} ${name}`}>
                  <div className={styles.placeholder} data-tone={product.tone}>
                    <h3>{name}</h3>
                  </div>
                  <span className={styles.action}>
                    {t.ask}
                    <i className="ri-arrow-right-up-line" aria-hidden="true" />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className={styles.contact}>
          <p>{t.contact}</p>
          <div className={styles.contactLinks}>
            <a href={emailLink()} aria-label={`${t.email} ${shopEmail}`}>
              <i className="ri-mail-line" aria-hidden="true" />{shopEmail}
            </a>
            <a href={`tel:${shopPhone}`} aria-label={`${t.phone} ${shopPhone}`}>
              <i className="ri-phone-line" aria-hidden="true" />{shopPhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
