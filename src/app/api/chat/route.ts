import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { buildSystemPrompt } from "@/lib/aiContext";

const VALID_MODES = ["chat"] as const;
const VALID_LANGUAGES = ["uz", "en"] as const;
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
    return hostname === "ogabek-olimjonov-portfolio.vercel.app" || hostname.endsWith(".vercel.app");
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

    const { message, mode, language } = await req.json();

    // --- 3. Input validatsiyasi (Gemini'ga so'rov yuborishdan OLDIN) ---
    if (mode !== undefined && !VALID_MODES.includes(mode)) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    // Til — tashrifchi turgan sahifa versiyasi; eski mijozlar uchun standart uz
    if (language !== undefined && !VALID_LANGUAGES.includes(language)) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }
    const locale: (typeof VALID_LANGUAGES)[number] = language ?? "uz";

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "message must be a non-empty string" }, { status: 400 });
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

    // Prompt saytning o'z ma'lumotlaridan yig'iladi (lib/aiContext.ts) va
    // tashrifchi xabaridan alohida, systemInstruction sifatida beriladi —
    // shunda xabar ichidagi "oldingi ko'rsatmalarni unut" kabi gaplar uni
    // bosib o'tishi qiyinroq bo'ladi.
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: buildSystemPrompt(locale) }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
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
