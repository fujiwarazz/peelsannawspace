"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={
        !mounted ? "切换主题" : isDark ? "切换到浅色模式" : "切换到深色模式"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-stroke/25 text-fg transition-colors hover:bg-fg/5"
    >
      {mounted ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ y: 8, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -8, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
