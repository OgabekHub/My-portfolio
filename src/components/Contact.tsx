"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import emailjs from "@emailjs/browser";
import { soundManager } from "@/utils/sound";

export default function Contact() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        "service_5o3o1i8",
        "template_goumrk5",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Og'abek Olimjonov",
          reply_to: "olimjonov.ogabek.dev@gmail.com",
        },
        "35xgz0k7Rt9b7KEbF" // EmailJS public key
      );

      // Reset form and redirect to thank-you route
      setFormData({ name: "", email: "", subject: "", message: "" });
      router.push("/thank-you");
    } catch (error) {
      console.error("EmailJS sending error:", error);
      alert(t.contact.errorAlert);
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
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent text-sm">Email</h4>
                    <p className="text-light/70 text-sm">olimjonov.ogabek.dev@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-4">
                  <div className="contact-icon text-accent bg-primary/45 w-10 h-10 rounded-full flex items-center justify-center border border-accent/10">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent text-sm">Phone</h4>
                    <p className="text-light/70 text-sm">+998 97 064 04 24</p>
                  </div>
                </div>
                <div className="contact-item flex items-center gap-4">
                  <div className="contact-icon text-accent bg-primary/45 w-10 h-10 rounded-full flex items-center justify-center border border-accent/10">
                    <i className="fas fa-map-marker-alt"></i>
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
                  <i className="fab fa-github"></i>
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
                  <i className="fab fa-linkedin"></i>
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
                  <i className="fab fa-telegram"></i>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
              <form onSubmit={handleSubmit} className="space-y-6" id="contactForm" name="contact">
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
                      <i className="fas fa-spinner fa-spin ml-1"></i>
                    </>
                  ) : (
                    <>
                      <span>{t.contact.sendBtn}</span>
                      <i className="fas fa-paper-plane ml-1"></i>
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
