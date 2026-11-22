"use client";

import { useEffect, useRef, useState } from "react";
import { MOTION_OK } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

/**
 * One continuous strip of frames (public/media/avatar/fNNN.webp), built from two AI videos
 * that both start on the same photo, background removed:
 *
 *   0 ─────── wave (greeting) ─────── 169 ── front ── 289
 *   waves & smiles               looks left    idle    looks right
 *
 * The cursor zone only picks a target frame; the playhead always walks there frame by frame,
 * so every reaction is a real, continuous movement.
 */
const COUNT = 289;
const FPS = 24;
const F = {
  greet: 1, // frame 0 is the cut where the second video changes framing: never shown
  left: 169,
  idle: [189, 229] as const,
  right: 281,
};
const HOLD_MS = 2500;
const src = (i: number) => `/media/avatar/f${String(i).padStart(3, "0")}.webp`;

type Zone = "idle" | "left" | "center" | "right";

/** Greeting messages follow the playhead, so they line up with the movement. */
function greetLine(head: number) {
  if (head <= 25) return "Let’s explore my work below";
  if (head <= 100) return "Welcome to my portfolio";
  if (head <= 160) return "Hello, I’m Ranim";
  return null;
}

export function Avatar() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ghost = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [zone, setZone] = useState<Zone>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);

  // ── preload every frame ────────────────────────────────────────────────
  const frames = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    let done = 0;
    let cancelled = false;
    for (let i = 0; i < COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        if (++done === COUNT && !cancelled) setReady(true);
      };
      img.src = src(i);
      frames.current[i] = img;
    }
    return () => {
      cancelled = true;
    };
  }, []);

  // ── player + interaction ───────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    const el = root.current!;
    const cv = canvas.current!;
    const gh = ghost.current!;
    const ctx = cv.getContext("2d")!;
    const motion = window.matchMedia(MOTION_OK).matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)").matches;

    const state = { head: F.idle[0] as number, target: F.idle[0] as number, idle: true, last: 0, raf: 0 };
    let current: Zone = "idle";
    const timers: number[] = [];
    const clear = () => timers.splice(0).forEach((t) => window.clearTimeout(t));
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const draw = (i: number) => {
      const img = frames.current[i];
      if (!img?.naturalWidth) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(img, 0, 0, cv.width, cv.height);
    };
    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const c of [cv, gh]) {
        c.width = Math.round(r.width * dpr);
        c.height = Math.round(r.height * dpr);
      }
      draw(state.head);
    };

    /** Leaving the greeting: cross-fade back to the photo pose instead of rewinding the whole wave. */
    const jumpTo = (i: number) => {
      const g = gh.getContext("2d")!;
      g.clearRect(0, 0, gh.width, gh.height);
      g.drawImage(cv, 0, 0);
      gh.style.transition = "none";
      gh.style.opacity = "1";
      state.head = i;
      draw(i);
      requestAnimationFrame(() => {
        gh.style.transition = "opacity 0.45s ease";
        gh.style.opacity = "0";
      });
    };

    const goTo = (target: number, idle = false) => {
      if (state.head < F.left && target >= F.left) jumpTo(F.left);
      state.target = target;
      state.idle = idle;
    };

    const tick = (t: number) => {
      state.raf = requestAnimationFrame(tick);
      if (t - state.last < 1000 / FPS) return;
      state.last = t;
      const d = state.target - state.head;
      if (d !== 0) {
        // walk faster through the in-between part of the strip, real speed during the wave
        const step = state.head > F.left && Math.abs(d) > 40 ? 2 : 1;
        state.head += Math.sign(d) * Math.min(step, Math.abs(d));
        draw(state.head);
        if (current === "center") setMessage(greetLine(state.head));
      } else if (state.idle) {
        // idle: drift back and forth inside the calm front-facing part
        state.target = state.head >= F.idle[1] ? F.idle[0] : F.idle[1];
      }
    };

    const react = (z: Zone) => {
      if (z === current) return;
      current = z;
      clear();
      setZone(z);
      if (z === "left" || z === "right") {
        goTo(z === "left" ? F.left : F.right);
        setMessage(z === "left" ? "Curious about my work?" : "Let’s build something reliable");
        later(() => react("idle"), HOLD_MS);
      } else if (z === "center") {
        goTo(F.greet);
        setMessage(greetLine(state.head));
      } else {
        goTo(F.idle[0], true);
        setMessage(null);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    if (motion) state.raf = requestAnimationFrame(tick);

    const cleanups: (() => void)[] = [];
    if (!motion) {
      // reduced motion: a single still frame, no playback
    } else if (!fine) {
      // touch devices: she greets you once after the intro, then settles
      const off = onIntroDone(() =>
        later(() => {
          react("center");
          later(() => react("idle"), 9000);
        }, 700)
      );
      cleanups.push(off);
    } else {
      setInteractive(true);
      const hero = el.closest("section") ?? document.body;
      let raf = 0;
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const w = window.innerWidth;
          react(e.clientX < w / 3 ? "left" : e.clientX > (w * 2) / 3 ? "right" : "center");
        });
      };
      const leave = () => {
        cancelAnimationFrame(raf);
        react("idle");
      };
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        hero.removeEventListener("pointermove", move);
        hero.removeEventListener("pointerleave", leave);
        cancelAnimationFrame(raf);
      });
    }

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      clear();
      cleanups.forEach((f) => f());
      setInteractive(false);
    };
  }, [ready]);

  const side = zone === "left" ? "is-left" : zone === "right" ? "is-right" : "is-center";

  return (
    <div ref={root} className={`avatar ${side}`} data-zone={zone}>
      <div className="hero-arch">
        <div className="pose-stack">
          {/* first idle frame shows immediately; the canvas takes over once every frame is loaded */}
          <img src={src(F.idle[0])} alt="Portrait of Ranim Abker" width={480} height={642} fetchPriority="high" style={{ opacity: ready ? 0 : 1 }} />
          <canvas ref={canvas} className="avatar-canvas" aria-hidden="true" />
          <canvas ref={ghost} className="avatar-canvas" aria-hidden="true" style={{ opacity: 0 }} />
        </div>
      </div>

      <p className="avatar-bubble" role="status" aria-live="polite" data-show={message ? "" : undefined}>
        <span key={message ?? "none"}>{message}</span>
      </p>

      {interactive && (
        <p className="avatar-hint">
          <span className="avatar-hint-cursor" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M5 3l14 7-6 2-2 6z" />
            </svg>
          </span>
          Move your cursor to interact
        </p>
      )}
    </div>
  );
}
