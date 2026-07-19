"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CharacterSvg } from "./CharacterSvg";
import { MusicBubble } from "./MusicBubble";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CharacterScene() {
  const moverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = moverRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Drive horizontal "walk forward" from page scroll progress.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: 0 },
        {
          xPercent: 260,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 select-none">
      {/* the road — full-bleed baseline the character walks on */}
      <div className="absolute inset-x-0 bottom-28 h-px bg-stroke/25" />

      {/* character walks along the road; starts inset from the left edge */}
      <div
        ref={moverRef}
        className="absolute bottom-28 left-4 will-change-transform sm:left-12"
      >
        {/* the SVG carries its own walking / tail / leg animations */}
        <div className="pointer-events-auto relative">
          {/* -mb keeps the feet sitting on the road line */}
          <CharacterSvg className="-mb-[6px] h-40 w-auto text-fg sm:h-44" />

          {/* click the boy → about me */}
          <Link
            href="/about"
            aria-label="关于我"
            className="group absolute inset-y-0 left-0 w-[30%] cursor-pointer"
          >
            <span className="pointer-events-none absolute left-1/2 top-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-stroke/20 bg-base/90 px-2 py-0.5 font-mono text-[10px] text-fg opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
              关于我 →
            </span>
          </Link>

          {/* click the dog → pets */}
          <Link
            href="/pets"
            aria-label="我的宠物"
            className="group absolute bottom-0 right-0 h-[60%] w-[34%] cursor-pointer"
          >
            <span className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2 whitespace-nowrap rounded-full border border-stroke/20 bg-base/90 px-2 py-0.5 font-mono text-[10px] text-fg opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
              我的宠物 →
            </span>
          </Link>

          {/* interactive music bubble floating above the boy's head */}
          <div className="absolute left-[17%] top-0 -translate-y-8">
            <MusicBubble />
          </div>
        </div>
      </div>
    </div>
  );
}
