"use client";

import { useRef } from "react";
import { associations, logos, origins, profile } from "@/lib/content";
import { DESKTOP, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Kicker, SplitTitle } from "./primitives";

export function Origins() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: the journey becomes a pinned horizontal track while the year ticks from 2020 to 2026.
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const track = ref.current!.querySelector<HTMLElement>(".origins-track")!;
        const year = ref.current!.querySelector<HTMLElement>(".origins-year")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const state = { y: 2020 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".origins-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track, { x: () => -distance(), ease: "none" }, 0)
          .to(state, { y: 2026, ease: "none", onUpdate: () => (year.textContent = String(Math.round(state.y))) }, 0)
          .to(".origins-progress span", { scaleX: 1, ease: "none" }, 0);

        gsap.utils.toArray<HTMLElement>(".station").forEach((st) => {
          gsap
            .timeline({ scrollTrigger: { trigger: st, containerAnimation: tl, start: "left 85%", end: "left 35%", scrub: true } })
            .from(st.querySelector(".station-when"), { xPercent: 40, autoAlpha: 0.1, ease: "none" }, 0)
            .from(st.querySelectorAll(".station-logo, .station-body > *"), { y: 50, autoAlpha: 0, stagger: 0.08, ease: "none" }, 0);
        });
      });

      // Mobile: each station simply rises in.
      mm.add(`${MOTION_OK} and (max-width: 899px)`, () => {
        gsap.utils.toArray<HTMLElement>(".station").forEach((st) => {
          gsap.from(st.children, { y: 40, autoAlpha: 0, stagger: 0.08, duration: 1, ease: "expo.out", scrollTrigger: { trigger: st, start: "top 85%", once: true } });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="chapter origins" id="origins" aria-labelledby="origins-title">
      <div className="wrap chapter-head" data-span="01 origins">
        <Kicker n="01">Origins</Kicker>
        <SplitTitle id="origins-title" plain="Where the trace" em="begins." className="title-xl" />
        <blockquote className="manifesto" data-reveal>
          <p>“{profile.manifesto}”</p>
        </blockquote>
      </div>

      <div className="origins-pin">
        <span className="origins-year" aria-hidden="true">
          2020
        </span>
        <div className="origins-track">
          {origins.map((s, i) => (
            <article className="station" key={s.id} aria-label={`${s.when} — ${s.place}`}>
              <p className="station-when" aria-hidden="true">
                {s.from === s.to ? s.from : `${String(s.from).slice(2)}—${String(s.to).slice(2)}`}
              </p>
              {s.logo ? (
                <span className={`station-logo logo-${s.logo}`}>
                  <img src={logos[s.logo].src} alt={logos[s.logo].alt} width={logos[s.logo].w} height={logos[s.logo].h} loading="lazy" />
                </span>
              ) : (
                <span className="station-logo station-logo-text">Bac</span>
              )}
              <div className="station-body">
                <p className="mono station-meta">
                  {String(i + 1).padStart(2, "0")} · {s.when} · {s.detail}
                </p>
                <h3>{s.title}</h3>
                <p className="station-place">{s.place}</p>
                {s.honors ? (
                  <p className="station-honors">
                    <span className="station-seal" aria-hidden="true">
                      ✦
                    </span>
                    <span>
                      <b>Officially graduated</b>
                      {s.honors}
                    </span>
                  </p>
                ) : null}
                <p className="station-lesson">
                  <strong>{s.lesson.key}</strong> {s.lesson.rest}
                </p>
              </div>
            </article>
          ))}

          <article className="station station-side" aria-label="Beyond the classroom">
            <p className="station-when station-amp" aria-hidden="true">
              &amp;
            </p>
            <div className="station-body">
              <p className="mono station-meta">side spans · clubs & associations</p>
              <h3>Beyond the classroom</h3>
              <ul className="side-list">
                {associations.map((a) => (
                  <li key={a.name}>
                    <span>{a.name}</span>
                    <span className="mono">
                      {a.role} · {a.when}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
        <div className="origins-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
