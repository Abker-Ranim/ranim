"use client";

import { useRef, useState } from "react";
import { builds, marioPatterns, type Project } from "@/lib/content";
import { DESKTOP, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { Arrow, Counter, DemoButton, Kicker, MediaView, SplitTitle, TechChip } from "./primitives";
import { useSmoothScroll } from "./smooth-scroll";

const byId = (id: string) => builds.find((b) => b.id === id)!;
const num = (id: string) => builds.findIndex((b) => b.id === id) + 1;

const previewOf = (p: Project) => {
  const m = p.media[0];
  return m.kind === "video" ? m.poster : m.src;
};

export function Builds() {
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // The index preview trails the pointer with a little inertia and tilt.
      mm.add(`${MOTION_OK} and (hover: hover) and ${DESKTOP}`, () => {
        const list = ref.current!.querySelector<HTMLElement>(".index")!;
        const pv = ref.current!.querySelector<HTMLElement>(".index-preview")!;
        const xTo = gsap.quickTo(pv, "x", { duration: 0.7, ease: "power3.out" });
        const yTo = gsap.quickTo(pv, "y", { duration: 0.7, ease: "power3.out" });
        const rTo = gsap.quickTo(pv, "rotate", { duration: 0.9, ease: "power3.out" });
        let lastX = 0;
        const move = (e: PointerEvent) => {
          const r = list.getBoundingClientRect();
          xTo(e.clientX - r.left);
          yTo(e.clientY - r.top);
          rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
          lastX = e.clientX;
        };
        list.addEventListener("pointermove", move);
        return () => list.removeEventListener("pointermove", move);
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="chapter builds" id="builds" aria-labelledby="builds-title">
      <div className="wrap chapter-head" data-span="03 builds">
        <Kicker n="03">Builds</Kicker>
        <SplitTitle id="builds-title" plain="Things I built" em="to learn by doing." className="title-xl" />
        <p className="lede" data-reveal>
          Academic and personal projects — real-time web, enterprise Java, native mobile and deep learning. Each one taught me something
          the next one needed.
        </p>
      </div>

      <div className="wrap index" onPointerLeave={() => setHover(null)}>
        <ol>
          {builds.map((p, i) => (
            <li key={p.id} data-reveal>
              <a
                href={`#${p.id}`}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(`#${p.id}`, { offset: -40 });
                }}
              >
                <span className="index-n mono">03.{i + 1}</span>
                <span className="index-name">{p.name}</span>
                <span className="index-kind">{p.kind}</span>
                <span className="index-arrow">
                  <Arrow dir="down" />
                </span>
              </a>
            </li>
          ))}
        </ol>
        <div className={`index-preview ${hover !== null ? "is-on" : ""}`} aria-hidden="true">
          {builds.map((p, i) => (
            <img key={p.id} src={previewOf(p)} alt="" className={hover === i ? "is-current" : ""} loading="lazy" />
          ))}
        </div>
      </div>

      <ProjectWide p={byId("nexum")} n={num("nexum")} />
      <ProjectCollage p={byId("eventicar")} n={num("eventicar")} />
      <ProjectPhone p={byId("showreserv")} n={num("showreserv")} />
      <ProjectPatterns p={byId("mario")} n={num("mario")} />
      <ProjectAI p={byId("emotion")} n={num("emotion")} />
    </section>
  );
}

// ── Shared pieces ────────────────────────────────────────────────────────

function ProjectHead({ p, n }: { p: Project; n: number }) {
  return (
    <>
      <p className="mono case-meta" data-reveal>
        03.{n} · {p.kind} · {p.when}
      </p>
      <h3 className="title-l" data-reveal>
        {p.name}
      </h3>
      <p className="case-pitch" data-reveal>
        {p.pitch}
      </p>
    </>
  );
}

function ProblemSolution({ p, wide = false }: { p: Project; wide?: boolean }) {
  return (
    <dl className={`ps ${wide ? "ps-wide" : ""}`}>
      <div data-reveal>
        <dt>The problem</dt>
        <dd>{p.problem}</dd>
      </div>
      <div data-reveal>
        <dt>What I built</dt>
        <dd>{p.solution}</dd>
      </div>
    </dl>
  );
}

function Details({ p }: { p: Project }) {
  return (
    <>
      <ul className="highlights">
        {p.highlights.map((h) => (
          <li key={h} data-reveal>
            {h}
          </li>
        ))}
      </ul>
      <div className="chips" data-reveal>
        {p.stack.map((t) => (
          <TechChip key={t} name={t} size="sm" />
        ))}
      </div>
      {p.links.length || p.fullDemo ? (
        <div className="case-links" data-reveal>
          {p.links.map((l) => (
            <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noreferrer">
              {l.label} <Arrow />
            </a>
          ))}
          {p.fullDemo ? <DemoButton demo={p.fullDemo} /> : null}
        </div>
      ) : null}
    </>
  );
}

// ── NEXUM: cinematic full-width frame, name echoing behind ───────────────

function ProjectWide({ p, n }: { p: Project; n: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(".wide-echo", { xPercent: 10 }, { xPercent: -25, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(
          ".wide-media",
          { rotateX: 18, scale: 0.88, transformPerspective: 1400 },
          { rotateX: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".wide-media", start: "top bottom", end: "top 30%", scrub: true } }
        );
      });
    },
    { scope: ref }
  );

  return (
    <article ref={ref} className="project project-wide" id={p.id} aria-label={p.name}>
      <p className="wide-echo" aria-hidden="true">
        {p.name} · {p.name} ·
      </p>
      <div className="wrap" data-span={`03.${n} ${p.name.toLowerCase()}`}>
        <div className="wide-head">
          <ProjectHead p={p} n={n} />
        </div>
        <div className="wide-media">
          <MediaView media={p.media[0]} />
        </div>
        <div className="wide-body">
          <ProblemSolution p={p} />
          <div>
            <Details p={p} />
          </div>
        </div>
      </div>
    </article>
  );
}

// ── EventiCar: layered collage drifting at different speeds ──────────────

function ProjectCollage({ p, n }: { p: Project; n: number }) {
  return (
    <article className="project project-collage" id={p.id} aria-label={p.name}>
      <div className="wrap collage-grid">
        <div className="collage-text" data-span={`03.${n} ${p.name.toLowerCase()}`}>
          <ProjectHead p={p} n={n} />
          <ProblemSolution p={p} />
          <Details p={p} />
        </div>
        <div className="collage-media">
          <div className="collage-main" data-reveal="clip">
            <MediaView media={p.media[0]} />
          </div>
          {p.media.slice(1).map((m, i) => (
            <div key={m.src} className={`collage-float collage-float-${i + 1}`} data-parallax={i === 0 ? 18 : 30}>
              <MediaView media={m} />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

// ── ShowReserv: a phone centre stage, the story on either side ───────────

function ProjectPhone({ p, n }: { p: Project; n: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center center", scrub: true } })
          .fromTo(".phone-stage .frame-phone", { yPercent: 25, rotate: -8 }, { yPercent: 0, rotate: 0, ease: "none" }, 0)
          .fromTo(".phone-ring", { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: "none" }, 0);
      });
    },
    { scope: ref }
  );

  return (
    <article ref={ref} className="project project-phone" id={p.id} aria-label={p.name}>
      <div className="wrap" data-span={`03.${n} ${p.name.toLowerCase()}`}>
        <div className="phone-head">
          <ProjectHead p={p} n={n} />
        </div>
        <div className="phone-grid">
          <div className="phone-side" data-reveal>
            <h4 className="mono">The problem</h4>
            <p>{p.problem}</p>
          </div>
          <div className="phone-stage">
            <span className="phone-ring" aria-hidden="true" />
            <MediaView media={p.media[0]} />
          </div>
          <div className="phone-side" data-reveal>
            <h4 className="mono">What I built</h4>
            <p>{p.solution}</p>
          </div>
        </div>
        <div className="phone-foot">
          <Details p={p} />
        </div>
      </div>
    </article>
  );
}

// ── Emotion recognition: the model, drawn as a signal flow ───────────────

function ProjectAI({ p, n }: { p: Project; n: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ".ai-flow", start: "top 75%", once: true } })
          .from(".ai-flow .ai-box", { autoAlpha: 0, x: -24, stagger: 0.12, duration: 0.9, ease: "expo.out" })
          .from(".ai-bar span", { scaleX: 0, stagger: 0.08, duration: 1, ease: "expo.out" }, 0.8);
      });
    },
    { scope: ref }
  );

  const emotions: [string, number][] = [
    ["happy", 0.78],
    ["neutral", 0.46],
    ["surprised", 0.31],
    ["sad", 0.18],
    ["angry", 0.09],
  ];

  return (
    <article ref={ref} className="project project-ai" id={p.id} aria-label={p.name}>
      <div className="wrap ai-grid">
        <div className="ai-text" data-span={`03.${n} emotion ai`}>
          <ProjectHead p={p} n={n} />
          <ProblemSolution p={p} />
          <Details p={p} />
        </div>

        <figure className="ai-flow" aria-label="Model architecture: video and audio branches fused into an emotion prediction">
          <div className="ai-box ai-in ai-in-1">
            <span className="mono">input · video</span>
            <b>Frames</b>
            <small>OpenCV extraction</small>
          </div>
          <div className="ai-box ai-in ai-in-2">
            <span className="mono">input · audio</span>
            <b>MFCC</b>
            <small>Librosa features</small>
          </div>
          <div className="ai-box ai-mid ai-mid-1">
            <b>R3D-18</b>
            <small>3D CNN</small>
          </div>
          <div className="ai-box ai-mid ai-mid-2">
            <b>2D CNN</b>
            <small>audio branch</small>
          </div>
          <div className="ai-box ai-fuse">
            <span className="mono">fusion</span>
            <b>Emotion</b>
          </div>
          <div className="ai-box ai-out">
            <span className="mono">PyQt5 · confidence</span>
            {emotions.map(([e, v]) => (
              <div className="ai-bar" key={e}>
                <small>{e}</small>
                <span style={{ ["--v" as string]: v }} />
              </div>
            ))}
          </div>
          <figcaption className="mono">Architecture sketch · scores shown are illustrative</figcaption>
        </figure>

        <div className="ai-illus" data-reveal="clip">
          <MediaView media={p.media[0]} />
        </div>
      </div>
    </article>
  );
}


// ── Super Mario: a game screen and the eight patterns behind it ──────────

function ProjectPatterns({ p, n }: { p: Project; n: number }) {
  const ref = useRef<HTMLElement>(null);
  const [pick, setPick] = useState(0);
  const [shot, setShot] = useState(0);
  const pattern = marioPatterns[pick];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Tiles pop up from below like blocks being hit, one after the other.
        gsap.from(".pattern-tile", {
          yPercent: 60,
          autoAlpha: 0,
          rotateX: -70,
          transformPerspective: 600,
          stagger: { each: 0.06, from: "start" },
          duration: 0.9,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: ".pattern-board", start: "top 80%", once: true },
        });
        gsap.fromTo(
          ".arcade",
          { rotate: -3, scale: 0.92 },
          { rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: ".arcade", start: "top bottom", end: "top 35%", scrub: true } }
        );
      });
    },
    { scope: ref }
  );

  return (
    <article ref={ref} className="project project-patterns" id={p.id} aria-label={p.name}>
      <div className="wrap" data-span={`03.${n} super mario`}>
        <div className="patterns-head">
          <div>
            <ProjectHead p={p} n={n} />
          </div>
          <p className="patterns-count" data-reveal>
            <Counter value={marioPatterns.length} className="patterns-count-n" />
            <span>design patterns,
              <br />
              all of them doing real work</span>
          </p>
        </div>

        <div className="patterns-grid">
          <div className="patterns-play">
            <div className="arcade">
              <div className="arcade-screen">
                <MediaView key={shot} media={p.media[shot]} className="arcade-swap" />
              </div>
              <div className="arcade-thumbs" role="group" aria-label="Game screens">
                {p.media.map((m, i) => (
                  <button
                    key={m.src}
                    type="button"
                    className={shot === i ? "is-on" : ""}
                    aria-pressed={shot === i}
                    aria-label={m.label}
                    onClick={() => setShot(i)}
                  >
                    <img src={m.kind === "video" ? m.poster : m.src} alt="" loading="lazy" />
                    {i === 0 ? <span className="arcade-live mono">play</span> : null}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pattern-board">
            <div className="pattern-tiles" role="tablist" aria-label="Design patterns">
              {marioPatterns.map((pt, i) => (
                <button
                  key={pt.name}
                  type="button"
                  role="tab"
                  id={`pt-${i}`}
                  aria-selected={pick === i}
                  aria-controls="pattern-panel"
                  className={`pattern-tile ${pick === i ? "is-on" : ""}`}
                  onClick={() => setPick(i)}
                  onPointerEnter={() => setPick(i)}
                >
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {pt.name}
                </button>
              ))}
            </div>
            <div className="pattern-panel" id="pattern-panel" role="tabpanel" aria-labelledby={`pt-${pick}`}>
              <div className="pattern-swap" key={pick}>
                <p className="mono pattern-name">{pattern.name} pattern</p>
                <p className="pattern-use">{pattern.use}</p>
                <pre className="pattern-code">
                  {pattern.classes.map((c) => (
                    <span key={c}>
                      <i>class</i> {c}
                    </span>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="wide-body">
          <ProblemSolution p={p} />
          <div>
            <Details p={p} />
          </div>
        </div>
      </div>
    </article>
  );
}
