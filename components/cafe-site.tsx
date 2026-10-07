import Image from "next/image";
import Link from "next/link";
import type { CafeContent, Locale } from "@/lib/content";
import Brand from "@/components/brand";
import CafeMotion from "@/components/cafe-motion";
import LoadingIntro from "@/components/loading-intro";
import SnailSculpture from "@/components/snail-sculpture";
import { SpotlightRail } from "@/components/spotlight-vine-rail";
import { MotionLink } from "@/components/motion-action";

const labels = {
  en: {
    nav: ["Our place", "The coffee", "Find us"],
    tag: "Specialty coffee · Bucharest",
    directions: "Get directions",
    explore: "Come on in",
    weekdays: "Monday – Friday",
    weekends: "Saturday – Sunday",
    address: "Our little corner",
    hours: "Make time for coffee",
    slow: "Good things take their time.",
    coffee: "Good coffee.\nGood company.",
    coffeeLabel: "Specialty coffee, by MERON",
    counter: "For here. For later.",
    visit: "See you\nat PEBBLE.",
    visitNote: "A little off the beaten path. Right in the middle of things.",
    social: "A little more PEBBLE",
    up: "Back to top",
    skip: "Skip to content",
    menu: "On the menu",
    currency: "lei",
    interiorAlt: "Sunlit tables, leafy plants and charcoal brick inside PEBBLE",
    wallAlt:
      "PEBBLE’s moss wall with white ceramic snails and warm side lighting",
    coffeeAlt:
      "A PEBBLE ceramic cup with seahorse latte art on the ivory counter",
    barAlt: "PEBBLE’s white brick counter and illuminated MERON coffee shelves",
    machineAlt: "The La Marzocco espresso machine and grinders at PEBBLE’s bar",
    bunnyAlt:
      "Bunny latte art in a PEBBLE ceramic cup, with water on a dark tray",
    frontAlt: "PEBBLE’s glass entrance with its original snail logo",
    city: "Bucharest",
    services: "Dog friendly · Plant-based options",
    menuButton: "Navigation menu",
    photoNote: "A little hidden. A little lovely.",
    snailNote: "At your own pace.",
  },
  ro: {
    nav: ["Locul nostru", "Cafeaua", "Găsește-ne"],
    tag: "Cafea de specialitate · București",
    directions: "Vezi traseul",
    explore: "Hai înăuntru",
    weekdays: "Luni – Vineri",
    weekends: "Sâmbătă – Duminică",
    address: "Colțul nostru de oraș",
    hours: "Fă-ți timp pentru cafea",
    slow: "Lucrurile bune cer timp.",
    coffee: "Cafea bună.\nOameni aproape.",
    coffeeLabel: "Cafea de specialitate, de la MERON",
    counter: "Pentru aici. Pentru acasă.",
    visit: "Ne vedem\nla PEBBLE.",
    visitNote: "Puțin departe de grabă. Chiar în mijlocul orașului.",
    social: "Mai mult PEBBLE",
    up: "Înapoi sus",
    skip: "Sari la conținut",
    menu: "În meniu",
    currency: "lei",
    interiorAlt:
      "Mese la lumină, plante și cărămidă închisă în interiorul PEBBLE",
    wallAlt:
      "Peretele de mușchi PEBBLE, cu melci albi din ceramică și lumină caldă",
    coffeeAlt:
      "Un căluț de mare desenat în spuma cafelei, într-o ceașcă PEBBLE",
    barAlt: "Barul PEBBLE cu cărămidă albă și rafturi iluminate cu cafea MERON",
    machineAlt: "Espressorul La Marzocco și râșnițele de la barul PEBBLE",
    bunnyAlt:
      "Latte art cu iepuraș într-o ceașcă PEBBLE, alături de apă pe o tavă",
    frontAlt: "Intrarea din sticlă PEBBLE cu marca originală a melcului",
    city: "București",
    services: "Căței bineveniți · Opțiuni vegetale",
    menuButton: "Meniu de navigare",
    photoNote: "Puțin ascuns. Ușor de iubit.",
    snailNote: "În ritmul tău.",
  },
};

function Photo({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`pebble-photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={priority}
        className="pebble-parallax"
        data-preload-image=""
      />
    </figure>
  );
}
function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, index) => <span key={index}>{line}</span>);
}

export default function CafeSite({
  content: c,
  locale: lang = "en",
}: {
  content: CafeContent;
  locale?: Locale;
}) {
  const t = labels[lang];
  const navigation = ["our-place", "coffee", "visit"];
  return (
    <>
      <LoadingIntro locale={lang} />
      <div className="cafe" id="top" lang={lang}>
        <CafeMotion locale={lang} />
        <a className="skip-link" href="#main">
          {t.skip}
        </a>
        <header className="cafe-header pebble-header pebble-pad">
          <Link
            href={lang === "en" ? "/" : "/ro"}
            className="small-brand"
            aria-label="PEBBLE home"
          >
            <Brand />
          </Link>
          <nav
            className="pebble-desktop-nav"
            aria-label={
              lang === "en" ? "Main navigation" : "Navigare principală"
            }
          >
            {navigation.map((id, i) => (
              <a href={`#${id}`} key={id}>
                {t.nav[i]}
              </a>
            ))}
          </nav>
          <div className="pebble-header-tools">
            <div
              className="pebble-language"
              aria-label={lang === "en" ? "Language" : "Limbă"}
            >
              <Link
                href="/"
                hrefLang="en"
                lang="en"
                aria-label="English"
                aria-current={lang === "en" ? "page" : undefined}
              >
                EN
              </Link>
              <Link
                href="/ro"
                hrefLang="ro"
                lang="ro"
                aria-label="Română"
                aria-current={lang === "ro" ? "page" : undefined}
              >
                RO
              </Link>
            </div>
            <details className="pebble-mobile-menu">
              <summary aria-label={t.menuButton}>
                <span />
                <span />
              </summary>
              <nav aria-label={t.menuButton}>
                {navigation.map((id, i) => (
                  <a href={`#${id}`} key={id}>
                    {t.nav[i]}
                    <i
                      className="ri-arrow-right-down-line"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </nav>
            </details>
          </div>
        </header>
        <main id="main">
          <section
            className="pebble-hero pebble-pad"
            aria-labelledby="cafe-title"
          >
            <div className="pebble-hero-copy">
              <p className="eyebrow pebble-kicker">
                <span className="pebble-dot" />
                {t.tag}
              </p>
              <h1 id="cafe-title">
                <Lines text={c.heroTitle[lang]} />
              </h1>
              <p className="pebble-hero-description">{c.heroText[lang]}</p>
              <div className="pebble-actions">
                <MotionLink href={c.maps} external>
                  {t.directions}
                </MotionLink>
                <a className="pebble-text-link" href="#our-place">
                  {t.explore}
                  <i className="ri-arrow-down-line" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="pebble-hero-visual">
              <Photo
                src="/images/interior-empty-editorial.webp"
                alt={t.interiorAlt}
                className="cafe-main-photo pebble-hero-photo"
                priority
                sizes="(max-width: 700px) 92vw, 46vw"
              />
              <Photo
                src="/images/reverse-bar-editorial.webp"
                alt={t.barAlt}
                className="pebble-hero-detail"
                sizes="(max-width: 700px) 36vw, 18vw"
              />
              <div className="pebble-stamp pebble-float" aria-hidden="true">
                <Image src="/images/snail.svg" alt="" width={46} height={58} />
                <span>{t.snailNote}</span>
              </div>
              <p className="pebble-photo-caption">
                {t.photoNote}
                <span>PEBBLE / {t.city}</span>
              </p>
            </div>
          </section>
          <div className="pebble-practical pebble-pad">
            <p className="pebble-practical-note">{t.hours}</p>
            <div>
              <span className="eyebrow">{t.weekdays}</span>
              <strong>{c.weekdayHours}</strong>
            </div>
            <div>
              <span className="eyebrow">{t.weekends}</span>
              <strong>{c.weekendHours}</strong>
            </div>
          </div>
          <section
            id="our-place"
            className="pebble-story pebble-pad pebble-section"
            aria-labelledby="place-title"
          >
            <SpotlightRail variant={0} />
            <div className="pebble-story-visual pebble-reveal">
              <Photo
                src="/images/snail-wall-reference-edit.webp"
                alt={t.wallAlt}
                className="pebble-wall-photo"
                sizes="(max-width: 700px) 92vw, 46vw"
              />
            </div>
            <div className="pebble-story-copy">
              <p className="eyebrow pebble-section-label">{t.nav[0]}</p>
              <h2 id="place-title" className="pebble-reveal">
                <Lines text={c.storyTitle[lang]} />
              </h2>
              <p>{c.storyText[lang]}</p>
              <a
                className="pebble-text-link"
                href="https://europeancoffeetrip.com/cafe/pebble-bucharest/"
                target="_blank"
                rel="noreferrer"
              >
                European Coffee Trip
                <i className="ri-arrow-right-up-line" aria-hidden="true" />
              </a>
              <div className="pebble-snail-note">
                <div className="pebble-sculpture">
                  <SnailSculpture locale={lang} />
                </div>
                <p>
                  {t.snailNote}
                  <span>{t.slow}</span>
                </p>
              </div>
            </div>
          </section>
          <section
            id="coffee"
            className="pebble-coffee pebble-pad pebble-section"
            aria-labelledby="coffee-title"
          >
            <SpotlightRail variant={1} tone="dark" />
            <div className="pebble-coffee-main">
              <div className="pebble-coffee-copy">
                <p className="eyebrow pebble-section-label">{t.coffeeLabel}</p>
                <h2 id="coffee-title" className="pebble-reveal">
                  <Lines text={t.coffee} />
                </h2>
                <p>{c.coffeeText[lang]}</p>
                <a
                  className="pebble-text-link"
                  href={c.menu.length ? "#menu" : "#visit"}
                >
                  {c.menu.length ? t.menu : t.explore}
                  <i className="ri-arrow-right-down-line" aria-hidden="true" />
                </a>
              </div>
              <div className="pebble-coffee-visual pebble-reveal">
                <Photo
                  src="/images/seahorse-real-editorial.webp"
                  alt={t.coffeeAlt}
                  className="pebble-cup-photo"
                  sizes="(max-width: 700px) 92vw, 46vw"
                />
                <span
                  className="pebble-coffee-sticker pebble-float"
                  aria-hidden="true"
                >
                  {lang === "en" ? "Made with care." : "Cu grijă."}
                </span>
              </div>
            </div>
            <div className="pebble-coffee-details">
              <div className="pebble-detail-card pebble-reveal">
                <Photo
                  src="/images/marzocco-bar-editorial.webp"
                  alt={t.machineAlt}
                  sizes="(max-width: 700px) 44vw, 30vw"
                />
                <p>
                  {lang === "en"
                    ? "Behind every good cup."
                    : "În spatele unei cafele bune."}
                </p>
              </div>
              <div className="pebble-detail-card pebble-reveal">
                <Photo
                  src="/images/bunny-tray-editorial.webp"
                  alt={t.bunnyAlt}
                  sizes="(max-width: 700px) 44vw, 30vw"
                />
                <p>
                  {lang === "en"
                    ? "A little joy. Every day."
                    : "Puțină bucurie. În fiecare zi."}
                </p>
              </div>
              <div className="pebble-counter-copy">
                <h3>{t.counter}</h3>
                <p>{c.retailText[lang]}</p>
              </div>
            </div>
          </section>
          {c.menu.length > 0 && (
            <section
              id="menu"
              className="pebble-menu pebble-pad pebble-section"
              aria-labelledby="menu-title"
            >
              <SpotlightRail variant={2} />
              <p className="eyebrow">{t.coffeeLabel}</p>
              <h2 id="menu-title">{t.menu}</h2>
              <dl>
                {c.menu.map((item) => (
                  <div key={item._key}>
                    <dt>
                      {item.name[lang]}
                      {item.description?.[lang] && (
                        <p>{item.description[lang]}</p>
                      )}
                    </dt>
                    <dd>
                      {new Intl.NumberFormat(
                        lang === "en" ? "en-GB" : "ro-RO",
                        { maximumFractionDigits: 2 },
                      ).format(item.price)}{" "}
                      {t.currency}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          <section
            className="pebble-reviews pebble-pad pebble-section"
            aria-labelledby="reviews-title"
          >
            <SpotlightRail variant={4} />
            <div className="pebble-review-layout">
              <div className="pebble-rating pebble-reveal">
                <span className="pebble-rating-number">5.0</span>
                <span
                  className="pebble-rating-stars"
                  aria-label={
                    lang === "en" ? "5 out of 5 stars" : "5 din 5 stele"
                  }
                >
                  ★★★★★
                </span>
                <p>
                  {lang === "en"
                    ? "Average rating on Google"
                    : "Nota medie pe Google"}
                </p>
              </div>
              <div className="pebble-review-copy">
                <p className="eyebrow pebble-section-label">
                  {lang === "en"
                    ? "A little love from you"
                    : "Un pic de drag de la voi"}
                </p>
                <h2 id="reviews-title" className="pebble-reveal">
                  <Lines
                    text={
                      lang === "en"
                        ? "Small café.\nSo much love."
                        : "Un loc mic.\nAtât de iubit."
                    }
                  />
                </h2>
                <p>
                  {lang === "en"
                    ? "Every visit, every kind word, every familiar face. Thank you for making our little corner of Bucharest feel so special."
                    : "Fiecare vizită, fiecare vorbă bună, fiecare chip cunoscut. Vă mulțumim că faceți micul nostru colț din București atât de special."}
                </p>
                <MotionLink href={c.maps} className="outline" external>
                  {lang === "en"
                    ? "Read our Google reviews"
                    : "Citește recenziile Google"}
                </MotionLink>
              </div>
            </div>
          </section>
          <section
            id="visit"
            className="pebble-visit pebble-pad pebble-section"
            aria-labelledby="visit-title"
          >
            <SpotlightRail variant={5} />
            <Photo
              src="/images/front-enhanced-editorial.webp"
              alt={t.frontAlt}
              className="pebble-front-photo pebble-reveal"
              sizes="(max-width: 700px) 92vw, 40vw"
            />
            <div className="pebble-visit-copy">
              <p className="eyebrow pebble-section-label">{t.nav[2]}</p>
              <h2 id="visit-title" className="pebble-reveal">
                <Lines text={t.visit} />
              </h2>
              <p>{t.visitNote}</p>
              <address>
                {c.address}
                <br />
                {c.postalCode} {t.city}
              </address>
              <dl className="pebble-hours">
                <div>
                  <dt>{t.weekdays}</dt>
                  <dd>{c.weekdayHours}</dd>
                </div>
                <div>
                  <dt>{t.weekends}</dt>
                  <dd>{c.weekendHours}</dd>
                </div>
              </dl>
              <MotionLink href={c.maps} external>
                {t.directions}
              </MotionLink>
              <p className="pebble-services">{t.services}</p>
            </div>
          </section>
        </main>
        <footer className="pebble-footer pebble-pad">
          <div className="pebble-footer-top">
            <p>{t.social}</p>
            <div>
              <a href={c.instagram} target="_blank" rel="noreferrer">
                Instagram
                <i className="ri-instagram-line" aria-hidden="true" />
              </a>
              <a href={c.facebook} target="_blank" rel="noreferrer">
                Facebook
                <i className="ri-facebook-circle-fill" aria-hidden="true" />
              </a>
            </div>
          </div>
          <a
            className="pebble-footer-word"
            href="#top"
            aria-label={`PEBBLE — ${t.up}`}
          >
            PEBBLE<span aria-hidden="true">↗</span>
          </a>
          <div className="pebble-footer-bottom">
            <span>
              © {new Date().getFullYear()} PEBBLE · {t.tag}
            </span>
            <a href="#top">
              {t.up}
              <i className="ri-arrow-up-line" aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
