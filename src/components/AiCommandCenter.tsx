"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { handleLocalFallback, ChatResponse } from "@/utils/aiFallback";
import { scrollToSection } from "@/utils/scroll";
import { FaPaperPlane, FaRobot, FaSpinner, FaXmark } from "react-icons/fa6";

interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export default function AiCommandCenter() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Chat states
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Toggle open state on custom event from Navbar
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("toggle-ai-copilot", handleToggle);
    return () => {
      window.removeEventListener("toggle-ai-copilot", handleToggle);
    };
  }, []);

  // Escape bilan yopish va ochilganda panelga fokus berish
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Click outside listener to close the AI panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      const isToggleBtn = target.closest('[aria-label="AI Copilot"]');
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !isToggleBtn
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Salomlashish xabari — chat bo'sh bo'lgandagina.
  // Ilgari bu [language] ga bog'langan edi va til almashtirilsa butun
  // suhbat tarixi o'chib ketardi.
  useEffect(() => {
    setMessages((prev) =>
      prev.length > 0
        ? prev
        : [
            {
              sender: "ai",
              text:
                language === "uz"
                  ? "Salom! Men Og'abekning AI Copilot yordamchisiman. Menga savollar berishingiz yoki kerakli bo'limga o'tishimni so'rashingiz mumkin. Keling, boshlaylik!"
                  : "Hello! I am Og'abek's AI Copilot assistant. Ask me anything, or tell me which section to take you to. Let's begin!",
              timestamp: new Date(),
            },
          ]
    );
  }, [language]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // AI javobidagi navigatsiya buyrug'ini bajarish.
  const executeAiAction = (action: string, scrollTarget: string | null) => {
    if (action === "navigate" && scrollTarget) {
      setTimeout(() => scrollToSection(scrollTarget), 350);
    }
  };

  // Submit chat message
  const handleChatSubmit = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const activeMsg = customMsg || input;
    if (!activeMsg.trim() || isChatLoading) return;

    const userMsgObj: Message = { sender: "user", text: activeMsg, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsgObj]);
    setInput("");
    setIsChatLoading(true);

    try {
      // Til — AI shu versiya faktlaridan foydalanadi va noaniq bo'lsa shu tilda javob beradi
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: activeMsg, mode: "chat", language }),
      });

      if (!response.ok) {
        throw new Error("API call error");
      }

      const data = await response.json();
      const aiReply = data.reply || (language === "uz" ? "Xatolik yuz berdi." : "Something went wrong.");

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply, timestamp: new Date() }]);
      executeAiAction(data.action, data.scrollTarget);
    } catch {
      // Offline fallback
      const fallback: ChatResponse = handleLocalFallback(activeMsg, language);
      setMessages((prev) => [...prev, { sender: "ai", text: fallback.reply, timestamp: new Date() }]);
      executeAiAction(fallback.action, fallback.scrollTarget);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <>
      {/* Floating Panel Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="AI Copilot"
          tabIndex={-1}
          className="fixed z-[1000] bottom-[85px] left-1/2 -translate-x-1/2 md:bottom-[95px] md:right-[95px] md:left-auto md:transform-none w-[calc(100vw-40px)] md:w-[380px] max-w-[380px] h-[520px] bg-secondary/85 backdrop-blur-md rounded-2xl border border-accent/20 shadow-[0_15px_50px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden animate-slideUpMobile md:animate-fadeIn font-poppins focus:outline-none"
        >
          {/* Header */}
          <div className="p-4 border-b border-accent/15 flex items-center justify-between bg-primary/45">
            <h3 className="font-playfair font-bold text-accent text-lg flex items-center gap-1.5">
              <FaRobot className="text-base" />
              <span>AI Copilot</span>
            </h3>
            
            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="text-light/50 hover:text-accent text-sm"
              >
                <FaXmark className="text-base" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl p-3 leading-relaxed shadow-sm ${
                          m.sender === "user"
                            ? "bg-accent text-primary font-medium rounded-tr-none"
                            : "bg-primary/50 border border-accent/10 text-light rounded-tl-none"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-primary/50 border border-accent/10 rounded-xl rounded-tl-none p-3 text-light/50 flex items-center gap-1.5">
                        <span>{language === "uz" ? "Yozmoqda" : "Typing"}</span>
                        <FaSpinner className="animate-spin text-accent" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Form */}
                <form onSubmit={handleChatSubmit} className="flex gap-2 mt-2">
                  <div className="flex-1 relative flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={language === "uz" ? "Assistentdan so'rang..." : "Ask copilot..."}
                      className="w-full bg-primary/60 text-light border border-accent/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 rounded-xl bg-accent text-primary text-xs font-semibold hover:bg-light hover:text-primary transition-all flex items-center justify-center"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </div>
          </div>
        </div>
      )}
    </>
  );
}
