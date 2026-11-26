import Link from "next/link";
import Brand from "@/components/brand";
import CafeAnchorAlignment from "@/components/cafe-anchor-alignment";
import CafeLanguage from "@/components/cafe-language";
import CafeMobileMenu from "@/components/cafe-mobile-menu";
import { cafeRoutes, type CafePage } from "@/lib/cafe-routes";
import type { Locale } from "@/lib/content";

const copy = {
  ro: {
    home: "PEBBLE, pagina principală",
    navigation: "Navigare principală",
    toggle: "Meniu de navigare",
    place: "Locul nostru",
    coffee: "Cafeaua",
    menu: "Meniu",
    visit: "Găsește-ne",
  },
  en: {
    home: "PEBBLE home",
    navigation: "Main navigation",
    toggle: "Navigation menu",
    place: "Our place",
    coffee: "The coffee",
    menu: "Menu",
    visit: "Find us",
  },
};

export default function CafeHeader({ locale, page = "home" }: { locale: Locale; page?: CafePage }) {
  const t = copy[locale];
  const home = cafeRoutes.home[locale];
  const menuPage = page === "menu";
  const homeAnchor = menuPage ? home : "";
  const links = [
    { href: `${homeAnchor}#our-place`, label: t.place },
    { href: `${homeAnchor}#coffee`, label: t.coffee },
    { href: cafeRoutes.menu[locale], label: t.menu, isMenu: true },
    { href: `${homeAnchor}#visit`, label: t.visit },
  ];
  const [place, coffee, , visit] = links;

  function navigationLink({ href, label, isMenu }: (typeof links)[number], mobile = false) {
    const content = mobile ? (
      <span className="pebble-mobile-menu-row">
        {label}
        <i className={isMenu ? "ri-arrow-right-line" : "ri-arrow-right-down-line"} aria-hidden="true" />
      </span>
    ) : label;

    return href.startsWith("#") ? (
      <a key={href} href={href}>{content}</a>
    ) : (
      <Link key={href} href={href}>{content}</Link>
    );
  }

  return (
    <header className="cafe-header pebble-header pebble-pad" data-cafe-page={page}>
      {page === "home" && <CafeAnchorAlignment />}
      <Link href={home} className="small-brand" aria-label={t.home}><Brand /></Link>
      <nav className="pebble-desktop-nav" aria-label={t.navigation}>
        {menuPage ? (
          <>
            <div className="pebble-menu-header-side">
              {navigationLink(place)}
              {navigationLink(coffee)}
            </div>
            <h1 id="cafe-menu-title" className="pebble-menu-header-title">
              <a href="#menu-main" aria-current="page">{t.menu}</a>
            </h1>
            <div className="pebble-menu-header-side">{navigationLink(visit)}</div>
          </>
        ) : links.map((link) => navigationLink(link))}
      </nav>
      <div className="pebble-header-tools">
        <CafeLanguage locale={locale} page={page} />
        <CafeMobileMenu label={t.toggle}>
          {(menuPage ? [place, coffee, visit] : links).map((link) => navigationLink(link, true))}
          {menuPage && (
            <div className="pebble-menu-dropdown-language">
              <CafeLanguage locale={locale} page={page} />
            </div>
          )}
        </CafeMobileMenu>
      </div>
    </header>
  );
}
