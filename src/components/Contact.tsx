"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { sendOwnerEmail } from "@/utils/email";
import { soundManager } from "@/utils/sound";
import { useToast } from "@/components/Toast";
import { FaEnvelope, FaGithub, FaLinkedin, FaLocationDot, FaPaperPlane, FaPhone, FaSpinner, FaTelegram } from "react-icons/fa6";

export default function Contact() {
  const router = useRouter();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  // Spam himoyasi: yashirin maydon (botlar to'ldiradi, odam ko'rmaydi)
  // va formaning ochilgan vaqti (bot bir zumda yuboradi).
  const [honeypot, setHoneypot] = useState("");
  const formOpenedAt = useRef<number>(Date.now());
  const MIN_FILL_MS = 3000;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot to'ldirilgan yoki forma juda tez yuborilgan — jimgina bekor qilamiz.
    // Botga muvaffaqiyat kabi ko'rinadi, lekin hech narsa yuborilmaydi.
    if (honeypot.trim() !== "" || Date.now() - formOpenedAt.current < MIN_FILL_MS) {
      setFormData({ name: "", email: "", subject: "", message: "" });
      return;
    }

    setIsSending(true);

    try {
      // reply_to endi yuboruvchining manzili — ilgari bu yerda egasining
      // o'z manzili turgan va kelgan xatga "Reply" o'ziga qaytardi.
      await sendOwnerEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      // Reset form and redirect to thank-you route
      setFormData({ name: "", email: "", subject: "", message: "" });
      router.push("/thank-you");
    } catch (error) {
      console.error("EmailJS sending error:", error);
      showToast(t.contact.errorAlert, "error");
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-playfair font-bold text-center mb-16">
          {t.contact.title.split(" ")[0]}{" "}
          <span className="text-accent">
            {t.contact.title.split(" ").slice(1).join(" ")}
          </span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="contact-info">
              <h3 className="text-2xl font-bold text-accent mb-6">{t.contact.connect}</h3>
              <p className="text-light/80 mb-8 text-sm leading-relaxed">
                {t.contact.desc}
              </p>
              <div className="space-y-6">
                <div className="contact-item flex items-center gap-4">
                  <div className="contact-icon text-accent bg-primary/45 w-10 h-10 rounded-full flex items-center justify-center border border-accent/10">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent text-sm">Email</h4>
                    <p className="text-light/70 text-sm">olimjonov.ogabek.dev@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-4">
                  <div className="contact-icon text-accent bg-primary/45 w-10 h-10 rounded-full flex items-center justify-center border border-accent/10">
                    <FaPhone />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent text-sm">Phone</h4>
                    <p className="text-light/70 text-sm">+998 97 064 04 24</p>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-4">
                  <div className="contact-icon text-accent bg-primary/45 w-10 h-10 rounded-full flex items-center justify-center border border-accent/10">
                    <FaLocationDot />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent text-sm">Location</h4>
                    <p className="text-light/70 text-sm">Namangan, Uzbekistan</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex space-x-4">
                <a
                  href="https://github.com/OgabekHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="social-link"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/og-abek-olimjonov-2a52b3364?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BZCdpoYM8SXiYquzPfhXTIg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://t.me/olimjonov_ogabek"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="social-link"
                  aria-label="Telegram"
                >
                  <FaTelegram />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <form onSubmit={handleSubmit} className="space-y-6" id="contactForm" name="contact">
                {/* Honeypot — ekrandan tashqarida, skrinriderlardan yashirin */}
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute w-px h-px -left-[9999px] opacity-0"
                />
                <div className="form-group flex flex-col gap-1">
                  <label className="text-sm font-semibold text-accent">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => soundManager.playHover()}
                    className="form-input bg-primary/50 text-light border border-accent/20 rounded-xl p-3 focus:outline-none focus:border-accent text-sm"
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                </div>
                <div className="form-group flex flex-col gap-1">
                  <label className="text-sm font-semibold text-accent">{t.contact.emailLabel}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => soundManager.playHover()}
                    className="form-input bg-primary/50 text-light border border-accent/20 rounded-xl p-3 focus:outline-none focus:border-accent text-sm"
                    placeholder={t.contact.emailPlaceholder}
                    required
                  />
                </div>
                <div className="form-group flex flex-col gap-1">
                  <label className="text-sm font-semibold text-accent">{t.contact.subjectLabel}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => soundManager.playHover()}
                    className="form-input bg-primary/50 text-light border border-accent/20 rounded-xl p-3 focus:outline-none focus:border-accent text-sm"
                    placeholder={t.contact.subjectPlaceholder}
                    required
                  />
                </div>
                <div className="form-group flex flex-col gap-1">
                  <label className="text-sm font-semibold text-accent">{t.contact.messageLabel}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => soundManager.playHover()}
                    className="form-input bg-primary/50 text-light border border-accent/20 rounded-xl p-3 focus:outline-none focus:border-accent text-sm"
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    required
                  ></textarea>
                </div>
                 <button
                  type="submit"
                  disabled={isSending}
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`submit-btn w-full py-3 rounded-xl bg-accent text-primary font-bold hover:bg-light hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSending ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSending ? (
                    <>
                      <span>{t.contact.sendingBtn}</span>
                      <FaSpinner className="animate-spin ml-1" />
                    </>
                  ) : (
                    <>
                      <span>{t.contact.sendBtn}</span>
                      <FaPaperPlane className="ml-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
