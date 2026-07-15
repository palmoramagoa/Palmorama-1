import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BRAND, HERO_IMAGES } from "@/data/content";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-[#1c1a16] text-[#ede5d3]">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMAGES[0]}
          alt="Palmorama Retreat in Mandrem"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/65" />
      </motion.div>

      <motion.div
        style={{ y: titleY, opacity }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-14 max-w-[1500px] mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[11px] md:text-xs tracking-[0.5em] uppercase opacity-80"
        >
          {BRAND.hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-serif italic mt-6 text-[14vw] sm:text-[10vw] md:text-[7.4vw] leading-[0.95] tracking-[-0.01em] max-w-[14ch]"
        >
          {BRAND.hero.title.split("\n").map((line, i) => (
            <span key={`${line}-${i}`} className="block">{line}</span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 max-w-md text-sm md:text-base opacity-85 leading-relaxed font-light"
        >
          {BRAND.hero.subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-[10px] tracking-[0.4em] uppercase"
      >
        <span className="mb-3 opacity-80">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
