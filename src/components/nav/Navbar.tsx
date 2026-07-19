"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { withBasePath } from "@/lib/basePath";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke/10 bg-base/70 backdrop-blur-md">
      <nav className="flex h-16 w-full items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className="brand-shimmer font-mono text-sm font-semibold tracking-tight transition-opacity hover:opacity-70 sm:text-base"
        >
          peelsannaw&apos;s space
        </Link>

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
