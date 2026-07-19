"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onDone?: () => void;
}

export function Typewriter({
  text,
  speed = 130,
  startDelay = 400,
  className,
  onDone,
}: TypewriterProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setCount(text.length);
      onDone?.();
      return;
    }
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!started) return;
    if (count >= text.length) {
      onDone?.();
      return;
    }
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, count, text.length, speed]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span className="caret" aria-hidden="true" />
    </span>
  );
}
