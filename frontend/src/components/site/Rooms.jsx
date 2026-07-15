import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ROOMS, BRAND } from "@/data/content";

function RoomCard({ room, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.05]);

  const isOdd = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`relative grid md:grid-cols-12 gap-8 md:gap-12 items-center py-20 md:py-28 ${
        isOdd ? "md:[&>div:first-child]:col-start-7" : ""
      }`}
    >
      <div
        className={`md:col-span-6 ${
          isOdd ? "md:order-2" : ""
        } relative overflow-hidden rounded-[3px] bg-[#1c1a16]/5`}
      >
        <div className="aspect-[4/5] w-full overflow-hidden">
          <motion.img
            src={room.images[0]}
            alt={room.name}
            style={{ y: imgY, scale: imgScale }}
            className="w-full h-[115%] object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <motion.div
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.7, 0, 0.3, 1] }}
          className="absolute inset-0 bg-[#ede5d3] origin-right"
        />
      </div>

      <div className={`md:col-span-5 ${isOdd ? "md:order-1 md:col-start-2" : "md:col-start-8"}`}>
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[10px] tracking-[0.45em] uppercase opacity-60"
        >
          0{index + 1} — The Rooms
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-serif italic text-5xl md:text-6xl leading-[1.02] tracking-tight mt-5"
        >
          {room.name}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-6 text-base md:text-lg font-light leading-relaxed text-[#1c1a16]/75"
        >
          {room.description}
        </motion.p>

        <div className="mt-8 flex items-baseline gap-4 border-y border-[#1c1a16]/15 py-5">
          <span className="font-serif text-3xl italic">{room.price}</span>
          <span className="text-xs tracking-[0.3em] uppercase opacity-60">{room.occupancy}</span>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-y-2 text-sm font-light text-[#1c1a16]/75">
          {room.amenities.map((a) => (
            <li key={a} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#1c1a16]/60" />
              {a}
            </li>
          ))}
        </ul>

        <a
          href={BRAND.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-9 inline-flex items-center text-[11px] tracking-[0.32em] uppercase px-7 py-4 border border-[#1c1a16] rounded-full hover:bg-[#1c1a16] hover:text-[#ede5d3] transition-colors duration-500"
        >
          Book {room.name.split(" ")[0]}
        </a>
      </div>
    </div>
  );
}

export default function Rooms() {
  return (
    <section id="stay" className="relative bg-[#ede5d3] text-[#1c1a16]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 pt-24 md:pt-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="text-[10px] tracking-[0.45em] uppercase opacity-60">
              Where to rest
            </span>
            <h2 className="font-serif italic text-[10vw] md:text-[6vw] leading-[0.95] tracking-tight mt-5">
              Rooms & Suites
            </h2>
          </div>
          <p className="max-w-md font-light text-[#1c1a16]/70 leading-relaxed">
            Four distinct ways to stay — a moonlit dome, two light-filled suites, and a generous
            family home. Each is built around the garden and its quiet.
          </p>
        </div>

        <div className="mt-6 md:mt-10">
          {ROOMS.map((r, i) => (
            <RoomCard key={r.id} room={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
