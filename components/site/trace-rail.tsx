"use client";

import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

type Node = { top: number; label: string };

/**
 * The signal running down the story: a rail that lights up to the middle of the viewport, and nodes that
 * switch on as the signal reaches them.
 */
export function TraceRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);

  useGSAP(() => {
    const story = rail.current!.parentElement!;
    const fill = rail.current!.querySelector<HTMLElement>(".rail-fill")!;
    const head = rail.current!.querySelector<HTMLElement>(".rail-head")!;
    let nodeTops: number[] = [];

    const measure = () => {
      const base = story.getBoundingClientRect().top + window.scrollY;
      const found = Array.from(story.querySelectorAll<HTMLElement>("[data-span]")).map((el) => ({
        top: el.getBoundingClientRect().top + window.scrollY - base,
        label: el.dataset.span || "",
      }));
      nodeTops = found.map((n) => n.top);
      setNodes(found);
    };

    const update = () => {
      const base = story.getBoundingClientRect().top + window.scrollY;
      const h = story.offsetHeight;
      const y = Math.min(h, Math.max(0, window.scrollY + window.innerHeight * 0.5 - base));
      fill.style.transform = `scaleY(${(y / h).toFixed(4)})`;
      head.style.transform = `translate3d(-50%, ${y.toFixed(1)}px, 0)`;
      rail.current!.querySelectorAll<HTMLElement>(".rail-node").forEach((n, i) => n.classList.toggle("is-lit", y >= nodeTops[i]));
    };

    measure();
    update();
    ScrollTrigger.addEventListener("refresh", measure);
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update });
    return () => {
      ScrollTrigger.removeEventListener("refresh", measure);
      st.kill();
    };
  });

  return (
    <div ref={rail} className="rail" aria-hidden="true">
      <span className="rail-track" />
      <span className="rail-fill" />
      <span className="rail-head" />
      {nodes.map((n, i) => (
        <span key={i} className="rail-node" style={{ top: n.top }}>
          <span className="rail-node-label">{n.label}</span>
        </span>
      ))}
    </div>
  );
}
