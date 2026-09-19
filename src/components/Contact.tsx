"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { sendOwnerEmail } from "@/utils/email";
import { useToast } from "@/components/Toast";
import SocialLinks from "./SocialLinks";
import { FaSpinner } from "react-icons/fa6";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const router = useRouter();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);

  // Spam himoyasi: yashirin maydon (botlar to'ldiradi, odam ko'rmaydi)
  // va formaning ochilgan vaqti (bot bir zumda yuboradi).
  const [honeypot, setHoneypot] = useState("");
  const formOpenedAt = useRef<number>(Date.now());
  const MIN_FILL_MS = 3000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot to'ldirilgan yoki forma juda tez yuborilgan — jimgina bekor qilamiz.
    // Botga muvaffaqiyat kabi ko'rinadi, lekin hech narsa yuborilmaydi.
    if (honeypot.trim() !== "" || Date.now() - formOpenedAt.current < MIN_FILL_MS) {
      setFormData(EMPTY_FORM);
      return;
    }

    setIsSending(true);

    try {
      await sendOwnerEmail(formData);
      setFormData(EMPTY_FORM);
      router.push("/thank-you");
    } catch (error) {
      console.error("EmailJS sending error:", error);
      showToast(t.contact.errorAlert, "error");
      setIsSending(false);
    }
  };

  const labelClass = "mb-1.5 block text-xs font-medium text-muted";

  return (
    <section id="contact" className="section">
      <div className="page-container reveal grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="max-w-md leading-relaxed text-light/70">{t.contact.desc}</p>

          <ul className="mt-8 space-y-2 text-sm">
            <li>
              <a href="mailto:olimjonov.ogabek.dev@gmail.com" className="link">
                olimjonov.ogabek.dev@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+998970640424" className="text-light/80 transition-colors hover:text-accent">
                +998 97 064 04 24
              </a>
            </li>
            <li className="text-muted">Namangan, Uzbekistan</li>
          </ul>

          <SocialLinks className="-ml-2 mt-6" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" name="contact">
          {/* Honeypot — ekrandan tashqarida, skrinriderlardan yashirin */}
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>{t.contact.nameLabel}</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder={t.contact.namePlaceholder}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>{t.contact.emailLabel}</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder={t.contact.emailPlaceholder}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className={labelClass}>{t.contact.subjectLabel}</label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="input"
              placeholder={t.contact.subjectPlaceholder}
              required
            />
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>{t.contact.messageLabel}</label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="input resize-y"
              rows={5}
              placeholder={t.contact.messagePlaceholder}
              required
            />
          </div>

          <button type="submit" disabled={isSending} className="btn btn-primary">
            {isSending ? (
              <>
                {t.contact.sendingBtn}
                <FaSpinner className="animate-spin" aria-hidden="true" />
              </>
            ) : (
              t.contact.sendBtn
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
