import React from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { BRAND } from "@/data/content";

function InfoRow({ icon: Icon, label, value, href }) {
  const inner = (
    <>
      <span className="w-10 h-10 rounded-full border border-[#1c1a16]/30 flex items-center justify-center group-hover:bg-[#1c1a16] group-hover:text-[#ede5d3] transition-colors duration-500">
        <Icon size={16} />
      </span>
      <div>
        <div className="text-[10px] tracking-[0.4em] uppercase opacity-60">{label}</div>
        <div className="font-serif text-xl italic mt-0.5 leading-tight">{value}</div>
      </div>
    </>
  );
  return href ? (
    <a href={href} className="flex items-center gap-4 group">
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-4">{inner}</div>
  );
}

export default function ContactInfo() {
  return (
    <div className="md:col-span-5">
      <span className="text-[10px] tracking-[0.45em] uppercase opacity-60">
        Get in touch
      </span>
      <h2 className="font-serif italic text-5xl md:text-7xl mt-5 leading-[1.02]">
        Come stay
        <br />
        with us.
      </h2>
      <p className="mt-6 font-light text-base md:text-lg opacity-75 max-w-md leading-relaxed">
        Plan your retreat at Palmorama. We&rsquo;d love to host you in the heart of Mandrem.
      </p>

      <div className="mt-10 space-y-6">
        <InfoRow icon={Phone} label="Telephone" value={BRAND.phone} href={`tel:${BRAND.phoneRaw}`} />
        <InfoRow icon={Mail} label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} />
        <InfoRow icon={MapPin} label="Address" value={BRAND.address} />
      </div>

      <div className="mt-10 flex gap-4">
        <a
          href={BRAND.social.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="w-11 h-11 rounded-full border border-[#1c1a16]/30 flex items-center justify-center hover:bg-[#1c1a16] hover:text-[#ede5d3] transition-colors duration-500"
        >
          <Instagram size={16} />
        </a>
        <a
          href={BRAND.social.facebook}
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
          className="w-11 h-11 rounded-full border border-[#1c1a16]/30 flex items-center justify-center hover:bg-[#1c1a16] hover:text-[#ede5d3] transition-colors duration-500"
        >
          <Facebook size={16} />
        </a>
        <a
          href={BRAND.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase px-5 py-3 rounded-full border border-[#1c1a16] hover:bg-[#1c1a16] hover:text-[#ede5d3] transition-colors duration-500"
        >
          WhatsApp <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
