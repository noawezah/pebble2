"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./cafe-mobile-menu.module.css";

const revealed = "inset(0% 0% 0% 0%)";
const concealed = "inset(0% 0% 100% 0%)";
const sweepEase = "cubic-bezier(.83, 0, .17, 1)";

export default function CafeMobileMenu({ label, children }: { label: string; children: ReactNode }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    const summary = summaryRef.current;
    const panel = panelRef.current;
    if (!menu || !summary || !panel) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let animation: Animation | undefined;
    let closeFrame = 0;

    const canAnimate = () => motion.matches && typeof panel.animate === "function";
    const isClosing = () => menu.hasAttribute("data-closing");
    const clearClosing = () => {
      delete menu.dataset.closing;
      summary.removeAttribute("aria-expanded");
      panel.inert = false;
    };
    const finishClose = () => {
      animation?.cancel();
      animation = undefined;
      menu.open = false;
      clearClosing();
    };

    const sweep = (from: string, to: string, duration: number, finish: () => void) => {
      animation?.cancel();
      const next = panel.animate([{ clipPath: from }, { clipPath: to }], {
        duration,
        easing: sweepEase,
        fill: "both",
      });
      next.onfinish = () => {
        if (animation !== next) return;
        next.cancel();
        animation = undefined;
        finish();
      };
      animation = next;
    };

    const show = () => {
      const from = menu.open ? getComputedStyle(panel).clipPath : concealed;
      clearClosing();
      menu.open = true;
      sweep(from === "none" ? revealed : from, revealed, 440, () => {});
    };

    const close = () => {
      if (!menu.open || isClosing()) return;
      if (!canAnimate()) {
        finishClose();
        return;
      }
      const from = getComputedStyle(panel).clipPath;
      menu.dataset.closing = "";
      summary.setAttribute("aria-expanded", "false");
      panel.inert = true;
      sweep(from === "none" ? revealed : from, concealed, 320, finishClose);
    };

    const toggle = (event: MouseEvent) => {
      if (!canAnimate()) return;
      event.preventDefault();
      if (menu.open && !isClosing()) close();
      else show();
    };

    const closeAfterNavigation = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest("a[href]")) return;
      // Let the link navigate before hiding its parent.
      cancelAnimationFrame(closeFrame);
      closeFrame = requestAnimationFrame(finishClose);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.open || isClosing()) return;
      summary.focus({ preventScroll: true });
      close();
      event.preventDefault();
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.contains(event.target)) close();
    };
    const updateMotion = () => {
      if (motion.matches) return;
      if (isClosing()) finishClose();
      else {
        animation?.cancel();
        animation = undefined;
      }
    };

    summary.addEventListener("click", toggle);
    menu.addEventListener("click", closeAfterNavigation);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside, { passive: true });
    motion.addEventListener("change", updateMotion);
    return () => {
      summary.removeEventListener("click", toggle);
      menu.removeEventListener("click", closeAfterNavigation);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      motion.removeEventListener("change", updateMotion);
      cancelAnimationFrame(closeFrame);
      finishClose();
    };
  }, []);

  return (
    <details className={`pebble-mobile-menu ${styles.control}`} ref={menuRef}>
      <summary aria-label={label} ref={summaryRef}>
        <span />
        <span />
      </summary>
      <nav aria-label={label} className={styles.panel} ref={panelRef}>{children}</nav>
    </details>
  );
}
