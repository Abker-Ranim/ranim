"use client";

import { useRef } from "react";
import { profile } from "@/lib/content";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { Arrow, Magnetic } from "./primitives";
import { useSmoothScroll } from "./smooth-scroll";

const BADGE = "AMBITIOUS ✦ CURIOUS ✦ CREATIVE ✦ DRIVEN ✦ ";
// Circumference of the badge path (r = 78): the text is stretched to fill it exactly, so it never overlaps.
const BADGE_LENGTH = 2 * Math.PI * 78;
const GLYPHS = "01<>/{}[]#$%&*+=";

/** Each letter is its own span so it can be decoded on entry and re-scrambled on hover. */
function Letters({ word }: { word: string }) {
  return (
    <>
      {word.split("").map((ch, i) => (
        <span key={i} className="ht-char" data-char={ch}>
          {ch}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const root = ref.current!;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const chars = gsap.utils.toArray<HTMLElement>(".ht-first .ht-char", root);
        const tag = SplitText.create(".hero-tagline", { type: "lines", mask: "lines" });

        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        intro
          .from(".hero-arch", { clipPath: "inset(100% 0% 0% 0% round 999px 999px 24px 24px)", duration: 1.6, ease: "expo.inOut" })
          .from(".hero-arch img", { scale: 1.4, duration: 2.2 }, "<")
          .from(".ht-hello", { autoAlpha: 0, x: -20, duration: 0.8 }, "<0.3")
          // The first name decodes letter by letter, like a signal resolving.
          .from(chars, { autoAlpha: 0, duration: 0.01, stagger: 0.07 }, "<0.2")
          .add(() => {
            chars.forEach((c, i) =>
              gsap.to(c, { delay: i * 0.07, duration: 0.9, scrambleText: { text: c.dataset.char!, chars: GLYPHS, speed: 0.6 } })
            );
          }, "<")
          // Letters land amber, then cool down to the text colour (clearProps hands colour back to CSS for hover).
          .fromTo(chars, { color: "#ffb54a" }, { color: "#eeeae3", duration: 1.2, stagger: 0.07, ease: "power2.out", clearProps: "color" }, "<0.4")
          .from(".ht-last em", { yPercent: 105, duration: 1.3 }, "<0.3")
          .from(".ht-trace path", { strokeDashoffset: 420, duration: 1.4, ease: "power2.inOut" }, "<0.3")
          .from(".ht-pulse", { scale: 0, duration: 0.8, ease: "back.out(3)" }, ">-0.2")
          .from(".hero-eyebrow", { autoAlpha: 0, y: 14, duration: 0.8 }, "<-0.8")
          .from(tag.lines, { yPercent: 100, stagger: 0.1, duration: 1 }, "<0.2")
          .from(".hero-intro, .hero-actions > *", { autoAlpha: 0, y: 20, stagger: 0.08, duration: 0.9 }, "<0.2")
          .from(".hero-badge", { autoAlpha: 0, scale: 0.6, rotate: -90, duration: 1.4 }, "<")
          .from(".hero-signal path", { strokeDashoffset: 1600, duration: 2.4, stagger: 0.15, ease: "power2.inOut" }, 0.3)
          .from(".hero-cue", { autoAlpha: 0, y: 10, duration: 0.8 }, "-=1.2");
        const off = onIntroDone(() => intro.play());

        // Hovering a letter scrambles it for a moment.
        const hover = (e: Event) => {
          const c = e.currentTarget as HTMLElement;
          if (gsap.isTweening(c) || !intro.progress()) return;
          gsap.to(c, { duration: 0.5, scrambleText: { text: c.dataset.char!, chars: GLYPHS, speed: 1 } });
        };
        chars.forEach((c) => c.addEventListener("pointerenter", hover));

        // Exit: the copy lifts away while the portrait sinks.
        gsap
          .timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } })
          .to(".hero-arch", { yPercent: 14, scale: 0.92, ease: "none" }, 0)
          .to(".hero-copy", { autoAlpha: 0, y: -80, ease: "none" }, 0)
          .to(".hero-signal", { yPercent: -20, autoAlpha: 0.2, ease: "none" }, 0);

        // A soft light follows the pointer across the hero.
        const glow = root.querySelector<HTMLElement>(".hero-glow")!;
        const xTo = gsap.quickTo(glow, "x", { duration: 1.2, ease: "power3.out" });
        const yTo = gsap.quickTo(glow, "y", { duration: 1.2, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = root.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
        };
        root.addEventListener("pointermove", move);

        return () => {
          off();
          root.removeEventListener("pointermove", move);
          chars.forEach((c) => c.removeEventListener("pointerenter", hover));
          tag.revert();
        };
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero-glow" aria-hidden="true" />
      <svg className="hero-signal" viewBox="0 0 1600 600" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 420 C 220 420, 260 180, 480 200 S 760 470, 980 380 S 1320 120, 1600 160" />
        <path d="M0 470 C 240 470, 300 260, 520 280 S 800 520, 1020 430 S 1340 220, 1600 240" />
        <path d="M0 520 C 260 520, 340 340, 560 360 S 840 560, 1060 480 S 1360 320, 1600 320" />
      </svg>

      <div className="hero-grid wrap">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Computer Engineer · {profile.school} ’26 · Very Good Honors
          </p>

          <h1 className="hero-title" id="hero-name" aria-label={profile.fullName}>
            <span className="ht-hello" aria-hidden="true">
              Hi, I’m
            </span>
            <span className="ht-first" aria-hidden="true">
              <Letters word={profile.first} />
            </span>
            <span className="ht-last" aria-hidden="true">
              <span className="ht-mask">
                <em>{profile.last}</em>
              </span>
              <svg className="ht-trace" viewBox="0 0 420 40" preserveAspectRatio="none">
                <path d="M2 30 C 60 30, 70 10, 120 12 S 190 34, 240 26 S 330 6, 410 14" />
              </svg>
              <span className="ht-pulse" />
            </span>
          </h1>

          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <Magnetic>
              <button type="button" className="btn btn-primary" onClick={() => scrollTo("#intechgeeks")}>
                See my work <Arrow dir="down" />
              </button>
            </Magnetic>
            <Magnetic>
              <button type="button" className="btn btn-ghost" onClick={() => scrollTo("#contact")}>
                Get in touch
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-arch">
            <img src="/media/portrait.webp?v=3" alt="Portrait of Ranim Abker" width={573} height={891} fetchPriority="high" />
          </div>
          <div className="hero-badge" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength={BADGE_LENGTH - 2} lengthAdjust="spacing">
                  {BADGE}
                </textPath>
              </text>
            </svg>
            <span className="hero-badge-core">✦</span>
          </div>
        </div>
      </div>

      <button type="button" className="hero-cue" onClick={() => scrollTo("#origins")}>
        <span>Follow the trace</span>
        <span className="hero-cue-line" aria-hidden="true">
          <span />
        </span>
      </button>
    </section>
  );
}
