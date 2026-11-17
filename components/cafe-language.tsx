import Link from "next/link";
import type { Locale } from "@/lib/content";
import { cafeRoutes, type CafePage } from "@/lib/cafe-routes";

const languages = [
  { code: "en", name: "English" },
  { code: "ro", name: "Română" },
] as const;

function LanguageFlag({ locale }: { locale: Locale }) {
  return locale === "ro" ? (
    <svg
      className="pebble-language-flag"
      aria-hidden="true"
      viewBox="0 0 18 12"
      width="18"
      height="12"
    >
      <path fill="#002B7F" d="M0 0h6v12H0z" />
      <path fill="#FCD116" d="M6 0h6v12H6z" />
      <path fill="#CE1126" d="M12 0h6v12h-6z" />
    </svg>
  ) : (
    <svg
      className="pebble-language-flag"
      aria-hidden="true"
      viewBox="0 0 60 40"
      width="18"
      height="12"
    >
      <path fill="#012169" d="M0 0h60v40H0z" />
      <path stroke="#fff" strokeWidth="8" d="M0 0l60 40M60 0 0 40" />
      <path
        fill="#C8102E"
        d="M0 0v3.2L26 20h4zm60 0h-4.8L30 16v4zM60 40v-3.2L34 20h-4zM0 40h4.8L30 24v-4z"
      />
      <path stroke="#fff" strokeWidth="12" d="M30 0v40M0 20h60" />
      <path stroke="#C8102E" strokeWidth="7.2" d="M30 0v40M0 20h60" />
    </svg>
  );
}

export default function CafeLanguage({
  locale,
  page = "home",
}: {
  locale: Locale;
  page?: CafePage;
}) {
  return (
    <nav
      className="pebble-language"
      aria-label={locale === "ro" ? "Limbă" : "Language"}
    >
      {languages.map(({ code, name }) => (
        <Link
          key={code}
          href={cafeRoutes[page][code]}
          hrefLang={code}
          lang={code}
          aria-label={name}
          aria-current={locale === code ? "page" : undefined}
        >
          <LanguageFlag locale={code} />
        </Link>
      ))}
    </nav>
  );
}
