"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { withBasePath } from "@/lib/basePath";

const navItems = [
  { label: "我的信息", href: "/about" },
  { label: "归档博客", href: "/archive" },
  { label: "标签分类", href: "/tags" },
  { label: "我的AIBot", href: "/bot" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showMenu, setShowMenu] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setShowMenu(true);
      return;
    }
    const onScroll = () => {
      setShowMenu(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke/10 bg-base/70 backdrop-blur-md">
      <nav className="relative flex h-16 w-full items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className="brand-shimmer font-mono text-sm font-semibold tracking-tight transition-opacity hover:opacity-70 sm:text-base"
        >
          peelsannaw&apos;s space
        </Link>

        {/* center menu — appears after scrolling past the banner */}
        <div
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 transition-all duration-300 md:flex ${
            showMenu
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-xs text-fg/70 transition-colors hover:text-fg sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span
            aria-hidden="true"
            className="pointer-events-none select-none overflow-hidden rounded-full border border-stroke/25 text-fg"
          >
            {/* Avatar — display only, not interactive */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBasePath("/avatar.jpg")}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 object-cover"
              draggable={false}
            />
          </span>
        </div>
      </nav>
    </header>
  );
}
