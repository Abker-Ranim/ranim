"use client";

import { useEffect, useRef, useState } from "react";
import { chapters, profile } from "@/lib/content";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSmoothScroll } from "./smooth-scroll";

export function Nav() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      // Hide while reading down, come back as soon as the visitor scrolls up.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const nav = ref.current!;
          nav.classList.toggle("is-scrolled", self.scroll() > 40);
          if (self.scroll() < 120) nav.classList.remove("is-hidden");
          else nav.classList.toggle("is-hidden", self.direction === 1);
        },
      });
      chapters.forEach((c) => {
        // Pass the element itself: selector strings would be scoped to the nav by useGSAP.
        const section = document.getElementById(c.id);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 50%",
          end: "bottom 50%",
          // Measured after the pinned sections, so their pin spacing is accounted for.
          refreshPriority: -1,
          onToggle: (self) => self.isActive && setActive(c.id),
          onLeaveBack: () => c.id === chapters[0].id && setActive(null),
        });
      });

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".nav-inner > *", { y: -30, autoAlpha: 0, stagger: 0.08, duration: 1, delay: 0.2, ease: "expo.out" });
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", menu);
  }, [menu]);

  const go = (id: string) => {
    setMenu(false);
    scrollTo(`#${id}`, { offset: id === "contact" ? 0 : -10 });
  };

  return (
    <header ref={ref} className={`nav ${menu ? "menu-open" : ""}`}>
      <div className="nav-inner">
        <a
          href="#top"
          className="nav-mark"
          onClick={(e) => {
            e.preventDefault();
            setMenu(false);
            scrollTo(0);
          }}
          aria-label="Back to top"
        >
          <span className="nav-mark-glyph">RA</span>
          <span className="nav-mark-name">{profile.fullName}</span>
        </a>

        <nav aria-label="Chapters" className="nav-links">
          {chapters.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={active === c.id ? "is-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                go(c.id);
              }}
            >
              <span className="nav-n">{c.n}</span>
              {c.label}
            </a>
          ))}
        </nav>

        <a className="nav-cv" href={profile.cv} download>
          Résumé <span aria-hidden="true">↓</span>
        </a>

        <button type="button" className="nav-burger" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
          <span className="sr-only">{menu ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menu}>
        <ul>
          {chapters.map((c, i) => (
            <li key={c.id} style={{ ["--i" as string]: i }}>
              <a
                href={`#${c.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(c.id);
                }}
              >
                <span className="nav-n">{c.n}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.cv} download>
            Download résumé ↓
          </a>
        </div>
      </div>
    </header>
  );
}
