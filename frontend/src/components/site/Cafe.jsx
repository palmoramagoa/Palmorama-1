import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CAFE } from "@/data/content";
import Experiences from "@/components/site/Experiences";

function CafeIntro() {
  return (
    <div className="md:col-span-5 md:sticky md:top-32 self-start">
      <span className="text-[10px] tracking-[0.45em] uppercase opacity-65">
        {CAFE.eyebrow}
      </span>
      <h2 className="font-serif italic text-6xl md:text-7xl mt-6 leading-[1.02] tracking-tight">
        {CAFE.title}
      </h2>
      <p className="mt-7 font-light text-base md:text-lg leading-relaxed opacity-80 max-w-md">
        {CAFE.body}
      </p>
      <div className="mt-10 flex gap-10 text-[10px] tracking-[0.4em] uppercase opacity-70">
        <div>
          <div className="opacity-60">Open</div>
          <div className="mt-2 text-[#ede5d3] font-serif italic text-lg normal-case tracking-normal">
            8am — 11pm
          </div>
        </div>
        <div>
          <div className="opacity-60">Where</div>
          <div className="mt-2 text-[#ede5d3] font-serif italic text-lg normal-case tracking-normal">
            In the garden
          </div>
        </div>
      </div>
    </div>
  );
}

function CafeGallery({ scrollYProgress }) {
  const y1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-5%", "20%"]);

  return (
    <div className="md:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
      <motion.div
        style={{ y: y1 }}
        className="col-span-2 md:col-span-1 aspect-[3/4] overflow-hidden rounded-[3px]"
      >
        <img src={CAFE.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="col-span-2 md:col-span-1 mt-0 md:mt-16 aspect-[4/5] overflow-hidden rounded-[3px]"
      >
        <img src={CAFE.images[1]} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </motion.div>
      <motion.div
        style={{ y: y3 }}
        className="col-span-2 aspect-[16/9] overflow-hidden rounded-[3px]"
      >
        <img src={CAFE.images[2]} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </motion.div>
    </div>
  );
}

export default function Cafe() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="cafe"
      ref={ref}
      className="relative bg-[#1c1a16] text-[#ede5d3] py-32 md:py-44 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-12 gap-10 md:gap-16">
        <CafeIntro />
        <CafeGallery scrollYProgress={scrollYProgress} />
      </div>
      <Experiences />
    </section>
  );
}
