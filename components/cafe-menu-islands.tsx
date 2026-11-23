"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clampUnit = (value: number) => Math.min(1, Math.max(0, value));

export default function CafeMenuIslands({ className, label, children }: {
  className: string;
  label: string;
  children: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const islands = Array.from(viewport.querySelectorAll<HTMLElement>("[data-menu-island]"))
      .flatMap((island) => island.parentElement ? [{ island, section: island.parentElement }] : []);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousWidth = viewport.clientWidth;
    let previousHeight = viewport.clientHeight;
    let settledHash = "";

    function update() {
      frame = 0;
      if (!viewport) return;

      const width = viewport.clientWidth;
      const height = Math.max(1, viewport.clientHeight);
      const isResizing = width !== previousWidth || height !== previousHeight;
      previousWidth = width;
      previousHeight = height;

      const hash = window.location.hash;
      const target = document.getElementById(hash.slice(1));
      const top = viewport.getBoundingClientRect().top;
      const inset = parseFloat(getComputedStyle(viewport).scrollPaddingBlockStart) || 0;
      if (target && viewport.contains(target)) {
        if (isResizing && settledHash === hash) {
          target.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" });
        }
        const gap = target.getBoundingClientRect().top - top - inset;
        settledHash = Math.abs(gap) <= 1 || (target.id === "menu-main" && viewport.scrollTop === 0) ? hash : "";
      } else {
        settledHash = "";
      }

      if (reducedMotion.matches) return;

      const center = top + height / 2;
      const approach = height * 0.66;
      const minimum = 0.95 - 0.035 * clampUnit((width - 400) / 620);
      const remainingScroll = Math.max(0, viewport.scrollHeight - height - viewport.scrollTop);

      // Measure the stationary sections first. Transforms never affect the anchor positions.
      const scales = islands.map(({ section }, index) => {
        const bounds = section.getBoundingClientRect();
        const centerInset = Math.min(bounds.height / 2, height * 0.22);
        const entering = bounds.top + centerInset - center;
        const leaving = center - Math.max(bounds.bottom - centerInset, bounds.top + height / 2);
        const distance = Math.max(0, entering, leaving);
        // The final island can reach full size even when its content is shorter than the viewport.
        const reachableDistance = index === islands.length - 1 ? Math.min(distance, remainingScroll) : distance;
        const progress = 1 - clampUnit(reachableDistance / approach);
        const eased = progress * progress * (3 - 2 * progress);
        return (minimum + (1 - minimum) * eased).toFixed(4);
      });

      islands.forEach(({ island }, index) => {
        if (island.style.getPropertyValue("--island-scale") !== scales[index]) {
          island.style.setProperty("--island-scale", scales[index]);
        }
      });
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function clearScale() {
      cancelAnimationFrame(frame);
      frame = 0;
      islands.forEach(({ island }) => island.style.removeProperty("--island-scale"));
    }

    function motionChange() {
      if (reducedMotion.matches) clearScale();
      else schedule();
    }

    const resize = new ResizeObserver(schedule);
    resize.observe(viewport);
    islands.forEach(({ section }) => resize.observe(section));
    viewport.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("hashchange", schedule);
    reducedMotion.addEventListener("change", motionChange);
    schedule();

    return () => {
      clearScale();
      resize.disconnect();
      viewport.removeEventListener("scroll", schedule);
      window.removeEventListener("hashchange", schedule);
      reducedMotion.removeEventListener("change", motionChange);
    };
  }, []);

  return (
    <div ref={viewportRef} className={className} data-menu-scroll="" role="region" aria-label={label} tabIndex={0}>
      {children}
    </div>
  );
}
