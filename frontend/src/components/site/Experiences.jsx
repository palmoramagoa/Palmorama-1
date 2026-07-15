import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "@/data/content";

function ExperienceCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
      className="group"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-[3px]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform image-hover-slow group-hover:scale-[1.06]"
        />
      </div>
      <h3 className="font-serif italic text-2xl md:text-3xl mt-6">{item.title}</h3>
      <p className="mt-3 text-sm md:text-base font-light opacity-75 leading-relaxed">
        {item.body}
      </p>
    </motion.article>
  );
}

export default function Experiences() {
  return (
    <div id="experiences" className="max-w-[1400px] mx-auto px-6 md:px-14 mt-32 md:mt-44">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <span className="text-[10px] tracking-[0.45em] uppercase opacity-65">Experiences</span>
          <h2 className="font-serif italic text-5xl md:text-6xl mt-5 leading-[1.02]">
            Slow rituals of the grove.
          </h2>
        </div>
        <p className="max-w-sm font-light opacity-75">
          Small daily ceremonies that make the days feel longer in the best possible way.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {EXPERIENCES.map((e, i) => (
          <ExperienceCard key={e.title} item={e} index={i} />
        ))}
      </div>
    </div>
  );
}
