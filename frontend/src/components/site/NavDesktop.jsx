import React from "react";
import { NAV, BRAND } from "@/data/content";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-9 text-[11px] tracking-[0.32em] uppercase">
      {NAV.map((n) => (
        <a key={n.href} href={n.href} className="relative group">
          {n.label}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 group-hover:w-full" />
        </a>
      ))}
    </nav>
  );
}

export function BookButton() {
  return (
    <a
      href={BRAND.bookingUrl}
      target="_blank"
      rel="noreferrer"
      className="hidden md:inline-flex items-center text-[11px] tracking-[0.3em] uppercase px-5 py-3 border border-current rounded-full hover:bg-current hover:text-[#ede5d3] transition-colors duration-500"
    >
      Book Stay
    </a>
  );
}
