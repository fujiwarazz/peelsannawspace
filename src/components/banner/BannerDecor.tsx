"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Cloud({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 56"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* pure white cloud with a faint outline so it reads on cream */}
      <path
        d="M22 44 C12 44 8 34 16 30 C14 20 28 16 34 24 C38 12 58 12 62 24 C74 18 84 26 78 34 C86 34 88 44 78 44 Z"
        fill="#ffffff"
        stroke="rgb(var(--stroke) / 0.16)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Rock({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 21 Q5 9 18 9 Q31 9 35 21 Z" fill="rgb(var(--bg-base))" />
      <path d="M12 21 q3 -6 9 -6" />
    </svg>
  );
}

function Grass({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 44 40"
      className={`grass-sway ${className ?? ""}`}
      style={style}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* blades of grass */}
      <path d="M6 38 C6 26 2 22 4 15" />
      <path d="M12 38 C12 24 16 20 14 11" />
      <path d="M18 38 C18 28 14 24 16 18" />
      {/* a little flower */}
      <path d="M32 38 V22" />
      <circle cx="32" cy="16" r="3" fill="rgb(var(--bg-base))" />
      <circle cx="27" cy="18" r="3" fill="rgb(var(--bg-base))" />
      <circle cx="37" cy="18" r="3" fill="rgb(var(--bg-base))" />
      <circle cx="29" cy="13" r="3" fill="rgb(var(--bg-base))" />
      <circle cx="35" cy="13" r="3" fill="rgb(var(--bg-base))" />
    </svg>
  );
}

export function BannerDecor() {
  const cloudsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cloudsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // clouds drift left → right along with the character (slower = parallax)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { xPercent: -4 },
        {
          xPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
      {/* clouds — pure white, drift left→right on scroll */}
      <div ref={cloudsRef} className="absolute inset-0 will-change-transform">
        <Cloud
          className="cloud-float absolute left-[6%] top-[13%] w-36 sm:w-48"
          style={{ animationDelay: "0s" }}
        />
        <Cloud
          className="cloud-float absolute left-[60%] top-[8%] w-44 sm:w-60"
          style={{ animationDelay: "1.6s" }}
        />
        <Cloud
          className="cloud-float absolute left-[44%] top-[24%] w-28 sm:w-36"
          style={{ animationDelay: "3.2s" }}
        />
        <Cloud
          className="cloud-float absolute left-[79%] top-[31%] w-32 sm:w-44"
          style={{ animationDelay: "2.4s" }}
        />
      </div>

      {/* ground doodles — staggered heights & sizes for a 2.5D depth feel */}
      <Grass
        className="absolute bottom-28 left-[26%] w-10 text-fg/60"
        style={{ animationDelay: "0s", animationDuration: "3.2s" }}
      />
      <Rock className="absolute bottom-36 left-[39%] w-7 text-fg/45" />
      <Grass
        className="absolute bottom-40 left-[57%] w-7 text-fg/40"
        style={{ animationDelay: "0.8s", animationDuration: "3.8s" }}
      />
      <Rock className="absolute bottom-28 left-[70%] w-11 text-fg/60" />
      <Grass
        className="absolute bottom-32 left-[83%] w-6 text-fg/40"
        style={{ animationDelay: "1.6s", animationDuration: "2.8s" }}
      />
    </div>
  );
}
