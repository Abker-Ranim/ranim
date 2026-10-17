"use client";

import { useRef, useState } from "react";
import { cbs, crediwise, intechgeeks, logos } from "@/lib/content";
import { DESKTOP, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Arrow, Counter, DemoButton, Frame, Kicker, MediaView, SplitTitle, TechChip } from "./primitives";

export function IntechGeeks() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // The company logo lands on the trace like a milestone, with a ring pulsing outwards.
        gsap
          .timeline({ scrollTrigger: { trigger: ".milestone", start: "top 80%", end: "bottom 30%", scrub: 0.6 } })
          .fromTo(".milestone-logo", { scale: 0.5, autoAlpha: 0, rotate: -10 }, { scale: 1, autoAlpha: 1, rotate: 0, ease: "back.out(1.7)", duration: 1 })
          .fromTo(".milestone-ring", { scale: 0.6, autoAlpha: 0 }, { scale: 1.4, autoAlpha: 0.9, duration: 0.6 }, 0.5)
          .to(".milestone-ring", { scale: 2, autoAlpha: 0, duration: 0.6 });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="chapter intechgeeks" id="intechgeeks" aria-labelledby="ig-title">
      <div className="wrap chapter-head" data-span="02 intechgeeks">
        <Kicker n="02">Experience · IntechGeeks</Kicker>
        <div className="milestone">
          <span className="milestone-ring" aria-hidden="true" />
          <a className="milestone-logo" href={intechgeeks.site} target="_blank" rel="noreferrer">
            <img src={logos.intechgeeks.src} alt={logos.intechgeeks.alt} width={logos.intechgeeks.w} height={logos.intechgeeks.h} />
          </a>
          <p className="mono milestone-meta" data-reveal>
            {intechgeeks.city} · 2025 → 2026 · 2 internships
          </p>
        </div>
        <SplitTitle id="ig-title" plain="Where it got" em="real." className="title-xl" />
        <p className="lede" data-reveal>
          A summer internship, then my final-year project — one thread running through both: backend systems for the financial sector that are
          secure, orchestrated and observable. First a middleware in front of core banking services, then a full credit platform.
        </p>
      </div>

      <CbsCase />
      <CrediWiseCase />
    </section>
  );
}

// ── CBS middleware ───────────────────────────────────────────────────────

function CbsCase() {
  const ref = useRef<HTMLElement>(null);
  const [lead, ...shots] = cbs.media;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Screenshots start as a messy stack and fan out into a clean cascade as you scroll past.
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        gsap.utils.toArray<HTMLElement>(".deck-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            { rotate: [-7, 5, -3][i] ?? 0, xPercent: [8, -6, 4][i] ?? 0, y: 80 },
            { rotate: 0, xPercent: 0, y: 0, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 45%", scrub: true } }
          );
        });
      });
    },
    { scope: ref }
  );

  return (
    <article ref={ref} className="case case-cbs" aria-labelledby="cbs-title">
      <div className="wrap case-grid">
        <div className="case-text">
          <div className="case-sticky" data-span="02.1 cbs middleware">
            <p className="mono case-meta" data-reveal>
              {cbs.role} · {cbs.when}
            </p>
            <h3 id="cbs-title" className="title-l" data-reveal>
              {cbs.name}
            </h3>
            <p className="case-pitch" data-reveal>
              {cbs.pitch}
            </p>
            <dl className="ps">
              <div data-reveal>
                <dt>The problem</dt>
                <dd>{cbs.problem}</dd>
              </div>
              <div data-reveal>
                <dt>What I built</dt>
                <dd>{cbs.solution}</dd>
              </div>
            </dl>
            <ul className="highlights">
              {cbs.highlights.map((h) => (
                <li key={h} data-reveal>
                  {h}
                </li>
              ))}
            </ul>
            <div className="chips" data-reveal>
              {cbs.stack.map((t) => (
                <TechChip key={t} name={t} size="sm" />
              ))}
            </div>
            <div className="case-links" data-reveal>
              {cbs.links.map((l) => (
                <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noreferrer">
                  {l.label} <Arrow />
                </a>
              ))}
              {cbs.fullDemo ? <DemoButton demo={cbs.fullDemo} /> : null}
            </div>
          </div>
        </div>

        <div className="case-media">
          <div data-reveal="clip" className="case-lead">
            <MediaView media={lead} />
          </div>
          <div className="deck">
            {shots.map((m) => (
              <div className="deck-card" key={m.src}>
                <MediaView media={m} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ── CrediWise — the climax ───────────────────────────────────────────────

function CrediWiseCase() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const stages = crediwise.stages;
  const lit = new Set(stages[active].services);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Wiped in as one piece so the gradient stays continuous across the word.
        gsap
          .timeline({ scrollTrigger: { trigger: ".cw-intro", start: "top 75%", once: true } })
          .fromTo(
            ".cw-word",
            { clipPath: "inset(0% 100% 0% 0%)", x: -40, letterSpacing: "0em" },
            { clipPath: "inset(0% 0% 0% 0%)", x: 0, letterSpacing: "-0.07em", duration: 1.8, ease: "expo.inOut" }
          )
          .from(".cw-glow", { scale: 0.4, autoAlpha: 0, duration: 2, ease: "expo.out" }, 0);
      });

      // Pinned scrollytelling: one credit file travels through the five stages of its lifecycle.
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        let last = -1;
        const n = stages.length;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".cw-pin",
            start: "top top",
            end: () => `+=${window.innerHeight * 3.2}`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut", delay: 0.05 },
            onUpdate: (self) => {
              const i = Math.min(n - 1, Math.round(self.progress * (n - 1)));
              if (i !== last) {
                last = i;
                setActive(i);
              }
            },
          },
        });
        tl.to(".cw-token", { left: "100%", duration: 1 }, 0).to(".cw-line-fill", { scaleX: 1, duration: 1 }, 0);
      });

      mm.add(`${MOTION_OK} and (max-width: 899px)`, () => {
        gsap.utils.toArray<HTMLElement>(".cw-stage-m").forEach((el) =>
          gsap.from(el, { y: 40, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } })
        );
      });
    },
    { scope: ref }
  );

  return (
    <article ref={ref} className="case case-cw" aria-labelledby="cw-title">
      <div className="cw-intro wrap" data-span="02.2 crediwise">
        <div className="cw-glow" aria-hidden="true" />
        <p className="mono case-meta" data-reveal>
          {crediwise.role} · {crediwise.when} · {crediwise.kind}
        </p>
        <h3 id="cw-title" className="cw-word">
          {crediwise.name}
        </h3>
        <p className="cw-pitch" data-reveal>
          {crediwise.pitch}
        </p>
        <div className="cw-facts">
          {crediwise.facts.map((f) => (
            <div className="cw-fact" key={f.label} data-reveal>
              <Counter value={f.value} className="cw-fact-n" />
              <span>{f.label}</span>
            </div>
          ))}
        </div>
        <dl className="ps ps-wide">
          <div data-reveal>
            <dt>The problem</dt>
            <dd>{crediwise.problem}</dd>
          </div>
          <div data-reveal>
            <dt>What I built</dt>
            <dd>{crediwise.solution}</dd>
          </div>
        </dl>
      </div>

      {/* Desktop: pinned lifecycle */}
      <div className="cw-pin" aria-label="The credit lifecycle, stage by stage">
        <div className="wrap cw-stage-grid">
          <div className="cw-copy">
            <p className="mono cw-step">
              Stage {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
            </p>
            <div className="cw-copy-swap" key={active}>
              <h4>{stages[active].name}</h4>
              <p>{stages[active].text}</p>
            </div>
            <p className="cw-note mono">Architecture overview · scroll to move the credit file</p>
          </div>

          <div className="cw-diagram">
            <div className="cw-guard">
              <span className="cw-service is-lit">
                <b>Nginx</b> gateway · TLS · rate limiting
              </span>
              <span className="cw-service is-lit">
                <b>Keycloak</b> OIDC · RBAC · TOTP
              </span>
            </div>

            <div className="cw-pipeline">
              <span className="cw-line" />
              <span className="cw-line-fill" />
              <span className="cw-token" aria-hidden="true">
                <span>file</span>
              </span>
              {stages.map((s, i) => (
                <div key={s.name} className={`cw-node ${i <= active ? "is-done" : ""} ${i === active ? "is-active" : ""}`} style={{ left: `${(i / (stages.length - 1)) * 100}%` }}>
                  <span className="cw-node-dot" />
                  <span className="cw-node-label">{s.name}</span>
                </div>
              ))}
            </div>

            <div className="cw-services">
              {crediwise.services.map((s) => (
                <span key={s.id} className={`cw-service ${lit.has(s.id) ? "is-lit" : ""}`}>
                  <b>{s.name}</b>
                  {s.sub ? <small>{s.sub}</small> : null}
                  <i className="cw-db" aria-hidden="true" />
                </span>
              ))}
            </div>

            <div className="cw-waterfall" aria-hidden="true">
              <p className="mono">trace · credit-file</p>
              {stages.map((s, i) => (
                <div className="wf-row" key={s.name}>
                  <span className="mono">{s.name.toLowerCase().replace(" ", "-")}</span>
                  <span className="wf-lane">
                    <span className={`wf-bar ${i <= active ? "is-on" : ""}`} style={{ left: `${i * 17}%`, width: `${22 + (i % 2) * 8}%` }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: the same story as a vertical list */}
      <ol className="cw-stages-m wrap">
        {stages.map((s, i) => (
          <li className="cw-stage-m" key={s.name}>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <h4>{s.name}</h4>
            <p>{s.text}</p>
            <div className="cw-stage-m-services">
              {s.services.map((id) => (
                <span key={id}>{crediwise.services.find((x) => x.id === id)?.name}</span>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="wrap cw-pillars">
        {crediwise.pillars.map((p, i) => (
          <section className={`cw-pillar ${i % 2 ? "is-flip" : ""}`} key={p.title} aria-label={p.title}>
            <div className="cw-pillar-text">
              <p className="mono cw-pillar-n">{String(i + 1).padStart(2, "0")} / {String(crediwise.pillars.length).padStart(2, "0")}</p>
              <h4 data-reveal>{p.title}</h4>
              <p data-reveal>{p.text}</p>
            </div>
            <div className="cw-pillar-media" data-reveal="clip">
              <Frame label={p.label}>
                <img src={p.media} alt={p.label} width={1600} height={850} loading="lazy" decoding="async" />
              </Frame>
            </div>
          </section>
        ))}
      </div>

      <div className="wrap cw-outro">
        <div className="cw-details">
          <ul className="highlights">
            {crediwise.highlights.map((h) => (
              <li key={h} data-reveal>
                {h}
              </li>
            ))}
          </ul>
          <div className="chips" data-reveal>
            {crediwise.stack.map((t) => (
              <TechChip key={t} name={t} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
