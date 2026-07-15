import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { BRAND, asset } from "@/data/content";
import { DesktopNav, BookButton } from "@/components/site/NavDesktop";
import MobileDrawer from "@/components/site/MobileDrawer";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-700 ${
          scrolled
            ? "bg-[#ede5d3]/85 backdrop-blur-md text-[#1c1a16] border-b border-[#1c1a16]/10"
            : "bg-transparent text-[#ede5d3]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[110px] flex items-center justify-between">
          <a href="#top" className="flex flex-col items-start leading-none gap-1.5">
            <img
              src={asset("logo.png")}
              alt={BRAND.name}
              className={`h-16 md:h-20 w-auto object-contain transition-[filter] duration-700 ${
                scrolled ? "[filter:brightness(0)]" : ""
              }`}
              decoding="async"
              draggable={false}
            />
            <span className="font-serif text-base md:text-lg italic tracking-tight">{BRAND.name}</span>
          </a>

          <DesktopNav />

          <div className="flex items-center gap-3">
            <BookButton />
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="md:hidden p-2"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
