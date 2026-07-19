"use client";

import { useEffect, useState } from "react";

interface LocatorItem {
  slug: string;
  title: string;
}

export function BlogLocator({ posts }: { posts: LocatorItem[] }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);

      // pick the post whose vertical center is closest to the viewport center
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      posts.forEach((p, i) => {
        const el = document.getElementById(`post-${p.slug}`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [posts]);

  const jump = (slug: string) => {
    const el = document.getElementById(`post-${slug}`);
    if (!el) return;
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(el, { offset: -120 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      className={`fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 transition-opacity duration-300 lg:flex ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="博客定位"
    >
      {posts.map((p, i) => (
        <button
          key={p.slug}
          type="button"
          onClick={() => jump(p.slug)}
          aria-label={p.title}
          className="group flex items-center gap-2"
        >
          <span
            className={`h-[2px] rounded-full transition-all duration-300 ${
              i === active
                ? "w-9 bg-fg"
                : "w-4 bg-fg/25 group-hover:w-6 group-hover:bg-fg/50"
            }`}
          />
          <span
            className={`max-w-[180px] truncate font-mono text-[11px] text-fg transition-opacity duration-200 ${
              i === active ? "opacity-90" : "opacity-0 group-hover:opacity-70"
            }`}
          >
            {p.title}
          </span>
        </button>
      ))}
    </div>
  );
}
