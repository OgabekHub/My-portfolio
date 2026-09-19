import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const MAX_MESSAGE_LENGTH = 1000;

/** So'rov shu saytdan kelganini tekshirish (dev'da localhost'ga ruxsat). */
function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");

  // Origin sarlavhasisiz so'rovlar (same-origin fetch, curl) — bloklamaymiz,
  // ular baribir rate limit ostida.
  if (!origin) return true;

  try {
    const { hostname } = new URL(origin);
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    return hostname === "ogabek.vercel.app" || hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    // --- 1. Origin tekshiruvi ---
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    // --- 2. Rate limit: 10 so'rov / daqiqa har bir IP uchun ---
    const { allowed, retryAfterSec } = checkRateLimit(getClientIp(req));
    if (!allowed) {
      return NextResponse.json(
        { error: "Juda ko'p so'rov yuborildi. Birozdan so'ng qayta urinib ko'ring." },
        { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
      );
    }

    const { message, mode } = await req.json();

    // --- 3. Input validatsiyasi (Gemini'ga so'rov yuborishdan OLDIN) ---
    // Faqat chat rejimi qoldi; eski mijozlar yuboradigan mode: "chat" ham qabul qilinadi
    if (mode !== undefined && mode !== "chat") {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Xabar juda uzun (maksimal ${MAX_MESSAGE_LENGTH} belgi).` },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key is not configured" }, { status: 401 });
    }

    const systemInstruction = `
        Siz Og'abek Olimjonovning portfoliodagi AI Copilot (Kopilot) yordamchisiz.
        Og'abek haqida ma'lumotlar:
        - Yo'nalishi: Frontend dasturchi.
        - Manzili: Namangan, O'zbekiston.
        - Ko'nikmalari: HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Next.js, Git, GitHub, Netlify, Vercel.
        - Loyihalari:
          1. DevCommons: dasturchilar kod parchalari, AI promtlari va loyihalarini bo'lishadigan ochiq platforma (Next.js, Tailwind CSS, TypeScript).
          2. AgroVision AI: o'simlik kasalliklarini kompyuter ko'rishi orqali aniqlovchi qishloq xo'jaligi platformasi (YOLOv8 va EfficientNet).
          3. Faxr Mebel: mebel fabrikasining katalog veb-sayti (React, Vite, Tailwind).
          4. Zetra Store: elektron savdo (E-commerce) platformasi (Next.js, Tailwind CSS).
          5. Nexus Devs: IT agentlik sayti (Next.js, Tailwind CSS).

        Muloqot qoidalari (O'TA MUHIM):
        1. Foydalanuvchilar bilan doimo samimiy, muloyim va "Siz" deb hurmat bilan gaplashing.
        2. O'zbek tili grammatikasi va imlosiga qat'iy rioya qiling. "o'" va "g'" harflarini, shuningdek tutuq belgilarini to'g'ri ishlating (masalan: ko'nikma, to'g'ri, bog'lanish, ma'lumot).
        3. Nutq sintezi (Text-to-Speech) orqali o'qilishi oson bo'lishi uchun, murakkab inglizcha so'zlar yoki dasturlash terminlarini iloji boricha sodda o'zbekcha so'zlar bilan tushuntiring. Matematik belgilar yoki qavslardan matnda kamroq foydalaning.
        4. Javoblarni qisqa, mazmunli va londa qiling (maksimal 2-3 ta sodda gap).

        Navigatsiya qoidalari:
        - Agar foydalanuvchi ma'lum bir bo'limga o'tishni so'rasa (masalan: "loyihalar", "ishlar", "ko'nikmalar", "haqida", "aloqa", "bog'lanish"), 'scrollTarget' maydoni uchun quyidagilardan mosini tanlang: "#home", "#about", "#skills", "#projects", "#contact". Mos bo'lim bo'lmasa, null qoldiring.

        Javobni aniq quyidagi JSON formatida qaytaring:
        {
          "reply": "Sizning o'zbekcha chiroyli va samimiy javobingiz",
          "action": "navigate | talk",
          "scrollTarget": "#projects" (yoki null)
        }
      `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemInstruction}\n\nUser Input: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            thinkingConfig: {
              thinkingBudget: 0,
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error status:", response.status, errText);
      return NextResponse.json({ error: "Gemini API request failed" }, { status: response.status });
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return NextResponse.json({ error: "Empty response from AI model" }, { status: 500 });
    }

    try {
      return NextResponse.json(JSON.parse(responseText.trim()));
    } catch {
      // Gemini JSON o'rniga oddiy matn qaytardi — mijoz lokal fallback'ga tushsin
      console.error("Gemini returned non-JSON response:", responseText.slice(0, 200));
      return NextResponse.json(
        { error: "AI model returned malformed JSON" },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("Error in API chat route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
