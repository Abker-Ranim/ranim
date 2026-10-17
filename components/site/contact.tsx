"use client";

import { useRef, useState } from "react";
import { profile } from "@/lib/content";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { Arrow, Kicker, Magnetic } from "./primitives";
import { useSmoothScroll } from "./smooth-scroll";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(".contact-title", { type: "words", mask: "words" });
        gsap
          .timeline({ scrollTrigger: { trigger: ".contact-title", start: "top 80%", once: true } })
          .from(split.words, { yPercent: 120, rotate: 5, stagger: 0.09, duration: 1.3, ease: "expo.out" })
          .from(".contact-end", { scale: 0, duration: 1, ease: "back.out(2)" }, 0.3);
        gsap.fromTo(".contact-orb", { scale: 0.6, yPercent: 30 }, { scale: 1, yPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "center center", scrub: true } });
        return () => split.revert();
      });
    },
    { scope: ref }
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section ref={ref} className="chapter contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-orb" aria-hidden="true" />
      <div className="wrap contact-inner" data-span="05 contact">
        <span className="contact-end" aria-hidden="true" />
        <Kicker n="05">Next span</Kicker>
        <h2 id="contact-title" className="contact-title">
          Let’s build <em>what’s next.</em>
        </h2>
        <p className="lede contact-lede" data-reveal>
          Microservices, security, observability, applied AI — or a team where I can ship real software for real people. My inbox is open.
        </p>

        <a className="contact-mail" href={`mailto:${profile.email}`} data-reveal>
          <span>{profile.email}</span>
          <Arrow />
        </a>

        <div className="contact-actions" data-reveal>
          <Magnetic>
            <button type="button" className="btn btn-primary" onClick={copy} aria-live="polite">
              {copied ? "Copied ✓" : "Copy email"}
            </button>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Arrow />
            </a>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href={profile.cv} download>
              Résumé <span aria-hidden="true">↓</span>
            </a>
          </Magnetic>
        </div>

        <p className="contact-langs" data-reveal>
          {profile.languages.map(([l, lvl]) => (
            <span key={l}>
              {l} <i>{lvl}</i>
            </span>
          ))}
        </p>
      </div>

      <footer className="footer wrap">
        <span className="mono">© {new Date().getFullYear()} {profile.fullName} · {profile.location}</span>
        <span className="mono footer-trace">trace complete · status 200</span>
        <button type="button" className="mono footer-top" onClick={() => scrollTo(0)}>
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
