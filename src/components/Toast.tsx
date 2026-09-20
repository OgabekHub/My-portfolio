"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaXmark } from "react-icons/fa6";
import type { IconType } from "react-icons";

type ToastTone = "success" | "error" | "info";

interface ToastState {
  message: string;
  tone: ToastTone;
  id: number;
}

interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const TONE_STYLES: Record<ToastTone, string> = {
  success: "border-accent/40 text-light",
  error: "border-red-400/50 text-light",
  info: "border-accent/25 text-light",
};

const TONE_ICONS: Record<ToastTone, { Icon: IconType; className: string }> = {
  success: { Icon: FaCircleCheck, className: "text-accent" },
  error: { Icon: FaCircleExclamation, className: "text-red-400" },
  info: { Icon: FaCircleInfo, className: "text-accent" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    setToast({ message, tone, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (() => {
        const ToneIcon = TONE_ICONS[toast.tone].Icon;
        return (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className={`fixed z-[10000] bottom-[90px] left-1/2 -translate-x-1/2 md:bottom-8 md:left-auto md:right-8 md:translate-x-0
            w-[calc(100vw-40px)] max-w-[380px] flex items-start gap-3 rounded-xl border px-4 py-3
            bg-secondary/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.35)] text-sm leading-relaxed
            animate-fadeIn ${TONE_STYLES[toast.tone]}`}
        >
          <ToneIcon className={`${TONE_ICONS[toast.tone].className} mt-0.5 shrink-0`} aria-hidden="true" />
          <p className="flex-1">{toast.message}</p>
          <button
            onClick={() => setToast(null)}
            className="text-light/50 hover:text-accent transition-colors"
            aria-label="Yopish"
          >
            <FaXmark aria-hidden="true" />
          </button>
        </div>
        );
      })()}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
