"use client";

import { useRef, useState } from "react";
import { languagesCode, profile, projectsUsing, toolbox } from "@/lib/content";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Kicker, SplitTitle, TechChip } from "./primitives";

export function Toolbox() {
  const ref = useRef<HTMLElement>(null);
  const [focus, setFocus] = useState<string | null>(null);
  const used = focus ? projectsUsing(focus) : [];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // The paper sheet slides up over the dark story, widening to full bleed.
        gsap.fromTo(
          ".toolbox-sheet",
          { clipPath: "inset(6% 5% 0% 5% round 48px 48px 0 0)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px 0px 48px 48px)", ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 20%", scrub: true } }
        );

        // Layers assemble from the bottom of the stack up, like infrastructure being provisioned.
        gsap.utils.toArray<HTMLElement>(".layer").forEach((layer) => {
          gsap.from(layer.querySelectorAll(".chip"), {
            y: 24,
            autoAlpha: 0,
            stagger: 0.04,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: { trigger: layer, start: "top 85%", once: true },
          });
        });

        // The languages ribbon speeds up and skews with scroll velocity.
        const track = ref.current!.querySelector<HTMLElement>(".ribbon-track")!;
        const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
        const skewTo = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3.out" });
        const st = ScrollTrigger.create({
          trigger: ".ribbon",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity();
            loop.timeScale(1 + Math.min(Math.abs(v) / 400, 5));
            skewTo(gsap.utils.clamp(-10, 10, v / -250));
            gsap.to(loop, { timeScale: 1, duration: 1, overwrite: true, delay: 0.1 });
          },
        });
        return () => st.kill();
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="chapter toolbox" id="toolbox" aria-labelledby="toolbox-title">
      <div className="toolbox-sheet">
        <div className="wrap chapter-head" data-span="04 toolbox">
          <Kicker n="04">Toolbox</Kicker>
          <SplitTitle id="toolbox-title" plain="The stack," em="layer by layer." className="title-xl" />
          <p className="lede" data-reveal>
            Not a list of logos — the layers of a system, and what I use at each one. Hover a technology to see where I used it.
          </p>
        </div>

        <div className="wrap toolbox-grid">
          <div className="layers" onPointerLeave={() => setFocus(null)}>
            {toolbox.map((l, i) => (
              <div className="layer" key={l.layer} data-reveal>
                <div className="layer-head">
                  <span className="mono layer-n">L{toolbox.length - i}</span>
                  <h3>{l.layer}</h3>
                  <p>{l.caption}</p>
                </div>
                <ul className="layer-items">
                  {l.items.map((t) => (
                    <li key={t}>
                      <button
                        type="button"
                        className={`chip-btn ${focus === t ? "is-focus" : ""} ${focus && focus !== t ? "is-dim" : ""}`}
                        onPointerEnter={() => setFocus(t)}
                        onFocus={() => setFocus(t)}
                        onBlur={() => setFocus(null)}
                        aria-describedby="toolbox-used"
                      >
                        <TechChip name={t} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="toolbox-aside">
            <div className="used" id="toolbox-used" aria-live="polite">
              <p className="mono">{focus ? `${focus} · used in` : "select a technology"}</p>
              {focus ? (
                used.length ? (
                  <ul>
                    {used.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="used-empty">Part of my everyday toolkit.</p>
                )
              ) : (
                <p className="used-empty">Every layer, from the interface down to the traces that prove it works.</p>
              )}
            </div>
            <div className="certs">
              <p className="mono">Certifications</p>
              {profile.certifications.map((c) => (
                <div key={c.name} className="cert" data-reveal>
                  <b>{c.name}</b>
                  <span>{c.detail}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="ribbon" aria-label={`Languages: ${languagesCode.join(", ")}`}>
          <div className="ribbon-track" aria-hidden="true">
            {[0, 1].map((k) => (
              <span key={k}>
                {languagesCode.map((lang) => (
                  <span key={lang} className="ribbon-item">
                    {lang} <em>✦</em>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
