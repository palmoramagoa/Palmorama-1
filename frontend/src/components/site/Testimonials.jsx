import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = TESTIMONIALS[i];
  return (
    <section
      ref={ref}
      className="relative bg-[#ede5d3] text-[#1c1a16] py-32 md:py-44 overflow-hidden"
    >
      <motion.span
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-x-0 -top-10 text-center font-serif italic text-[28vw] md:text-[18vw] leading-none text-[#1c1a16]/[0.05] select-none"
      >
        Kind words
      </motion.span>

      <div className="relative max-w-[1100px] mx-auto px-6 md:px-14 text-center">
        <span className="text-[10px] tracking-[0.45em] uppercase opacity-60">
          From our guests
        </span>

        <Quote className="mx-auto mt-8 opacity-40" size={28} strokeWidth={1.2} />

        <div className="relative mt-6 min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="font-serif italic text-2xl md:text-4xl leading-[1.25] tracking-tight max-w-3xl mx-auto"
            >
              &ldquo;{t.body}&rdquo;
              <footer className="mt-9 not-italic">
                <div className="text-sm tracking-[0.3em] uppercase">{t.name}</div>
                <div className="text-[10px] tracking-[0.35em] uppercase opacity-60 mt-1">
                  {t.role}
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            aria-label="Previous testimonial"
            onClick={() => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="p-3 rounded-full border border-[#1c1a16]/30 hover:bg-[#1c1a16] hover:text-[#ede5d3] transition-colors duration-500"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={item.name}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-px transition-all duration-500 ${
                  i === idx ? "w-10 bg-[#1c1a16]" : "w-5 bg-[#1c1a16]/30"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => setI((p) => (p + 1) % TESTIMONIALS.length)}
            className="p-3 rounded-full border border-[#1c1a16]/30 hover:bg-[#1c1a16] hover:text-[#ede5d3] transition-colors duration-500"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
