"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";
import { getIcon, readableHex } from "@/lib/icons";
import type { Media } from "@/lib/content";

// ── Headings ─────────────────────────────────────────────────────────────

type Tag = "h1" | "h2" | "h3" | "p";

/** Title made of a plain part and an italic serif part; words rise out of a mask when scrolled into view. */
export function SplitTitle({
  plain,
  em,
  after,
  as: As = "h2",
  className = "",
  id,
  delay = 0,
}: {
  plain?: string;
  em?: string;
  after?: string;
  as?: Tag;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(ref.current!, { type: "words", mask: "words", wordsClass: "w" });
        gsap.from(split.words, {
          yPercent: 110,
          rotate: 4,
          duration: 1.1,
          stagger: 0.06,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
        return () => split.revert();
      });
    },
    { scope: ref }
  );

  return (
    <As ref={ref as never} id={id} className={`split-title ${className}`}>
      {plain}
      {plain && em ? " " : null}
      {em ? <em>{em}</em> : null}
      {after ? <> {after}</> : null}
    </As>
  );
}

/** Small mono label used above titles: "03 — Builds". */
export function Kicker({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <p className="kicker" data-reveal>
      {n ? <span className="kicker-n">{n}</span> : null}
      <span className="kicker-line" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

// ── Technology chip with official logo ───────────────────────────────────

export function TechChip({ name, size = "md", style }: { name: string; size?: "sm" | "md"; style?: CSSProperties }) {
  const icon = getIcon(name);
  const brand = icon ? readableHex(icon.hex) : undefined;
  return (
    <span className={`chip chip-${size}`} style={{ ...(brand ? { ["--brand" as string]: brand } : {}), ...style }}>
      {icon ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="chip-icon">
          <path d={icon.path} />
        </svg>
      ) : (
        <span className="chip-dot" aria-hidden="true" />
      )}
      {name}
    </span>
  );
}

// ── Media ────────────────────────────────────────────────────────────────

/** Muted looping preview that only plays while visible (and never autoplays for reduced motion). */
export function LoopVideo({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    if (reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === "none") video.preload = "auto";
          video.play().catch(() => {});
        } else video.pause();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`loop-video ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced}
      aria-label={label}
    />
  );
}

export function Frame({ kind = "browser", label, children, className = "" }: { kind?: "browser" | "phone"; label?: string; children: ReactNode; className?: string }) {
  if (kind === "phone") {
    return (
      <figure className={`frame-phone ${className}`}>
        <div className="frame-phone-body">
          <span className="frame-phone-notch" aria-hidden="true" />
          {children}
        </div>
        {label ? <figcaption>{label}</figcaption> : null}
      </figure>
    );
  }
  return (
    <figure className={`frame-browser ${className}`}>
      <div className="frame-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="frame-view">{children}</div>
      {label ? <figcaption>{label}</figcaption> : null}
    </figure>
  );
}

export function MediaView({ media, className = "" }: { media: Media; className?: string }) {
  const inner =
    media.kind === "video" ? (
      <LoopVideo src={media.src} poster={media.poster} label={media.label} />
    ) : (
      <img src={media.src} alt={media.label} width={media.w} height={media.h} loading="lazy" decoding="async" />
    );
  if (!media.frame) {
    return (
      <figure className={`frame-plain ${className}`}>
        {inner}
        {media.kind === "image" && media.note ? <figcaption>{media.note}</figcaption> : null}
      </figure>
    );
  }
  return (
    <Frame kind={media.frame} label={media.label} className={className}>
      {inner}
    </Frame>
  );
}

// ── Full demo lightbox ───────────────────────────────────────────────────

export function DemoButton({ demo }: { demo: { src: string; label: string; duration: string } }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialog.current?.showModal();
    document.documentElement.classList.add("is-locked");
  };
  const close = () => {
    video.current?.pause();
    dialog.current?.close();
  };

  return (
    <>
      <button type="button" className="btn btn-ghost" onClick={show}>
        <span className="play-glyph" aria-hidden="true" />
        Watch full demo <span className="btn-meta">{demo.duration}</span>
      </button>
      <dialog
        ref={dialog}
        className="demo-dialog"
        aria-label={demo.label}
        onClose={() => {
          setOpen(false);
          document.documentElement.classList.remove("is-locked");
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="demo-dialog-inner">
          <div className="demo-dialog-head">
            <p>{demo.label}</p>
            <button type="button" className="demo-close" onClick={close} aria-label="Close video">
              ×
            </button>
          </div>
          {open ? <video ref={video} src={demo.src} controls autoPlay playsInline preload="metadata" /> : null}
        </div>
      </dialog>
    </>
  );
}

// ── Micro-interactions ───────────────────────────────────────────────────

/** Pulls its child gently towards the pointer. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (hover: hover)`, () => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}

/** Number that counts up the first time it enters the viewport. */
export function Counter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { v: 0 };
        const num = ref.current!.querySelector(".counter-n")!;
        num.textContent = "0";
        gsap.to(state, {
          v: value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          onUpdate: () => {
            num.textContent = String(Math.round(state.v));
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={`counter ${className}`}>
      <span className="counter-n">{value}</span>
      {suffix ? <span className="counter-suffix">{suffix}</span> : null}
    </span>
  );
}

export function Arrow({ dir = "ne" }: { dir?: "ne" | "down" | "right" }) {
  const rot = dir === "ne" ? 0 : dir === "right" ? 45 : 135;
  return (
    <svg className="arrow" viewBox="0 0 16 16" width="0.8em" height="0.8em" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
