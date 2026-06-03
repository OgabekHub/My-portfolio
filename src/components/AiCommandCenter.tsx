"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { soundManager } from "@/utils/sound";
import { handleLocalFallback, ChatResponse, CodeResponse, SentimentResponse } from "@/utils/aiFallback";
import { triggerConfetti } from "@/utils/confetti";

interface Message {
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface GuestComment {
  id: string;
  name: string;
  comment: string;
  sentiment: "positive" | "neutral" | "negative";
  date: string;
}

export default function AiCommandCenter() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "code" | "guest">("chat");


  // Chat Tab states
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Code Tab states
  const [code, setCode] = useState("");
  const [codeReview, setCodeReview] = useState("");
  const [isCodeLoading, setIsCodeLoading] = useState(false);

  // Guestbook Tab states
  const [comments, setComments] = useState<GuestComment[]>([]);
  const [guestName, setGuestName] = useState("");
  const [guestComment, setGuestComment] = useState("");
  const [isGuestLoading, setIsGuestLoading] = useState(false);

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


  // Load comments and settings on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("guest_comments");
      if (stored) {
        setComments(JSON.parse(stored));
      } else {
        const defaultComments: GuestComment[] = [
          {
            id: "1",
            name: "Lazizbek",
            comment: "Og'abek akaga omad! AgroVision AI loyihasi menga juda yoqdi, zo'r yechim bo'libdi.",
            sentiment: "positive",
            date: "02.06.2026",
          },
          {
            id: "2",
            name: "Sarah Miller",
            comment: "Impressive portfolio design and animations. Keep it up!",
            sentiment: "positive",
            date: "01.06.2026",
          },
        ];
        setComments(defaultComments);
        localStorage.setItem("guest_comments", JSON.stringify(defaultComments));
      }



      // Default welcome message
      setMessages([
        {
          sender: "ai",
          text: language === "uz" 
            ? "Salom! Men Og'abekning AI Copilot yordamchisiman. Menga savollar berishingiz, sayt ranglarini o'zgartirishingiz yoki sahifani navigatsiya qilishingiz mumkin. Keling, boshlaylik!" 
            : "Hello! I am Og'abek's AI Copilot assistant. You can ask me questions, dynamically change page themes, or navigate sections. Let's begin!",
          timestamp: new Date(),
        },
      ]);
    }
  }, [language]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  // Process structured actions (scroll UI, inject custom theme CSS variables)
  const executeAiActions = (
    action: string, 
    scrollTarget: string | null, 
    themeColors: { primary: string; secondary: string; accent: string; light: string } | null | undefined
  ) => {
    // 1. Scroll UI Section
    if ((action === "navigate" || action === "both") && scrollTarget) {
      setTimeout(() => {
        const element = document.querySelector(scrollTarget);
        if (element) {
          const offset = 80;
          const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }, 350);
    }

    // 2. Inject Dynamic CSS Custom Properties
    if ((action === "theme" || action === "both") && themeColors) {
      try {
        document.documentElement.style.setProperty("--color-primary", themeColors.primary);
        document.documentElement.style.setProperty("--color-secondary", themeColors.secondary);
        document.documentElement.style.setProperty("--color-accent", themeColors.accent);
        document.documentElement.style.setProperty("--color-light", themeColors.light);
      } catch (e) {
        console.error("Theme injection error:", e);
      }
    }
  };

  // Submit chat message
  const handleChatSubmit = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const activeMsg = customMsg || input;
    if (!activeMsg.trim() || isChatLoading) return;

    soundManager.playClick();
    const userMsgObj: Message = { sender: "user", text: activeMsg, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsgObj]);
    setInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: activeMsg, mode: "chat" }),
      });

      if (!response.ok) {
        throw new Error("API call error");
      }

      const data = await response.json();
      const aiReply = data.reply || "Xatolik yuz berdi.";

      setMessages((prev) => [...prev, { sender: "ai", text: aiReply, timestamp: new Date() }]);
      executeAiActions(data.action, data.scrollTarget, data.themeColors);
    } catch {
      // Offline fallback
      const fallback = handleLocalFallback(activeMsg, "chat") as ChatResponse;
      setMessages((prev) => [...prev, { sender: "ai", text: fallback.reply, timestamp: new Date() }]);
      executeAiActions(fallback.action, fallback.scrollTarget, fallback.themeColors);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Run AI Code review
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || isCodeLoading) return;

    soundManager.playClick();
    setIsCodeLoading(true);
    setCodeReview(language === "uz" ? "Kodingiz tahlil qilinmoqda..." : "Analyzing your code...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Code Review", mode: "code", code }),
      });

      if (!response.ok) {
        throw new Error("API call error");
      }

      const data = await response.json();
      setCodeReview(data.feedback || "Tahlil natijasi bo'sh.");
    } catch {
      const fallback = handleLocalFallback("Code Review", "code", code) as CodeResponse;
      setCodeReview(fallback.feedback);
    } finally {
      setIsCodeLoading(false);
    }
  };

  // Submit comment to Guestbook with AI Sentiment Analysis
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestComment.trim() || isGuestLoading) return;

    soundManager.playClick();
    setIsGuestLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: guestComment, mode: "sentiment" }),
      });

      let data;
      if (response.ok) {
        data = await response.json();
      } else {
        throw new Error("API check failed");
      }

      const newComment: GuestComment = {
        id: String(Date.now()),
        name: guestName,
        comment: guestComment,
        sentiment: data.sentiment || "neutral",
        date: new Date().toLocaleDateString("uz-UZ"),
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      localStorage.setItem("guest_comments", JSON.stringify(updated));

      // Trigger Confetti canvas blast on positive comments
      if (data.sentiment === "positive") {
        triggerConfetti();
        soundManager.playThemeToggle(false);
      }

      setGuestComment("");
      alert(data.reply || "Fikringiz saqlandi!");
    } catch {
      const fallback = handleLocalFallback(guestComment, "sentiment") as SentimentResponse;
      const newComment: GuestComment = {
        id: String(Date.now()),
        name: guestName,
        comment: guestComment,
        sentiment: fallback.sentiment || "neutral",
        date: new Date().toLocaleDateString("uz-UZ"),
      };

      const updated = [newComment, ...comments];
      setComments(updated);
      localStorage.setItem("guest_comments", JSON.stringify(updated));

      if (fallback.sentiment === "positive") {
        triggerConfetti();
        soundManager.playThemeToggle(false);
      }

      setGuestComment("");
      alert(fallback.reply);
    } finally {
      setIsGuestLoading(false);
    }
  };

  return (
    <>
      {/* Floating Panel Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed z-[1000] bottom-[85px] left-1/2 -translate-x-1/2 md:bottom-[95px] md:right-[95px] md:left-auto md:transform-none w-[calc(100vw-40px)] md:w-[380px] max-w-[380px] h-[520px] bg-secondary/85 backdrop-blur-md rounded-2xl border border-accent/20 shadow-[0_15px_50px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden animate-slideUpMobile md:animate-fadeIn font-poppins"
        >
          {/* Header */}
          <div className="p-4 border-b border-accent/15 flex items-center justify-between bg-primary/45">
            <h3 className="font-playfair font-bold text-accent text-lg flex items-center gap-1.5">
              <i className="fas fa-robot text-base"></i>
              <span>AI Copilot</span>
            </h3>
            
            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsOpen(false);
                }}
                className="text-light/50 hover:text-accent text-sm"
              >
                <i className="fas fa-times text-base"></i>
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="grid grid-cols-3 text-xs font-semibold border-b border-accent/10">
            <button
              onClick={() => { soundManager.playClick(); setActiveTab("chat"); }}
              className={`py-2.5 text-center border-b-2 transition-all ${
                activeTab === "chat" ? "border-accent text-accent bg-accent/5" : "border-transparent text-light/60 hover:text-accent"
              }`}
            >
              💬 Chat
            </button>
            <button
              onClick={() => { soundManager.playClick(); setActiveTab("code"); }}
              className={`py-2.5 text-center border-b-2 transition-all ${
                activeTab === "code" ? "border-accent text-accent bg-accent/5" : "border-transparent text-light/60 hover:text-accent"
              }`}
            >
              🛠️ Code
            </button>
            <button
              onClick={() => { soundManager.playClick(); setActiveTab("guest"); }}
              className={`py-2.5 text-center border-b-2 transition-all ${
                activeTab === "guest" ? "border-accent text-accent bg-accent/5" : "border-transparent text-light/60 hover:text-accent"
              }`}
            >
              ✍️ Guest
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* 1. CHAT TAB */}
            {activeTab === "chat" && (
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
                        <span>Typing</span>
                        <i className="fas fa-spinner fa-spin text-accent"></i>
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
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            )}

            {/* 2. CODE TAB */}
            {activeTab === "code" && (
              <div className="h-full flex flex-col space-y-3">
                <form onSubmit={handleCodeSubmit} className="flex flex-col space-y-2">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={6}
                    placeholder={language === "uz" ? "// Kodingizni shu yerga tashlang...\nfunction test() {\n  return 'hello';\n}" : "// Paste your code snippet here..."}
                    className="w-full bg-primary/40 text-light border border-accent/20 rounded-xl p-3 text-xs focus:outline-none focus:border-accent font-mono"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isCodeLoading || !code.trim()}
                    className={`py-2 rounded-xl bg-accent text-primary text-xs font-bold transition-all hover:bg-light hover:text-primary ${
                      isCodeLoading || !code.trim() ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isCodeLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-1"></i>
                        <span>{language === "uz" ? "Tahlil qilinmoqda..." : "Analyzing..."}</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-magic mr-1"></i>
                        <span>{language === "uz" ? "Kodni Tahlil Qilish" : "Run Code Analysis"}</span>
                      </>
                    )}
                  </button>
                </form>

                {codeReview && (
                  <div className="flex-1 bg-primary/30 border border-accent/10 rounded-xl p-3 text-xs leading-relaxed text-light/95 max-h-[220px] overflow-y-auto scroll-smooth whitespace-pre-wrap font-sans">
                    {codeReview}
                  </div>
                )}
              </div>
            )}

            {/* 3. GUEST TAB */}
            {activeTab === "guest" && (
              <div className="h-full flex flex-col space-y-3">
                <form onSubmit={handleCommentSubmit} className="space-y-2 bg-primary/20 border border-accent/10 p-3 rounded-xl">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={language === "uz" ? "Ismingiz" : "Your Name"}
                    required
                    className="w-full bg-primary/50 text-light border border-accent/20 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-accent"
                  />
                  <textarea
                    value={guestComment}
                    onChange={(e) => setGuestComment(e.target.value)}
                    rows={2}
                    placeholder={language === "uz" ? "Fikringiz (ijobiy fikrlar konfettilar otadi! 🎉)" : "Leave your feedback..."}
                    required
                    className="w-full bg-primary/50 text-light border border-accent/20 rounded-lg p-3 text-xs focus:outline-none focus:border-accent"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isGuestLoading || !guestName.trim() || !guestComment.trim()}
                    className={`w-full py-1.5 rounded-lg bg-accent text-primary text-xs font-bold hover:bg-light hover:text-primary transition-all ${
                      isGuestLoading || !guestName.trim() || !guestComment.trim() ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isGuestLoading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <>
                        <i className="fas fa-pen-fancy mr-1"></i>
                        <span>{language === "uz" ? "Fikr qoldirish" : "Submit Comment"}</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Comment Feed */}
                <div className="flex-1 space-y-3 overflow-y-auto max-h-[190px] pr-1">
                  {comments.map((c) => (
                    <div key={c.id} className="bg-primary/45 border border-accent/5 rounded-xl p-3 text-xs relative">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-accent">{c.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-light/40">{c.date}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                            c.sentiment === "positive" ? "bg-green-500/10 text-green-400" :
                            c.sentiment === "negative" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"
                          }`}>
                            {c.sentiment === "positive" ? "Positive 🟢" :
                             c.sentiment === "negative" ? "Negative 🔴" : "Neutral 🟡"}
                          </span>
                        </div>
                      </div>
                      <p className="text-light/95 leading-relaxed font-sans">{c.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
