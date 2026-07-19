"use client";

import React from "react";
import Link from "next/link";

export default function LogoVariants() {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-10 font-poppins">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-accent hover:underline mb-8 inline-block text-sm">
          &larr; Bosh sahifaga qaytish
        </Link>
        <h1 className="text-3xl font-bold mb-4 text-center">Ultra-Minimal Logolar</h1>
        <p className="text-center text-light/60 mb-12 max-w-xl mx-auto text-sm">
          Siz so'raganingizdek, ortiqcha detallardan holi, juda sodda va zamonaviy (minimalist) variantlar. 
          Asosiy e'tibor toza chiziqlar va bo'shliqlarga (negative space) qaratildi.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* Variant 1: Pure Negative Space */}
          <div className="flex flex-col items-center bg-[#060c21] p-8 rounded-2xl border border-white/5 shadow-lg">
            <h2 className="text-sm text-light/60 mb-8 font-semibold tracking-widest uppercase">1. Negative Space O&apos;</h2>
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* Asosiy aylana */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f8f5ec" strokeWidth="4" />
                {/* Apostrof qismi uchun aylanani kesib olish (qora bilan yopish) */}
                <circle cx="80" cy="25" r="12" fill="#060c21" />
                {/* Oltin apostrof nuqtasi */}
                <circle cx="80" cy="25" r="5" fill="#c8a164" />
              </svg>
            </div>
            <p className="text-[11px] text-light/40 mt-6 text-center">Oddiy aylana, apostrof qismi ochiq qoldirilgan.</p>
          </div>

          {/* Variant 2: Overlapping OO */}
          <div className="flex flex-col items-center bg-[#060c21] p-8 rounded-2xl border border-white/5 shadow-lg">
            <h2 className="text-sm text-light/60 mb-8 font-semibold tracking-widest uppercase">2. OO Monogramma</h2>
            <div className="w-20 h-20 relative flex items-center justify-center">
              <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg">
                {/* O (Og'abek) */}
                <circle cx="45" cy="50" r="30" fill="none" stroke="#f8f5ec" strokeWidth="3" opacity="0.9" />
                {/* O (Olimjonov) */}
                <circle cx="75" cy="50" r="30" fill="none" stroke="#c8a164" strokeWidth="3" opacity="0.6" />
                {/* Kichik detal */}
                <circle cx="75" cy="50" r="3" fill="#c8a164" />
              </svg>
            </div>
            <p className="text-[11px] text-light/40 mt-6 text-center">Og'abek Olimjonov uchun ikkita kesishgan ingichka aylana.</p>
          </div>

          {/* Variant 3: Split Arcs */}
          <div className="flex flex-col items-center bg-[#060c21] p-8 rounded-2xl border border-white/5 shadow-lg">
            <h2 className="text-sm text-light/60 mb-8 font-semibold tracking-widest uppercase">3. Split Arcs</h2>
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 10 A 40 40 0 0 0 10 50" fill="none" stroke="#f8f5ec" strokeWidth="4" strokeLinecap="round" />
                <path d="M 50 90 A 40 40 0 0 0 90 50" fill="none" stroke="#c8a164" strokeWidth="4" strokeLinecap="round" />
                {/* Apostrof */}
                <circle cx="85" cy="15" r="4" fill="#c8a164" />
              </svg>
            </div>
            <p className="text-[11px] text-light/40 mt-6 text-center">Ochiq konturli va juda erkin nafas oluvchi logotip.</p>
          </div>

          {/* Variant 4: The Golden Dot */}
          <div className="flex flex-col items-center bg-[#060c21] p-8 rounded-2xl border border-white/5 shadow-lg">
            <h2 className="text-sm text-light/60 mb-8 font-semibold tracking-widest uppercase">4. The Core</h2>
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* Juda ingichka halqa */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(248, 245, 236, 0.2)" strokeWidth="1" />
                {/* Markaziy yadro */}
                <circle cx="50" cy="50" r="10" fill="#c8a164" />
                {/* O' apostrofi kabi orbitadagi nuqta */}
                <circle cx="85" cy="25" r="3" fill="#f8f5ec" />
              </svg>
            </div>
            <p className="text-[11px] text-light/40 mt-6 text-center">Mutlaq minimalizm. Diqqat faqat markazga qaratilgan.</p>
          </div>

          {/* Variant 5: Tech Slash */}
          <div className="flex flex-col items-center bg-[#060c21] p-8 rounded-2xl border border-white/5 shadow-lg">
            <h2 className="text-sm text-light/60 mb-8 font-semibold tracking-widest uppercase">5. Tech Slash</h2>
            <div className="w-20 h-20 relative flex items-center justify-center">
              <span className="font-poppins text-4xl font-light text-white flex items-center gap-1">
                O<span className="text-[#c8a164] text-3xl font-bold translate-y-[-4px]">/</span>
              </span>
            </div>
            <p className="text-[11px] text-light/40 mt-6 text-center">O harfi va dasturlash belgisi (slash) kombinatsiyasi.</p>
          </div>

          {/* Variant 6: Bold Minimal Type */}
          <div className="flex flex-col items-center bg-[#060c21] p-8 rounded-2xl border border-white/5 shadow-lg">
            <h2 className="text-sm text-light/60 mb-8 font-semibold tracking-widest uppercase">6. Signature Type</h2>
            <div className="w-24 h-20 relative flex items-center justify-center">
              <div className="relative">
                <span className="font-playfair text-5xl font-semibold text-white tracking-tighter">O</span>
                <span className="absolute top-0 -right-4 w-3 h-3 bg-[#c8a164] rounded-full"></span>
              </div>
            </div>
            <p className="text-[11px] text-light/40 mt-6 text-center">Faqat O harfi va yonida qat'iy oltin nuqta.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
