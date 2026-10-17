"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Site-wide scroll choreography for simple elements:
 *  [data-reveal]        fade + rise, batched so siblings stagger together
 *  [data-reveal="clip"] media unveiled with a clip-path wipe and a slow zoom-out
 *  [data-parallax="n"]  drifts n% of its height while crossing the viewport
 */
export function Reveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.set("[data-reveal]:not([data-reveal='clip'])", { autoAlpha: 0, y: 36 });
      ScrollTrigger.batch("[data-reveal]:not([data-reveal='clip'])", {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.09, duration: 1, ease: "expo.out", overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='clip']").forEach((el) => {
        const media = el.querySelector("img, video");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        tl.fromTo(el, { clipPath: "inset(18% 12% 18% 12% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 18px)", duration: 1.4, ease: "expo.out" });
        if (media) tl.fromTo(media, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "10");
        gsap.fromTo(el, { yPercent: amount }, { yPercent: -amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
  });

  return null;
}
