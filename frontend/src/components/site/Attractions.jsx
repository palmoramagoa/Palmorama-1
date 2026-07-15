import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ATTRACTIONS } from "@/data/content";

function Attraction({ a, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const isOdd = i % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative h-[80svh] md:h-[100svh] flex items-end overflow-hidden"
    >
      <motion.img
        src={a.image}
        alt={a.title}
        loading="lazy"
        decoding="async"
        style={{ y, scale }}
        className="absolute inset-0 w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

      <div
        className={`relative z-10 max-w-[1400px] mx-auto px-6 md:px-14 pb-16 md:pb-24 w-full text-[#ede5d3] ${
          isOdd ? "text-right md:ml-auto" : ""
        }`}
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[10px] tracking-[0.45em] uppercase opacity-80"
        >
          {a.eyebrow}
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-serif italic text-6xl md:text-8xl mt-4 leading-[0.95]"
        >
          {a.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className={`mt-6 max-w-md font-light opacity-90 leading-relaxed ${
            isOdd ? "ml-auto" : ""
          }`}
        >
          {a.body}
        </motion.p>
      </div>
    </div>
  );
}

export default function Attractions() {
  return (
    <section className="relative bg-[#1c1a16]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 pt-28 md:pt-36 text-[#ede5d3]">
        <span className="text-[10px] tracking-[0.45em] uppercase opacity-60">
          Beyond the gate
        </span>
        <h2 className="font-serif italic text-5xl md:text-7xl mt-5 leading-[1.02] max-w-3xl">
          The beaches that shape our shoreline.
        </h2>
      </div>
      <div className="mt-16 md:mt-24">
        {ATTRACTIONS.map((a, i) => (
          <Attraction key={a.title} a={a} i={i} />
        ))}
      </div>
    </section>
  );
}
