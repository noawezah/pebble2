"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LanguageOwner = { id: symbol; locale: "en" | "ro" };
const languageOwners = new WeakMap<
  HTMLElement,
  { original: string; owners: LanguageOwner[] }
>();

/** Motion enhances the server-rendered page; every element is readable without it. */
export default function CafeMotion({
  locale = "en",
}: {
  locale?: "en" | "ro";
}) {
  useEffect(() => {
    const cafe = document.querySelector<HTMLElement>(".cafe");
    const header = cafe?.querySelector<HTMLElement>(
      ".cafe-header, .pebble-header",
    );
    if (!cafe || !header) return;
    const darkSections = [
      ...cafe.querySelectorAll<HTMLElement>(".pebble-coffee, .pebble-footer"),
    ];
    const saved = [
      { element: header, property: "--header-dark-start" },
      { element: header, property: "--header-dark-end" },
      { element: cafe, property: "--cafe-header-height" },
    ].map(({ element, property }) => ({
      element,
      property,
      value: element.style.getPropertyValue(property),
      priority: element.style.getPropertyPriority(property),
    }));
    let frame = 0;
    const write = (element: HTMLElement, property: string, value: string) => {
      if (element.style.getPropertyValue(property) !== value)
        element.style.setProperty(property, value);
    };
    const update = () => {
      frame = 0;
      const bounds = header.getBoundingClientRect();
      const withinHeader = (position: number) =>
        Math.max(0, Math.min(bounds.height, position - bounds.top));
      let bandStart = 0;
      let bandEnd = 0;
      darkSections.forEach((section) => {
        const sectionBounds = section.getBoundingClientRect();
        const start = withinHeader(sectionBounds.top);
        const end = withinHeader(sectionBounds.bottom);
        if (end - start > bandEnd - bandStart) {
          bandStart = start;
          bandEnd = end;
        }
      });
      // A paper band follows the exact dark-section intersection inside the header.
      write(header, "--header-dark-start", `${bandStart}px`);
      write(header, "--header-dark-end", `${bandEnd}px`);
      write(cafe, "--cafe-header-height", `${bounds.height}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(header);
    resize.observe(cafe);
    darkSections.forEach((section) => resize.observe(section));
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      saved.forEach(({ element, property, value, priority }) => {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      });
    };
  }, [locale]);

  useEffect(() => {
    const cafe = document.querySelector<HTMLElement>(".cafe");
    if (!cafe) return;

    const html = document.documentElement;
    const language = languageOwners.get(html) ?? {
      original: html.lang,
      owners: [],
    };
    const languageOwner = { id: Symbol("cafe-language"), locale };
    language.owners.push(languageOwner);
    languageOwners.set(html, language);
    html.lang = locale;

    gsap.registerPlugin(ScrollTrigger);
    let started = false;
    let disposed = false;
    let media: gsap.MatchMedia | undefined;

    const start = () => {
      if (started || disposed) return;
      started = true;
      document.removeEventListener("pebble:ready", start);
      readyObserver.disconnect();
      media = gsap.matchMedia(cafe);
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          hover: "(hover: hover) and (pointer: fine)",
        },
        (match) => {
          if (!match.conditions?.motion) return;
          const hoverCleanups: (() => void)[] = [];
          const context = gsap.context((self) => {
            const hero = gsap.timeline();
            hero
              .from(
                ".pebble-hero-copy > :not(h1)",
                {
                  y: 14,
                  opacity: 0,
                  duration: 0.65,
                  stagger: 0.08,
                  ease: "power2.out",
                  clearProps: "opacity,transform",
                },
                0,
              )
              .from(
                ".pebble-hero-copy h1 > span",
                {
                  y: 30,
                  rotation: 0.6,
                  opacity: 0,
                  duration: 0.85,
                  stagger: 0.12,
                  transformOrigin: "left bottom",
                  ease: "power3.out",
                  clearProps: "opacity,transform,transformOrigin",
                },
                0.08,
              )
              .from(
                ".pebble-hero-visual",
                {
                  scale: 1.035,
                  opacity: 0,
                  duration: 1.05,
                  ease: "power2.out",
                  clearProps: "opacity,transform",
                },
                0.04,
              );

            gsap.utils
              .toArray<HTMLElement>(".pebble-hero-detail")
              .forEach((detail) => {
                const angle = Number(gsap.getProperty(detail, "rotation")) || 0;
                hero.from(
                  detail,
                  {
                    y: 22,
                    rotation: angle - 3,
                    scale: 0.96,
                    duration: 1.05,
                    ease: "power3.out",
                    clearProps: "transform",
                  },
                  0.17,
                );
              });

            gsap.utils
              .toArray<HTMLElement>(".pebble-reveal")
              .forEach((element) => {
                const lines = element.matches("h2")
                  ? element.querySelectorAll<HTMLElement>(":scope > span")
                  : [];
                const photo =
                  element.matches(".pebble-photo") ||
                  !!element.querySelector(".pebble-photo");
                gsap.from(lines.length ? lines : element, {
                  y: lines.length ? 28 : 22,
                  opacity: 0,
                  ...(photo ? { scale: 0.985 } : {}),
                  duration: lines.length ? 0.8 : 0.9,
                  stagger: lines.length ? 0.11 : 0,
                  ease: "power3.out",
                  clearProps: "opacity,transform",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 92%",
                    once: true,
                  },
                });
              });

            const hoverPhoto = self.add(
              "hoverPhoto",
              (image: HTMLElement, active: boolean, direction: number) => {
                gsap.to(image, {
                  scale: active ? 1.105 : 1.07,
                  rotation: active ? direction * 0.45 : 0,
                  duration: active ? 0.75 : 0.9,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              },
            );
            gsap.utils
              .toArray<HTMLElement>(".pebble-photo .pebble-parallax")
              .forEach((image, index) => {
                const photo = image.closest<HTMLElement>(".pebble-photo");
                if (!photo) return;
                // Scale belongs to hover; scroll controls only the vertical camera drift.
                gsap.set(image, { scale: 1.07 });
                gsap.fromTo(
                  image,
                  { yPercent: -3 },
                  {
                    yPercent: 3,
                    ease: "none",
                    scrollTrigger: {
                      trigger: photo,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.7,
                      invalidateOnRefresh: true,
                    },
                  },
                );
                if (match.conditions?.hover) {
                  const direction = index % 2 ? -1 : 1;
                  const enter = (event: PointerEvent) => {
                    if (event.pointerType === "mouse")
                      hoverPhoto(image, true, direction);
                  };
                  const leave = () => hoverPhoto(image, false, direction);
                  photo.addEventListener("pointerenter", enter);
                  photo.addEventListener("pointerleave", leave);
                  hoverCleanups.push(() => {
                    photo.removeEventListener("pointerenter", enter);
                    photo.removeEventListener("pointerleave", leave);
                  });
                }
              });

            gsap.utils
              .toArray<HTMLElement>(".pebble-float")
              .forEach((element, index) => {
                const direction = index % 2 ? -1 : 1;
                const angle =
                  Number(gsap.getProperty(element, "rotation")) || 0;
                gsap.fromTo(
                  element,
                  { y: 6, rotation: angle - direction * 1.25 },
                  {
                    y: -6,
                    rotation: angle + direction * 1.25,
                    ease: "none",
                    scrollTrigger: {
                      trigger: element.parentElement ?? element,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.8,
                    },
                  },
                );
              });

            gsap.from(".pebble-footer-word", {
              y: 32,
              scale: 0.985,
              opacity: 0,
              duration: 1.15,
              ease: "power3.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: ".pebble-footer",
                start: "top 88%",
                once: true,
              },
            });
          }, cafe);
          return () => {
            hoverCleanups.forEach((cleanup) => cleanup());
            context.revert();
          };
        },
      );
    };

    const readyObserver = new MutationObserver(() => {
      if (cafe.dataset.introState === "ready") start();
    });
    readyObserver.observe(cafe, {
      attributes: true,
      attributeFilter: ["data-intro-state"],
    });
    document.addEventListener("pebble:ready", start, { once: true });
    // The intro can finish before this component mounts or before its listener exists.
    if (cafe.dataset.introState === "ready") start();

    const ids = new Set(["our-place", "coffee", "visit"]);
    const links = [
      ...cafe.querySelectorAll<HTMLAnchorElement>("header nav a[href^='#']"),
    ].filter((link) => ids.has(link.hash.slice(1)));
    const originals = links.map((link) => ({
      link,
      active: link.dataset.active,
      current: link.getAttribute("aria-current"),
    }));
    const sections = [...ids]
      .map((id) => document.getElementById(id))
      .filter(
        (section): section is HTMLElement =>
          !!section && cafe.contains(section),
      );
    const visible = new Set<Element>();
    const navigationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        const active = sections.find((section) => visible.has(section))?.id;
        links.forEach((link) => {
          if (link.hash === `#${active}`) {
            link.dataset.active = "true";
            link.setAttribute("aria-current", "location");
          } else {
            delete link.dataset.active;
            link.removeAttribute("aria-current");
          }
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((section) => navigationObserver.observe(section));

    const menu = cafe.querySelector<HTMLDetailsElement>(".pebble-mobile-menu");
    const summary = menu?.querySelector<HTMLElement>("summary");
    let menuCloseFrame = 0;
    const closeAfterNavigation = (event: MouseEvent) => {
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (menu && anchor && menu.contains(anchor)) {
        // Let the anchor perform its native navigation before hiding its parent.
        cancelAnimationFrame(menuCloseFrame);
        menuCloseFrame = requestAnimationFrame(() => {
          menu.open = false;
        });
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu?.open) return;
      menu.open = false;
      summary?.focus();
      event.preventDefault();
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        menu?.open &&
        event.target instanceof Node &&
        !menu.contains(event.target)
      ) {
        menu.open = false;
      }
    };
    if (menu) {
      menu.addEventListener("click", closeAfterNavigation);
      document.addEventListener("keydown", closeOnEscape);
      document.addEventListener("pointerdown", closeOutside, { passive: true });
    }

    return () => {
      disposed = true;
      document.removeEventListener("pebble:ready", start);
      readyObserver.disconnect();
      navigationObserver.disconnect();
      media?.revert();
      menu?.removeEventListener("click", closeAfterNavigation);
      cancelAnimationFrame(menuCloseFrame);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      language.owners = language.owners.filter(
        (owner) => owner.id !== languageOwner.id,
      );
      const currentLanguage = language.owners[language.owners.length - 1];
      if (currentLanguage) html.lang = currentLanguage.locale;
      else {
        html.lang = language.original;
        languageOwners.delete(html);
      }
      originals.forEach(({ link, active, current }) => {
        if (active === undefined) delete link.dataset.active;
        else link.dataset.active = active;
        if (current === null) link.removeAttribute("aria-current");
        else link.setAttribute("aria-current", current);
      });
    };
  }, [locale]);

  return null;
}
