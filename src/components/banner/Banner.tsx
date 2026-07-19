"use client";

import { motion } from "framer-motion";
import { Typewriter } from "./Typewriter";
import { CharacterScene } from "./CharacterScene";
import { BannerDecor } from "./BannerDecor";

export function Banner() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5">
      {/* clouds / grass / rocks */}
      <BannerDecor />

      {/* Main + subtitle, shifted up from center */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center -translate-y-20 sm:-translate-y-28">
        <h1 className="text-5xl font-semibold tracking-tightest text-fg sm:text-7xl md:text-8xl">
          <Typewriter text="@Peelsannaw" speed={65} startDelay={250} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-6 flex flex-col items-center gap-2"
        >
          <p className="text-base font-light text-muted sm:text-lg">
            Study in UCAS, Muisc, FPS Game, and AI dev
          </p>
         
        </motion.div>
      </div>

      {/* Line-art character walking on the bottom road */}
      <CharacterScene />

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/60"
      >
        scroll
      </motion.div>
    </section>
  );
}
