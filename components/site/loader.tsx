"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";

const LINES = ["resolving origins", "starting services", "loading builds", "opening the trace"];

/** Opening sequence: a trace boots up, the counter hits 100, the curtain splits open. Shown once per session. */
export function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      const root = ref.current!;
      let seen = false;
      try {
        seen = sessionStorage.getItem("ra-intro") === "1";
        sessionStorage.setItem("ra-intro", "1");
      } catch {}
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const finish = () => {
        document.documentElement.classList.remove("is-loading");
        setGone(true);
        markIntroDone();
      };

      if (seen || reduce) {
        gsap.to(root, { autoAlpha: 0, duration: reduce ? 0.01 : 0.5, onComplete: finish });
        return;
      }

      const counter = { v: 0 };
      const num = root.querySelector(".loader-num")!;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".loader-line", { autoAlpha: 0, x: -12, stagger: 0.22, duration: 0.5 })
        .to(".loader-ok", { autoAlpha: 1, stagger: 0.22, duration: 0.2 }, 0.35)
        .to(counter, { v: 100, duration: 1.5, ease: "power2.inOut", onUpdate: () => (num.textContent = String(Math.round(counter.v)).padStart(3, "0")) }, 0)
        .to(".loader-bar-fill", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(".loader-content", { autoAlpha: 0, y: -20, duration: 0.4 }, "+=0.15")
        .to(".loader-panel-top", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "<0.1")
        .to(".loader-panel-bottom", { yPercent: 100, duration: 1, ease: "expo.inOut" }, "<")
        .add(() => markIntroDone(), "<0.35")
        .add(finish);
    },
    { scope: ref }
  );

  if (gone) return null;

  return (
    <div ref={ref} className="loader" aria-hidden="true">
      <div className="loader-panel loader-panel-top" />
      <div className="loader-panel loader-panel-bottom" />
      <div className="loader-content">
        <p className="loader-cmd">
          <span className="loader-prompt">$</span> trace start --user ranim.abker
        </p>
        <ul>
          {LINES.map((l) => (
            <li key={l} className="loader-line">
              <span>→ {l}</span>
              <span className="loader-dots" />
              <span className="loader-ok">ok</span>
            </li>
          ))}
        </ul>
        <div className="loader-foot">
          <div className="loader-bar">
            <span className="loader-bar-fill" />
          </div>
          <span className="loader-num">000</span>
        </div>
      </div>
    </div>
  );
}
