"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMusic, FiPause } from "react-icons/fi";
import { withBasePath } from "@/lib/basePath";

export function MusicBubble() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={playing ? "暂停背景音乐" : "播放背景音乐"}
        aria-pressed={playing}
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-stroke bg-base text-fg shadow-sm"
        animate={
          playing
            ? { scale: [1, 1.12, 1], y: [0, -4, 0] }
            : { y: [0, -6, 0], rotate: [-4, 4, -4] }
        }
        transition={{
          duration: playing ? 0.6 : 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileTap={{ scale: 0.9 }}
      >
        {playing ? <FiPause size={15} /> : <FiMusic size={15} />}
      </motion.button>

      {/* little tail connecting bubble to the head */}
      <span
        aria-hidden="true"
        className="absolute -bottom-1 left-2 h-2 w-2 rounded-full border-2 border-stroke bg-base"
      />

      <audio ref={audioRef} src={withBasePath("/audio/bgm-placeholder.wav")} loop preload="none" />
    </>
  );
}
