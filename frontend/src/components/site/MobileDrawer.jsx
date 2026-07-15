import React from "react";
import { X, Phone } from "lucide-react";
import { BRAND, NAV, asset } from "@/data/content";

export default function MobileDrawer({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-[#1c1a16] text-[#ede5d3] md:hidden">
      <div className="h-[110px] flex items-center justify-between px-6">
        <span className="flex flex-col items-start leading-none gap-1.5">
          <img
            src={asset("logo.png")}
            alt={BRAND.name}
            className="h-16 w-auto object-contain"
            decoding="async"
            draggable={false}
          />
          <span className="font-serif text-base italic">{BRAND.name}</span>
        </span>
        <button onClick={onClose} aria-label="Close menu" className="p-2">
          <X size={22} />
        </button>
      </div>
      <nav className="flex flex-col px-6 mt-8 gap-6">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            onClick={onClose}
            className="font-serif text-3xl italic border-b border-[#ede5d3]/15 pb-5"
          >
            {n.label}
          </a>
        ))}
        <a
          href={BRAND.bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex justify-center items-center text-[12px] tracking-[0.3em] uppercase px-5 py-4 border border-[#ede5d3] rounded-full"
        >
          Book Stay
        </a>
        <a
          href={`tel:${BRAND.phoneRaw}`}
          className="inline-flex justify-center items-center gap-2 text-[12px] tracking-[0.25em] uppercase opacity-80"
        >
          <Phone size={14} /> {BRAND.phone}
        </a>
      </nav>
    </div>
  );
}
