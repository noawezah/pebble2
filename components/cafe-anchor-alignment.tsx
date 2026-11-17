"use client";

import { useEffect } from "react";

/** Keep a completed anchor jump aligned when the viewport changes shape. */
export default function CafeAnchorAlignment() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".cafe-header");
    const cafe = header?.closest(".cafe");
    if (!header || !cafe) return;

    const viewportSize = () => `${window.innerWidth}:${window.innerHeight}`;
    const currentTarget = () => {
      const target = document.getElementById(location.hash.slice(1));
      return target && cafe.contains(target) ? target : null;
    };

    let size = viewportSize();
    let alignedHash = "";
    let frame = 0;

    const sample = () => {
      frame = 0;
      // A resize may trigger a scroll event before its new layout has settled.
      if (viewportSize() !== size) return;
      const target = currentTarget();
      const gap = target && target.getBoundingClientRect().top - header.getBoundingClientRect().bottom;
      alignedHash = gap !== null && Math.abs(gap) <= 1 ? location.hash : "";
    };

    const scheduleSample = () => {
      if (!frame) frame = requestAnimationFrame(sample);
    };

    const realign = () => {
      const nextSize = viewportSize();
      if (nextSize === size) return;
      size = nextSize;
      const hash = alignedHash;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (hash && hash === location.hash) {
          currentTarget()?.scrollIntoView({ block: "start", behavior: "instant" });
        }
        sample();
      });
    };

    sample();
    window.addEventListener("scroll", scheduleSample, { passive: true });
    window.addEventListener("hashchange", scheduleSample);
    window.addEventListener("resize", realign);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleSample);
      window.removeEventListener("hashchange", scheduleSample);
      window.removeEventListener("resize", realign);
    };
  }, []);

  return null;
}
