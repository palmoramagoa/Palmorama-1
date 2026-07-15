import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GALLERY } from "@/data/content";

export default function Gallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Horizontal pan based on scroll within sticky section
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);
  const heading = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative bg-[#1c1a16] text-[#ede5d3]"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute top-12 md:top-16 inset-x-0 z-10 px-6 md:px-14 flex justify-between items-end pointer-events-none">
          <div>
            <span className="text-[10px] tracking-[0.45em] uppercase opacity-60">
              The Grove — Frames
            </span>
            <motion.h2
              style={{ opacity: heading }}
              className="font-serif italic text-5xl md:text-7xl mt-3 leading-[1]"
            >
              Moments at Palmorama.
            </motion.h2>
          </div>
          <span className="hidden md:block text-[10px] tracking-[0.4em] uppercase opacity-50">
            Scroll →
          </span>
        </div>

        <motion.div
          style={{ x }}
          className="flex items-center gap-6 md:gap-10 h-full pl-6 md:pl-14 pt-[18vh] pb-[8vh] will-change-transform"
        >
          {GALLERY.map((src, i) => {
            const heightVariants = [
              "h-[58vh] w-[44vw] md:w-[26vw]",
              "h-[64vh] w-[48vw] md:w-[30vw]",
              "h-[52vh] w-[40vw] md:w-[22vw]",
              "h-[68vh] w-[52vw] md:w-[34vw]",
            ];
            const cls = heightVariants[i % heightVariants.length];
            return (
              <div
                key={src + i}
                className={`relative shrink-0 overflow-hidden rounded-[3px] ${cls}`}
              >
                <img
                  src={src}
                  alt={`Palmorama frame ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform image-hover-slower hover:scale-[1.04]"
                />
                <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.3em] uppercase opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
          <div className="shrink-0 w-[20vw]" />
        </motion.div>
      </div>
    </section>
  );
}
