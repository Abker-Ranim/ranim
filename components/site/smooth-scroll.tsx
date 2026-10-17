"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollTo = (target: string | number, opts?: { offset?: number; immediate?: boolean }) => void;

const ScrollContext = createContext<{ scrollTo: ScrollTo; lenis: () => Lenis | null }>({
  scrollTo: () => {},
  lenis: () => null,
});

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Fonts and lazy media change the layout after first paint — keep trigger positions honest.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  const scrollTo = useCallback<ScrollTo>((target, opts = {}) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: opts.offset ?? 0, immediate: opts.immediate, duration: 1.4 });
      return;
    }
    const el = typeof target === "string" ? document.querySelector(target) : null;
    if (el) el.scrollIntoView({ behavior: "auto" });
    else if (typeof target === "number") window.scrollTo(0, target);
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollTo, lenis: () => lenisRef.current }}>{children}</ScrollContext.Provider>
  );
}
