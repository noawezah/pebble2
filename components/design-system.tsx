"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Brand from "@/components/brand";
import { MotionLink, MotionButton } from "@/components/motion-action";

const copy = {
  ro: {
    system: "Sistem vizual",
    nav: ["Identitate", "Tipografie", "Culoare", "Mișcare"],
    place: "Cafea de specialitate · București",
    intro: "Un loc mic. Un ritm al tău.",
    note: "O identitate cu personalitate, inspirată de cafea bună, plante și dimineți fără grabă.",
    direction: "Direcție creativă / 01",
    slow: ["Mai încet.", "Mai aproape."],
    heroNote:
      "Cafea MERON. Lumină de dimineață. Un mic refugiu în mijlocul Bucureștiului.",
    cta: "Găsește-ne",
    imageNote: "Interior PEBBLE · Studiu AI, fără clienți",
    foundation: "O prezență caldă.\nUn caracter puternic.",
    foundationNote:
      "Industrial, dar personal. Expresiv, dar simplu. PEBBLE îmbină litere generoase cu detalii discrete și spațiu pentru a respira.",
    type: "Litere cu personalitate.",
    typeNote:
      "Fraunces Black aduce forme moi, apropiate de Cooper Black. Hurme Geometric Sans păstrează informația clară. Numele brandului rămâne întotdeauna PEBBLE.",
    display: "O pauză bună.",
    body: "Ne găsești între cafenelele cunoscute din centrul Bucureștiului. Un loc mic, cu cafea de specialitate MERON și timp pentru tine.",
    colors: "Din spațiu,\npe ecran.",
    colorNote:
      "Alb stins și cărbune pentru structură. Verdele plantelor apare doar în imagini. Lemnul și lumina rămân în fotografie.",
    palette: ["Alb stins", "Cărbune", "Grafit", "Piatră"],
    grid: "Libertate, în 7 coloane.",
    gridNote:
      "O grilă editorială care ține totul împreună. Imaginile traversează coloanele, iar titlurile trec peste marginea lor.",
    photo: "Lumina face loc.",
    photoNote:
      "Umbre diagonale, texturi reale, verde viu. Cadre apropiate pentru cafea; fotografii autentice pentru loc și oameni.",
    refs: "Fotografii de referință · Furnizate de PEBBLE",
    motion: "Un ritm. Fără grabă.",
    motionNote:
      "Intrări diagonale, parallax discret și tranziții scurte. Mișcarea însoțește privirea, fără să blocheze scroll-ul.",
    replay: "Reia mișcarea",
    reduced: "Respectă preferința de mișcare redusă.",
    details: "Detaliile contează.",
    detailsNote:
      "Butoane clare, pictograme Remix și stări vizibile pentru mouse, tastatură și atingere.",
    secondary: "Descoperă PEBBLE",
    disabled: "Indisponibil",
    links: "Link editorial",
    footer: "Puțin ascuns. Ușor de iubit.",
    top: "Înapoi sus",
    version: "Fundamentul website-ului · Versiunea 01",
    logo: "Marca originală",
    font: "Alternativă web la Cooper Black",
    sizing: "Scară fluidă · Spațiere normală",
    gridToggle: "Arată grila",
    gridHide: "Ascunde grila",
    gridHeading: "Grilă și spațiere",
    art: "Direcție foto",
    tones: "04 tonuri",
    texture: "Lumină / Viață / Textură",
    ui: "Elemente de interfață",
    slower: ["Mai puțină grabă.", "Mai multă cafea."],
    columns: "coloane",
    golden: "Lumină aurie",
    life: "Viața de zi cu zi",
    stay: ["Mai stai", "puțin."],
    diagonal: "Intrare diagonală",
  },
  en: {
    system: "Visual system",
    nav: ["Identity", "Typography", "Colour", "Motion"],
    place: "Specialty coffee · Bucharest",
    intro: "A small place. Your own pace.",
    note: "An identity with personality, inspired by good coffee, plants and unhurried mornings.",
    direction: "Creative direction / 01",
    slow: ["Slow down.", "Stay a little."],
    heroNote:
      "MERON coffee. Morning light. A little retreat in the middle of Bucharest.",
    cta: "Find us",
    imageNote: "PEBBLE interior · AI-enhanced, empty-room study",
    foundation: "A warm presence.\nA strong character.",
    foundationNote:
      "Industrial, yet personal. Expressive, yet simple. PEBBLE brings generous letterforms together with quiet details and room to breathe.",
    type: "Letters with character.",
    typeNote:
      "Fraunces Black brings soft shapes close to Cooper Black. Hurme Geometric Sans keeps information clear. The brand name is always PEBBLE.",
    display: "A good pause.",
    body: "Find us between the familiar cafés of central Bucharest. A small place, with MERON specialty coffee and a little time for yourself.",
    colors: "From the space,\nto the screen.",
    colorNote:
      "Off-white and charcoal for structure. Plant green appears only in images. Wood and light live in the photography.",
    palette: ["Off-white", "Charcoal", "Graphite", "Stone"],
    grid: "Freedom, in 7 columns.",
    gridNote:
      "An editorial grid that holds everything together. Images cross columns, while headlines reach beyond their edges.",
    photo: "Let the light in.",
    photoNote:
      "Diagonal shadows, real textures, vivid green. Close crops for coffee; authentic photography for the place and its people.",
    refs: "Reference photographs · Supplied by PEBBLE",
    motion: "A rhythm. No rush.",
    motionNote:
      "Diagonal entrances, subtle parallax and quick transitions. Motion guides the eye without taking over the scroll.",
    replay: "Replay motion",
    reduced: "Respects reduced-motion preferences.",
    details: "The little things.",
    detailsNote:
      "Clear buttons, Remix icons and visible states for mouse, keyboard and touch.",
    secondary: "Discover PEBBLE",
    disabled: "Unavailable",
    links: "Editorial link",
    footer: "A little hidden. Easy to love.",
    top: "Back to top",
    version: "Website foundation · Version 01",
    logo: "Original brand mark",
    font: "Web alternative to Cooper Black",
    sizing: "Fluid scale · Normal tracking",
    gridToggle: "Show grid",
    gridHide: "Hide grid",
    gridHeading: "Grid & rhythm",
    art: "Art direction",
    tones: "04 tones",
    texture: "Light / Life / Texture",
    ui: "UI essentials",
    slower: ["Less rush.", "More coffee."],
    columns: "columns",
    golden: "Golden hour",
    life: "Everyday life",
    stay: ["Stay", "a little."],
    diagonal: "Diagonal reveal",
  },
};
const sections = ["identity", "type", "colour", "motion"];
const palette = ["#F5F5F2", "#292929", "#545454", "#BCBCB8"];
const maps = "https://www.google.com/maps/search/?api=1&query=Pebble+Bucharest";

export default function DesignSystem() {
  const [lang, setLang] = useState<"ro" | "en">("en");
  const [grid, setGrid] = useState(false);
  const t = copy[lang];
  const root = useRef<HTMLDivElement>(null);
  const replay = useRef<gsap.core.Tween | null>(null);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>(".section-title, .hero-title")
          .forEach((element, index) => {
            gsap.fromTo(
              element,
              { x: index % 2 ? 28 : -28, y: 38, rotation: -2, opacity: 0 },
              {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 96%",
                  once: true,
                },
              },
            );
          });
        gsap.fromTo(
          ".hero-picture img",
          { yPercent: -4, scale: 1.12 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-study",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          },
        );
        gsap.utils
          .toArray<HTMLElement>(".reference-images figure")
          .forEach((element, i) => {
            gsap.fromTo(
              element,
              { x: i ? 24 : -24, y: 36, rotation: i ? 2 : -2, opacity: 0 },
              {
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
              },
            );
          });
        replay.current = gsap.fromTo(
          ".motion-word",
          { x: -65, y: 55, rotation: -8, opacity: 0 },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".motion-stage",
              start: "top 85%",
              once: true,
            },
          },
        );
      }, root);
      return () => {
        context.revert();
        replay.current = null;
      };
    });
    return () => media.revert();
  }, [lang]);

  return (
    <div ref={root} id="top">
      <a className="skip-link" href="#main">
        {lang === "ro" ? "Sari la conținut" : "Skip to content"}
      </a>
      <header className="header page-pad">
        <a className="small-brand" href="#top" aria-label="PEBBLE">
          <Brand />
        </a>
        <nav
          aria-label={lang === "ro" ? "Navigare principală" : "Main navigation"}
        >
          {t.nav.map((label, i) => (
            <a key={sections[i]} href={`#${sections[i]}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="language" aria-label="Language">
          <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            EN
          </button>
          <span>/</span>
          <button aria-pressed={lang === "ro"} onClick={() => setLang("ro")}>
            RO
          </button>
        </div>
      </header>
      <main id="main">
        <section className="opening page-pad" aria-labelledby="page-title">
          <div className="eyebrow opening-top">
            <span>{t.system} — 2026</span>
            <span>{t.place}</span>
          </div>
          <h1 id="page-title" className="wordmark">
            PEBBLE
          </h1>
          <div className="opening-bottom">
            <p>{t.intro}</p>
            <p>{t.note}</p>
            <a href="#identity" className="round-link" aria-label={t.nav[0]}>
              <i className="ri-arrow-right-down-line" aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          className="hero-study page-pad"
          id="identity"
          aria-labelledby="hero-title"
        >
          <div className="hero-picture">
            <Image
              src="/images/interior-empty-editorial.webp"
              alt={
                lang === "ro"
                  ? "Fotografie a interiorului PEBBLE cu lumină îmbunătățită prin AI: barul în stânga, plante și vitrina înaltă"
                  : "AI lighting enhancement of PEBBLE’s interior photograph: counter on the left, plants and tall storefront windows"
              }
              fill
              preload
              sizes="(max-width: 700px) 100vw, 72vw"
            />
          </div>
          <div className="hero-label eyebrow">{t.direction}</div>
          <h2 id="hero-title" className="hero-title">
            {t.slow[0]}
            <br />
            <span>{t.slow[1]}</span>
          </h2>
          <div className="hero-copy">
            <p>{t.heroNote}</p>
            <a
              className="button primary"
              href={maps}
              target="_blank"
              rel="noreferrer"
            >
              {t.cta}
              <i className="ri-arrow-right-up-line" aria-hidden="true" />
            </a>
          </div>
          <span className="photo-caption">{t.imageNote}</span>
          <span className="vertical-note eyebrow">PEBBLE · BUCHAREST</span>
        </section>
        <section className="foundation page-pad section-space">
          <div className="section-label eyebrow">
            <span>01 — {t.nav[0]}</span>
            <span>PEBBLE / MERON</span>
          </div>
          <div className="seven-grid foundation-content">
            <h2 className="section-title">{t.foundation}</h2>
            <div className="foundation-note">
              <p>{t.foundationNote}</p>
              <div className="original-logo">
                <Image
                  src="/images/pebble-logo.png"
                  alt="PEBBLE specialty coffee — original snail logo"
                  width={848}
                  height={847}
                />
              </div>
              <span className="eyebrow">{t.logo}</span>
            </div>
          </div>
        </section>
        <section id="type" className="type-section page-pad section-space">
          <div className="section-label eyebrow">
            <span>02 — {t.nav[1]}</span>
            <span>Fraunces + Hurme Geometric Sans</span>
          </div>
          <div className="section-intro">
            <h2 className="section-title">{t.type}</h2>
            <p>{t.typeNote}</p>
          </div>
          <div className="type-specimen">
            <div className="specimen-large">
              Aa<span>ăâîșț</span>
            </div>
            <div className="specimen-info">
              <h3>Fraunces</h3>
              <p>Black · 900 · Soft 100</p>
              <span>{t.font}</span>
              <p className="alphabet">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 &amp; ! ?
              </p>
            </div>
          </div>
          <div className="type-rows">
            <div>
              <span className="eyebrow">Display / 48–144</span>
              <p className="display-sample">{t.display}</p>
            </div>
            <div>
              <span className="eyebrow">Body / 18–20</span>
              <p className="body-sample">{t.body}</p>
            </div>
            <div>
              <span className="eyebrow">Label / 12–14</span>
              <p className="eyebrow">{t.place}</p>
            </div>
          </div>
          <p className="small-note">{t.sizing} · ă â î ș ț / Ă Â Î Ș Ț</p>
        </section>
        <section id="colour" className="colour-section page-pad section-space">
          <div className="section-label eyebrow">
            <span>03 — {t.nav[2]}</span>
            <span>{t.tones}</span>
          </div>
          <div className="section-intro">
            <h2 className="section-title">{t.colors}</h2>
            <p>{t.colorNote}</p>
          </div>
          <div className="palette">
            {palette.map((hex, i) => (
              <div className={`swatch swatch-${i}`} key={hex}>
                <span className="swatch-index">0{i + 1}</span>
                <div>
                  <h3>{t.palette[i]}</h3>
                  <span>{hex}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="grid-section page-pad section-space">
          <div className="section-label eyebrow">
            <span>04 — {t.gridHeading}</span>
            <span>7 / 4 / 8</span>
          </div>
          <div className="section-intro">
            <h2 className="section-title">{t.grid}</h2>
            <p>{t.gridNote}</p>
          </div>
          <div className={`grid-demo ${grid ? "show-grid" : ""}`}>
            <div className="column-guides" aria-hidden="true">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i}>
                  <span>0{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="grid-demo-block">
              <span className="eyebrow">
                PEBBLE / <span className="desktop-columns">7</span>
                <span className="mobile-columns">4</span> {t.columns}
              </span>
              <p>
                {t.slower[0]}
                <br />
                {t.slower[1]}
              </p>
            </div>
            <button
              className="button grid-button"
              aria-pressed={grid}
              onClick={() => setGrid(!grid)}
            >
              <i className="ri-layout-column-line" aria-hidden="true" />
              {grid ? t.gridHide : t.gridToggle}
            </button>
          </div>
          <div className="grid-specs">
            <span>Desktop · 7 {t.columns} · 24px</span>
            <span>Mobile · 4 {t.columns} · 12px</span>
            <span>Space · 8 / 16 / 24 / 48 / 96</span>
          </div>
        </section>
        <section className="photo-section page-pad section-space">
          <div className="section-label eyebrow">
            <span>05 — {t.art}</span>
            <span>{t.texture}</span>
          </div>
          <div className="section-intro">
            <h2 className="section-title">{t.photo}</h2>
            <p>{t.photoNote}</p>
          </div>
          <div className="reference-images">
            <figure>
              <Image
                src="/images/front-enhanced-editorial.webp"
                alt={
                  lang === "ro"
                    ? "Fațada reală PEBBLE, cu vitrina luminată și marca melcului"
                    : "PEBBLE’s real window frontage and snail branding"
                }
                width={555}
                height={725}
                sizes="(max-width: 700px) 75vw, 35vw"
              />
              <figcaption className="eyebrow">01 / {t.golden}</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/interior-reference-editorial.webp"
                alt={
                  lang === "ro"
                    ? "Interiorul real PEBBLE: cărămidă închisă, plante și mese cu clienți"
                    : "PEBBLE’s real interior: dark brick, plants and guests"
                }
                width={803}
                height={577}
                sizes="(max-width: 700px) 85vw, 50vw"
              />
              <figcaption className="eyebrow">02 / {t.life}</figcaption>
            </figure>
            <span className="photo-overlap">
              {t.stay[0]}
              <br />
              {t.stay[1]}
            </span>
          </div>
          <p className="small-note">{t.refs}</p>
        </section>
        <section id="motion" className="motion-section page-pad section-space">
          <div className="section-label eyebrow">
            <span>06 — {t.nav[3]}</span>
            <span>GSAP / ScrollTrigger</span>
          </div>
          <div className="section-intro">
            <h2 className="section-title">{t.motion}</h2>
            <p>{t.motionNote}</p>
          </div>
          <div className="motion-stage">
            <span className="motion-word">PEBBLE</span>
            <span className="motion-line" />
            <span className="eyebrow">{t.diagonal} ↗ · 900ms</span>
          </div>
          <div className="motion-controls">
            <span className="small-note">{t.reduced}</span>
            <MotionButton onClick={() => replay.current?.restart()}>
              {t.replay}
            </MotionButton>
          </div>
        </section>
        <section className="details-section page-pad section-space">
          <div className="section-label eyebrow">
            <span>07 — {t.ui}</span>
            <span>Remix Icon / 24px</span>
          </div>
          <div className="section-intro">
            <h2 className="section-title">{t.details}</h2>
            <p>{t.detailsNote}</p>
          </div>
          <div className="ui-buttons">
            <MotionLink href="#identity">{t.secondary}</MotionLink>
            <MotionLink
              className="outline"
              href="https://www.instagram.com/pebble.bucharest/"
              external
              icon="instagram-line"
            >
              Instagram
            </MotionLink>
            <button className="button" disabled>
              {t.disabled}
            </button>
            <a className="text-link" href="#type">
              {t.links}
              <i className="ri-arrow-right-up-line" aria-hidden="true" />
            </a>
          </div>
          <div className="icon-row" aria-label="Remix icon examples">
            {[
              "cup-line",
              "map-pin-line",
              "time-line",
              "instagram-line",
              "arrow-right-up-line",
              "menu-line",
              "close-line",
              "add-line",
            ].map((icon) => (
              <i key={icon} className={`ri-${icon}`} aria-hidden="true" />
            ))}
          </div>
        </section>
      </main>
      <footer className="footer page-pad">
        <p>{t.footer}</p>
        <div className="footer-wordmark" aria-hidden="true">
          PEBBLE
        </div>
        <div className="footer-bottom eyebrow">
          <span>{t.version}</span>
          <a href="#top">
            {t.top}
            <i className="ri-arrow-up-line" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
