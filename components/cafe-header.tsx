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
  const homeAnchor = page === "home" ? "" : home;
  const links = [
    { href: `${homeAnchor}#our-place`, label: t.place },
    { href: `${homeAnchor}#coffee`, label: t.coffee },
    { href: page === "menu" ? "#menu-main" : cafeRoutes.menu[locale], label: t.menu, isMenu: true },
    { href: `${homeAnchor}#visit`, label: t.visit },
  ];

  function navigationLinks(mobile: boolean) {
    return links.map(({ href, label, isMenu }) => {
      const active = isMenu && page === "menu";
      const current = active ? { "aria-current": "page" as const, "data-active": "true" } : {};
      const content = mobile ? (
        <span className="pebble-mobile-menu-row">
          {label}
          <i className={isMenu ? "ri-arrow-right-line" : "ri-arrow-right-down-line"} aria-hidden="true" />
        </span>
      ) : label;

      return href.startsWith("#") ? (
        <a key={href} href={href} {...current}>{content}</a>
      ) : (
        <Link key={href} href={href}>{content}</Link>
      );
    });
  }

  return (
    <header className="cafe-header pebble-header pebble-pad">
      <CafeAnchorAlignment />
      <Link href={home} className="small-brand" aria-label={t.home}><Brand /></Link>
      <nav className="pebble-desktop-nav" aria-label={t.navigation}>
        {navigationLinks(false)}
      </nav>
      <div className="pebble-header-tools">
        <CafeLanguage locale={locale} page={page} />
        <CafeMobileMenu label={t.toggle}>{navigationLinks(true)}</CafeMobileMenu>
      </div>
    </header>
  );
}
