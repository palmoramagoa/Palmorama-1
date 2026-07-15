import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BRAND } from "@/data/content";

function Field({ label, type = "text", value, onChange, required }) {
  const isArea = type === "textarea";
  return (
    <div>
      <label className="text-[10px] tracking-[0.4em] uppercase opacity-60">{label}</label>
      {isArea ? (
        <textarea
          rows={5}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-[#1c1a16]/40 focus:border-[#1c1a16] outline-none py-3 text-base font-light resize-none transition-colors duration-300"
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-[#1c1a16]/40 focus:border-[#1c1a16] outline-none py-3 text-lg font-serif italic transition-colors duration-300"
        />
      )}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry from ${form.name || "website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
      className="md:col-span-6 md:col-start-7 space-y-6"
    >
      <Field
        label="Your name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Field
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Field
        label="Message"
        type="textarea"
        required
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <div className="flex items-center justify-between pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase px-7 py-4 border border-[#1c1a16] rounded-full hover:bg-[#1c1a16] hover:text-[#ede5d3] transition-colors duration-500"
        >
          Send message <ArrowUpRight size={14} />
        </button>
        {sent && (
          <span className="text-xs tracking-[0.25em] uppercase opacity-70">
            Opening your email…
          </span>
        )}
      </div>
    </motion.form>
  );
}
