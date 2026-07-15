import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { BRAND, HIGHLIGHTS } from "@/data/content";

// Word-by-word reveal headline
function RevealHeadline({ text }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const words = text.split(" ");
  return (
    <h2
      ref={ref}
      className="font-serif italic text-[8vw] md:text-[4.4vw] leading-[1.02] tracking-[-0.01em] text-[#1c1a16]"
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 1.1,
              ease: [0.2, 0.8, 0.2, 1],
              delay: i * 0.06,
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export default function Story() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative bg-[#ede5d3] text-[#1c1a16] py-32 md:py-44 overflow-hidden"
    >
      <motion.span
        style={{ y: markY }}
        className="pointer-events-none absolute -top-10 right-[-3vw] font-serif italic text-[28vw] md:text-[18vw] leading-none text-[#1c1a16]/[0.05] select-none"
      >
        Goa
      </motion.span>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-12 gap-12 md:gap-16 items-start">
        <div className="md:col-span-5 md:sticky md:top-32 self-start">
          <span className="text-[10px] tracking-[0.45em] uppercase opacity-70">
            Our Story — 01
          </span>
          <div className="mt-6">
            <RevealHeadline text={"A quiet farmhouse, woven into the palms."} />
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7 space-y-7">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-lg md:text-xl leading-relaxed font-light text-[#1c1a16]/85"
          >
            Escape to a serene farmhouse retreat in Mandrem, where nature and comfort blend
            seamlessly. Nestled amidst lush greenery, our stay offers a range of unique
            accommodations — from elegant suites to an enchanting dome — for those seeking a
            one-of-a-kind experience.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-base md:text-lg leading-relaxed font-light text-[#1c1a16]/70"
          >
            Unwind by our natural pool, designed to refresh your senses in a peaceful setting.
            Whether you’re here for relaxation, yoga, or a quiet getaway, our farmhouse promises a
            rejuvenating stay in the heart of Goa.
          </motion.p>

          <ul className="mt-10 divide-y divide-[#1c1a16]/15">
            {HIGHLIGHTS.map((h, i) => (
              <motion.li
                key={h}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="flex items-baseline gap-6 py-4"
              >
                <span className="text-[10px] tracking-[0.35em] opacity-50">
                  0{i + 1}
                </span>
                <span className="text-base md:text-lg font-light">{h}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="pt-6 mt-4"
            style={{ y: imgY }}
          >
            <a
              href={BRAND.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-[11px] tracking-[0.32em] uppercase px-7 py-4 border border-[#1c1a16] rounded-full hover:bg-[#1c1a16] hover:text-[#ede5d3] transition-colors duration-500"
            >
              Reserve your stay
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
