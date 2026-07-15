import React from "react";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";
import { BRAND, NAV } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative bg-[#1c1a16] text-[#ede5d3] pt-24 pb-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14">
        <h3 className="font-serif italic text-[16vw] md:text-[10vw] leading-[0.9] tracking-[-0.02em]">
          Palmorama.
        </h3>
        <p className="mt-6 max-w-xl font-light opacity-75 leading-relaxed">
          Experience a tranquil stay at Palmorama Retreat Home, where comfort meets nature.
          Reserve your perfect getaway and settle into the serene beauty of Mandrem.
        </p>

        <div className="mt-16 grid md:grid-cols-12 gap-10 border-t border-[#ede5d3]/15 pt-12">
          <div className="md:col-span-4">
            <div className="text-[10px] tracking-[0.45em] uppercase opacity-60">Visit</div>
            <p className="font-serif italic text-xl mt-3 leading-tight">{BRAND.address}</p>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.45em] uppercase opacity-60">Reach</div>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="font-serif italic text-xl mt-3 flex items-center gap-2 hover:opacity-80"
            >
              <Phone size={14} /> {BRAND.phone}
            </a>
            <a
              href={`mailto:${BRAND.email}`}
              className="font-serif italic text-base mt-2 flex items-center gap-2 hover:opacity-80"
            >
              <Mail size={14} /> {BRAND.email}
            </a>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.45em] uppercase opacity-60">Explore</div>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:opacity-70">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 flex md:justify-end items-start gap-3">
            <a
              href={BRAND.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-[#ede5d3]/30 flex items-center justify-center hover:bg-[#ede5d3] hover:text-[#1c1a16] transition-colors duration-500"
            >
              <Instagram size={15} />
            </a>
            <a
              href={BRAND.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-[#ede5d3]/30 flex items-center justify-center hover:bg-[#ede5d3] hover:text-[#1c1a16] transition-colors duration-500"
            >
              <Facebook size={15} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[10px] tracking-[0.35em] uppercase opacity-60">
          <span>© {new Date().getFullYear()} Palmorama Retreat Home</span>
          <span>Mandrem · Pernem · Goa</span>
        </div>
      </div>
    </footer>
  );
}
