import React from "react";
import ContactInfo from "@/components/site/ContactInfo";
import ContactForm from "@/components/site/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#ede5d3] text-[#1c1a16] py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid md:grid-cols-12 gap-12">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
}
