import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.random() * 9 + 4;
      if (v >= 100) {
        v = 100;
        clearInterval(t);
        setTimeout(() => setDone(true), 450);
      }
      setPct(Math.floor(v));
    }, 110);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1c1a16] text-[#ede5d3]"
        >
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-70 mb-5">
              Mandrem · Goa
            </span>
            <h1 className="font-serif text-5xl md:text-7xl leading-none italic">
              Palmorama
            </h1>
            <span className="mt-3 text-[10px] tracking-[0.45em] uppercase opacity-60">
              Retreat Home
            </span>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[78%] max-w-[520px]">
            <div className="flex justify-between text-[10px] tracking-[0.35em] uppercase mb-3 opacity-70">
              <span>Loading the grove</span>
              <span>{pct}%</span>
            </div>
            <div className="h-px w-full bg-[#ede5d3]/15 overflow-hidden">
              <motion.div
                className="h-full bg-[#ede5d3]"
                style={{ width: `${pct}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
