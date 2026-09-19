"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { handleLocalFallback } from "@/utils/aiFallback";
import { scrollToSection } from "@/utils/scroll";
import { FaPaperPlane, FaSpinner, FaXmark } from "react-icons/fa6";

interface Message {
  sender: "user" | "ai";
  text: string;
}

export default function AiCommandCenter() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Navbar'dagi tugma shu hodisani yuboradi
  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-ai-copilot", handleToggle);
    return () => window.removeEventListener("toggle-ai-copilot", handleToggle);
  }, []);

  // Escape bilan yopish va ochilganda kiritish maydoniga fokus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    inputRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Panel tashqarisiga bosilganda yopish (ochuvchi tugmaning o'zi bundan mustasno)
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[aria-label="AI Copilot"]')) return;
      if (panelRef.current && !panelRef.current.contains(target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Salomlashish xabari — chat bo'sh bo'lgandagina (til almashganda tarix o'chmasin)
  useEffect(() => {
    setMessages((prev) =>
      prev.length > 0
        ? prev
        : [
            {
              sender: "ai",
              text:
                language === "uz"
                  ? "Salom! Men Og'abekning AI yordamchisiman. Menga savol bering yoki kerakli bo'limga o'tishimni so'rang."
                  : "Hi! I'm Og'abek's AI assistant. Ask me anything, or tell me which section to take you to.",
            },
          ]
    );
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const navigateIfAsked = (action: string, scrollTarget: string | null) => {
    if (action === "navigate" && scrollTarget) {
      setTimeout(() => scrollToSection(scrollTarget), 350);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, mode: "chat" }),
      });
      if (!response.ok) throw new Error("API call error");

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply || "Xatolik yuz berdi." }]);
      navigateIfAsked(data.action, data.scrollTarget);
    } catch {
      // API ishlamasa — kalit so'zlarga asoslangan lokal javob
      const fallback = handleLocalFallback(text);
      setMessages((prev) => [...prev, { sender: "ai", text: fallback.reply }]);
      navigateIfAsked(fallback.action, fallback.scrollTarget);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="AI Copilot"
      className="animate-fadeIn fixed inset-x-4 bottom-4 z-[60] flex h-[70vh] max-h-[520px] flex-col overflow-hidden rounded-xl border border-light/10 bg-primary shadow-2xl
        md:inset-x-auto md:bottom-auto md:right-6 md:top-20 md:h-[min(520px,calc(100dvh-6rem))] md:w-[380px]"
    >
      <div className="flex items-center justify-between border-b border-light/10 px-4 py-3">
        <h3 className="text-sm font-semibold text-light">AI Copilot</h3>
        <button onClick={() => setIsOpen(false)} className="icon-btn h-8 w-8" aria-label={language === "uz" ? "Yopish" : "Close"}>
          <FaXmark />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 leading-relaxed ${
                m.sender === "user" ? "bg-accent text-primary" : "bg-light/5 text-light"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-lg bg-light/5 px-3 py-2 text-muted">
              <FaSpinner className="animate-spin" aria-hidden="true" />
              <span>{language === "uz" ? "Yozmoqda..." : "Typing..."}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-light/10 p-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === "uz" ? "Savolingizni yozing..." : "Ask something..."}
          className="input py-2"
          maxLength={1000}
          aria-label={language === "uz" ? "Savolingiz" : "Your question"}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="btn btn-primary px-3"
          aria-label={language === "uz" ? "Yuborish" : "Send"}
        >
          <FaPaperPlane aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
