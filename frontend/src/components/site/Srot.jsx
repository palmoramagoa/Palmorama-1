import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Leaf, Music2, Droplets } from "lucide-react";
import { asset } from "@/data/content";

const EXPERIENCES = [
  {
    id: "yoga-shala",
    label: "Yoga Shala",
    icon: Leaf,
    image: asset("srot/yoga-shala.jpg"),
    eyebrow: "01 \u2014 Movement",
    title: "Yoga Shala",
    body:
      "Earth-built, open-air pavilion enveloped by tropical greenery for daily traditional asana, pranayama, and meditation. Breath meets canopy; movement settles into stillness.",
    meta: [
      { k: "Regular yoga", v: "8am – 9:30am" },
      { k: "Style", v: "Hatha \u00b7 Vinyasa" },
      { k: "Setting", v: "Open-air shala" },
    ],
  },
  {
    id: "sound-healing",
    label: "Sound Healing",
    icon: Music2,
    image: asset("srot/sound-healing.jpg"),
    eyebrow: "02 \u2014 Resonance",
    title: "Sound Healing",
    body:
      "Immersive acoustic journeys using Tibetan singing bowls, crystal bowls, and gongs for deep cellular relaxation. Lie back; let the room hold you.",
    meta: [
      { k: "Sessions", v: "Weekly" },
      { k: "Length", v: "60\u201390 min" },
      { k: "Held in", v: "Sacred Shala" },
    ],
  },
  {
    id: "holistic-living",
    label: "Holistic Living",
    icon: Droplets,
    image: asset("srot/holistic-living.jpg"),
    eyebrow: "03 \u2014 Nourishment",
    title: "Holistic Living",
    body:
      "Cleanse in Goa\u2019s premier chemical-free natural eco-pool and nourish with organic, farm-to-table cuisine. A daily practice of returning to the source.",
    meta: [
      { k: "Pool", v: "Chemical-free" },
      { k: "Kitchen", v: "Organic, seasonal" },
      { k: "Origin", v: "Farm-to-table" },
    ],
  },
];

function SideRail({ active, onJump, progress }) {
  return (
    <div className="hidden md:flex pointer-events-none absolute top-0 left-6 lg:left-10 h-full z-20 items-center">
      <div className="pointer-events-auto flex flex-col items-start gap-8">
        <div className="relative">
          <span className="absolute left-[5px] top-0 bottom-0 w-px bg-[#ede5d3]/15" />
          <motion.span
            style={{ height: progress }}
            className="absolute left-[5px] top-0 w-px bg-[#ede5d3]/85 origin-top"
          />

          <ul className="relative flex flex-col gap-10">
            {EXPERIENCES.map((e, i) => {
              const isActive = i === active;
              return (
                <li key={e.id}>
                  <button
                    onClick={() => onJump(i)}
                    className="group flex items-center gap-4 text-left"
                  >
                    <span
                      className={`relative block w-[11px] h-[11px] rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-[#ede5d3] bg-[#ede5d3]"
                          : "border-[#ede5d3]/45 bg-transparent group-hover:border-[#ede5d3]/90"
                      }`}
                    />
                    <span className="flex flex-col leading-tight">
                      <span
                        className={`text-[10px] tracking-[0.4em] uppercase transition-colors duration-500 ${
                          isActive ? "text-[#ede5d3]" : "text-[#ede5d3]/55"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className={`font-serif italic text-base md:text-lg transition-colors duration-500 ${
                          isActive
                            ? "text-[#ede5d3]"
                            : "text-[#ede5d3]/55 group-hover:text-[#ede5d3]/90"
                        }`}
                      >
                        {e.label}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PanelContent({ data, isActive }) {
  const Icon = data.icon;
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 24,
        pointerEvents: isActive ? "auto" : "none",
      }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ gridArea: "1 / 1" }}
      className="self-center max-w-2xl text-[#ede5d3]"
    >
      <div className="flex items-center gap-4">
        <span className="w-11 h-11 rounded-full border border-[#ede5d3]/40 flex items-center justify-center">
          <Icon size={18} strokeWidth={1.2} />
        </span>
        <span className="text-[10px] tracking-[0.45em] uppercase opacity-75">
          {data.eyebrow}
        </span>
      </div>

      <h3 className="font-serif italic text-6xl md:text-7xl mt-7 leading-[0.95]">
        {data.title}
      </h3>

      <p className="mt-7 text-base md:text-lg font-light leading-relaxed opacity-90 max-w-xl">
        {data.body}
      </p>

      <dl className="mt-10 grid grid-cols-3 gap-6 max-w-lg border-t border-[#ede5d3]/20 pt-6">
        {data.meta.map((m) => (
          <div key={m.k}>
            <dt className="text-[10px] tracking-[0.4em] uppercase opacity-65">
              {m.k}
            </dt>
            <dd className="font-serif italic text-lg md:text-xl mt-2 leading-tight">
              {m.v}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

export default function Srot() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // 3 panels evenly spread
      const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2;
      setActive((prev) => (prev === next ? prev : next));
    });
    return () => unsub();
  }, [scrollYProgress]);

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const jumpTo = (i) => {
    const sectionEl = ref.current;
    if (!sectionEl) return;
    const sectionTop = sectionEl.offsetTop;
    const sectionHeight = sectionEl.offsetHeight;
    // Land in the middle of each segment for a clean active state
    const fraction = (i + 0.5) / EXPERIENCES.length;
    const target = sectionTop + sectionHeight * fraction - window.innerHeight / 2;
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.4 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <section
      id="srot"
      ref={ref}
      className="relative bg-[#0e0d0b] text-[#ede5d3]"
      style={{ height: "300vh" }}
    >
      {/* Sticky stage holds bg + rail + content for the full scroll duration */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image stack — cross-fades between experiences */}
        {EXPERIENCES.map((e, i) => (
          <motion.div
            key={e.id}
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              scale: i === active ? 1.06 : 1.14,
            }}
            transition={{
              opacity: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] },
              scale: { duration: 6, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <img
              src={e.image}
              alt={e.title}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />

        {/* Side rail */}
        <SideRail active={active} onJump={jumpTo} progress={progressHeight} />

        {/* Big Srot logo — top left */}
        <motion.a
          href="#srot"
          aria-label="Srot — The Source"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute top-8 md:top-10 left-6 md:left-12 z-20"
        >
          <img
            src={asset("srot-logo.png")}
            alt="Srot"
            className="w-[140px] md:w-[180px] lg:w-[210px] h-auto opacity-95 select-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]"
            decoding="async"
            draggable={false}
          />
        </motion.a>

        {/* Intro mark — top right */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute top-10 md:top-14 right-6 md:right-14 text-right max-w-xs hidden sm:block z-10"
        >
          <span className="text-[10px] tracking-[0.45em] uppercase opacity-75">
            Wellness at Palmorama, Mandrem
          </span>
          <p className="mt-3 font-serif italic text-base md:text-lg opacity-90 leading-snug">
            Return to your source. A sanctuary for holistic healing, conscious
            movement, and inner resonance.
          </p>
        </motion.div>

        {/* Stack of panels — fade between them (CSS grid, single cell) */}
        <div
          className="absolute inset-0 z-10 grid px-6 md:pl-[18%] md:pr-[8%]"
          style={{ gridTemplateRows: "1fr", gridTemplateColumns: "1fr" }}
        >
          {EXPERIENCES.map((e, i) => (
            <PanelContent key={e.id} data={e} isActive={i === active} />
          ))}
        </div>

        {/* Mobile pip indicator */}
        <div className="md:hidden absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
          {EXPERIENCES.map((e, i) => (
            <button
              key={e.id}
              aria-label={`Go to ${e.label}`}
              onClick={() => jumpTo(i)}
              className={`h-px transition-all duration-500 ${
                i === active ? "w-10 bg-[#ede5d3]" : "w-5 bg-[#ede5d3]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
