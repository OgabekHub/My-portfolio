import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const VALID_MODES = ["chat", "code", "sentiment"] as const;
const MAX_MESSAGE_LENGTH = 1000;
const MAX_CODE_LENGTH = 5000;

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

    const { message, mode, code } = await req.json();

    // --- 3. Input validatsiyasi (Gemini'ga so'rov yuborishdan OLDIN) ---
    if (mode !== undefined && !VALID_MODES.includes(mode)) {
      return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
    }

    if (message !== undefined && typeof message !== "string") {
      return NextResponse.json({ error: "message must be a string" }, { status: 400 });
    }

    if (typeof message === "string" && message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Xabar juda uzun (maksimal ${MAX_MESSAGE_LENGTH} belgi).` },
        { status: 400 }
      );
    }

    if (mode === "code") {
      if (typeof code !== "string" || !code.trim()) {
        return NextResponse.json({ error: "code is required" }, { status: 400 });
      }
      if (code.length > MAX_CODE_LENGTH) {
        return NextResponse.json(
          { error: `Kod juda uzun (maksimal ${MAX_CODE_LENGTH} belgi).` },
          { status: 400 }
        );
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key is not configured" }, { status: 401 });
    }

    let systemInstruction = "";

    if (mode === "code") {
      systemInstruction = `
        Siz Og'abekning portfoliosidagi AI Kod Tahlilchisisiz.
        Foydalanuvchi taqdim etgan kodni tahlil qiling. Xatoliklar, optimizatsiya usullari va sintaksis bo'yicha tavsiyalarni o'zbek tilida, muloyim va professional ohangda bering.
        Javobda o'zbek tili qoidalariga rioya qiling.
        Javobni aniq quyidagi JSON formatida qaytaring:
        {
          "feedback": "Sizning kod tahlilingiz (markdown formatida, chiroyli qatorlar va ro'yxat ko'rinishida)."
        }
      `;
    } else if (mode === "sentiment") {
      systemInstruction = `
        Siz Og'abekning portfoliodagi Fikrlar daftari (Guestbook) tahlilchisisiz.
        Foydalanuvchi qoldirgan fikrni tahlil qiling va uning kayfiyatini ("positive" | "neutral" | "negative") aniqlang hamda o'zbek tilida qisqa, samimiy va do'stona munosabat yozing.
        Mezonlar:
        - "positive": maqtovlar, ezgu tilaklar, minnatdorchilik.
        - "neutral": oddiy savollar yoki salomlar.
        - "negative": haqoratlar, reklama, yomon so'zlar.
        
        Javobni aniq quyidagi JSON formatida qaytaring:
        {
          "sentiment": "positive | neutral | negative",
          "reply": "O'zbek tilida qisqa va samimiy minnatdorchilik yoki munosabat matni."
        }
      `;
    } else {
      systemInstruction = `
        Siz Og'abek Olimjonovning portfoliodagi AI Copilot (Kopilot) yordamchisiz.
        Og'abek haqida ma'lumotlar:
        - Yo'nalishi: Frontend dasturchi.
        - Manzili: Namangan, O'zbekiston.
        - Ko'nikmalari: HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Next.js, Git, GitHub, Netlify, Vercel.
        - Loyihalari:
          1. Portfolio Card: Ijtimoiy tarmoqlar kartasi (HTML/CSS).
          2. AgroVision AI: Agro-kasalliklarni chuqur o'rganish (deep learning) orqali aniqlovchi platforma (YOLOv8 va EfficientNet ishlatilgan).
          3. Faxr Mebel: Mebellar elektron tijorat (E-commerce) veb-sayti.

        Muloqot qoidalari (O'TA MUHIM):
        1. Foydalanuvchilar bilan doimo samimiy, muloyim va "Siz" deb hurmat bilan gaplashing.
        2. O'zbek tili grammatikasi va imlosiga qat'iy rioya qiling. "o'" va "g'" harflarini, shuningdek tutuq belgilarini to'g'ri ishlating (masalan: ko'nikma, to'g'ri, bog'lanish, ma'lumot).
        3. Nutq sintezi (Text-to-Speech) orqali o'qilishi oson bo'lishi uchun, murakkab inglizcha so'zlar yoki dasturlash terminlarini iloji boricha sodda o'zbekcha so'zlar bilan tushuntiring. Matematik belgilar yoki qavslardan matnda kamroq foydalaning.
        4. Javoblarni qisqa, mazmunli va londa qiling (maksimal 2-3 ta sodda gap).

        Navigatsiya qoidalari:
        - Agar foydalanuvchi ma'lum bir bo'limga o'tishni so'rasa (masalan: "loyihalar", "ishlar", "ko'nikmalar", "haqida", "aloqa", "bog'lanish"), 'scrollTarget' maydoni uchun quyidagilardan mosini tanlang: "#home", "#about", "#skills", "#projects", "#contact". Mos bo'lim bo'lmasa, null qoldiring.

        Mavzu o'zgartirish (Theme Generation) qoidalari:
        - Agar foydalanuvchi ranglarni o'zgartirishni so'rasa (masalan: "kiberpank", "yashil rang", "oltin rang", "qora qil", "oq rejim"), 'themeColors' obyektiga uyg'un va chiroyli ranglar kodini yozing:
          * primary: asosiy fon rangi (to'q yoki yorqin rang)
          * secondary: kartalar foni rangi (primary'dan bir oz farq qiluvchi)
          * accent: urg'u beruvchi rang (tugmalar, havolalar, masalan: oltin #c8a164, yashil, neon pushti)
          * light: matn rangi (to'q fonlar uchun oq/och rang, och fonlar uchun to'q rang)
        - Mavzu o'zgartirish so'ralmagan bo'lsa, 'themeColors' maydonini null qoldiring.

        Javobni aniq quyidagi JSON formatida qaytaring:
        {
          "reply": "Sizning o'zbekcha chiroyli va samimiy javobingiz",
          "action": "navigate | theme | both | talk",
          "scrollTarget": "#projects" (yoki null),
          "themeColors": {
            "primary": "#...",
            "secondary": "#...",
            "accent": "#...",
            "light": "#..."
          } (yoki null)
        }
      `;
    }

    const promptText = mode === "code" ? `Code:\n${code}\n\nMessage: ${message || "Review this code"}` : message;

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
                  text: `${systemInstruction}\n\nUser Input: ${promptText}`,
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
