"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  // close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke/10 bg-base/70 backdrop-blur-md">
      <nav className="relative flex h-16 w-full items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className="brand-shimmer font-mono text-sm font-semibold tracking-tight transition-opacity hover:opacity-70 sm:text-base"
        >
          peelsannaw&apos;s space
        </Link>

        {/* desktop center menu — appears after scrolling past the banner */}
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

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          {/* mobile hamburger button */}
          <button
            type="button"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke/25 text-fg transition-colors hover:bg-fg/5 md:hidden"
          >
            {mobileOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>

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

      {/* mobile dropdown menu */}
      <div
        className={`overflow-hidden border-stroke/10 bg-base/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-72 border-t" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-stroke/10 py-3 font-mono text-sm text-fg/80 transition-colors last:border-b-0 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
