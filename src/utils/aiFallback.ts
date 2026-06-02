export interface ChatResponse {
  reply: string;
  action: "navigate" | "theme" | "both" | "talk";
  scrollTarget: string | null;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    light: string;
  } | null;
}

export interface CodeResponse {
  feedback: string;
}

export interface SentimentResponse {
  sentiment: "positive" | "neutral" | "negative";
  reply: string;
}

export function handleLocalFallback(
  message: string,
  mode: string,
  code?: string
): ChatResponse | CodeResponse | SentimentResponse {
  const query = (message || "").toLowerCase().trim();

  if (mode === "code") {
    const codeSnippet = code || "";
    let feedback = "### 🛠️ AI Kod Tahlili (Lokal Tahlilchi)\n\nMahalliy tahlil natijalari:\n\n";

    if (codeSnippet.includes("useState") || codeSnippet.includes("useEffect")) {
      feedback += `- **React Hooks**: Kodingizda React hooks ishlatilgan. ` +
        `useEffect ichida tozalash funksiyasi (cleanup function) va dependency array to'g'ri ko'rsatilganini tekshiring.\n` +
        `- **Tavsiya**: Renderlarni kamaytirish uchun useCallback yoki useMemo ko'rib chiqing.\n`;
    } else if (codeSnippet.includes("function") || codeSnippet.includes("const")) {
      feedback += `- **Struktura**: ES6+ sintaksisiga muvofiq yozilgan kod. ` +
        `O'zgaruvchilarni e'lon qilishda to'g'ri scoping (const/let) qoidalariga rioya qilingan.\n` +
        `- **Tavsiya**: Funksiyalarni asinxron qilish zarur bo'lsa async/await dan foydalaning.\n`;
    } else {
      feedback += `- **Tahlil**: Kod strukturasi qabul qilindi. Kodingizni yanada mukammal qilish uchun uni kichikroq bo'limlarga ajrating va xatolarni catch orqali boshqaring.\n`;
    }

    feedback += "\n\n*Eslatma: Sayt local rejimda bo'lganligi sababli, bu tahlil offline algoritm orqali tayyorlandi.*";
    return { feedback };
  }

  if (mode === "sentiment") {
    const positiveWords = ["zo'r", "zor", "ajoyib", "super", "yaxshi", "omad", "tashakkur", "rahmat", "barakalla", "perfect", "great", "nice", "awesome", "cool", "like"];
    const negativeWords = ["yomon", "xunuk", "ishlamadi", "xato", "axlat", "bad", "worst", "hate", "spam"];

    let sentiment: "positive" | "neutral" | "negative" = "neutral";
    let reply = "Fikringiz uchun rahmat! Og'abek uchun bu juda qadrli.";

    const containsWord = (words: string[]) => words.some(w => query.includes(w));

    if (containsWord(positiveWords)) {
      sentiment = "positive";
      reply = "Ajoyib fikr uchun tashakkur! 😊 Hozir ekranda siz uchun oltin salyut otiladi!";
    } else if (containsWord(negativeWords)) {
      sentiment = "negative";
      reply = "Fikringiz uchun rahmat. Kamchiliklarni bartaraf etish ustida ishlaymiz. 🛠️";
    }

    return { sentiment, reply };
  }

  // Default: chat mode
  let reply = "Salom! Men Og'abekning AI Copilot yordamchisiman. Sizga qanday yordam bera olaman?";
  let action: "navigate" | "theme" | "both" | "talk" = "talk";
  let scrollTarget: string | null = null;
  let themeColors: ChatResponse["themeColors"] = null;

  if (query.includes("loyiha") || query.includes("project") || query.includes("work")) {
    action = "navigate";
    scrollTarget = "#projects";
    reply = "Sizni Og'abekning ishlari joylashgan 'Projects' bo'limiga olib o'taman.";
  } else if (query.includes("skills") || query.includes("ko'nikma") || query.includes("texnologiya")) {
    action = "navigate";
    scrollTarget = "#skills";
    reply = "Mana Og'abek biladigan texnologiyalar va ko'nikmalar ro'yxati.";
  } else if (query.includes("about") || query.includes("haqida") || query.includes("og'abek kim")) {
    action = "navigate";
    scrollTarget = "#about";
    reply = "Og'abek haqidagi ma'lumotlar bilan tanishish uchun 'About' bo'limiga o'tamiz.";
  } else if (query.includes("contact") || query.includes("aloqa") || query.includes("bog'lanish")) {
    action = "navigate";
    scrollTarget = "#contact";
    reply = "U bilan bog'lanish uchun 'Contact' bo'limiga o'tamiz.";
  }

  if (query.includes("kiberpank") || query.includes("cyberpunk") || query.includes("binafsha") || query.includes("neon")) {
    action = action === "navigate" ? "both" : "theme";
    themeColors = {
      primary: "#03001e",
      secondary: "#1f0030",
      accent: "#ec38bc",
      light: "#fdeff9",
    };
    reply += " Ranglarni esa kiberpank (neon binafsha) rejimiga o'tkazaman!";
  } else if (query.includes("yashil") || query.includes("green") || query.includes("tabiat") || query.includes("botanik")) {
    action = action === "navigate" ? "both" : "theme";
    themeColors = {
      primary: "#0a1c12",
      secondary: "#153322",
      accent: "#4db885",
      light: "#eaf7f0",
    };
    reply += " Ranglarni esa botanik (tabiat yashili) rejimiga almashtiraman!";
  } else if (query.includes("oltin") || query.includes("gold") || query.includes("asliy") || query.includes("sariq") || query.includes("restore") || query.includes("reset")) {
    action = action === "navigate" ? "both" : "theme";
    themeColors = {
      primary: "#1a1a1a",
      secondary: "#2d2d2d",
      accent: "#c8a164",
      light: "#f5f5f5",
    };
    reply += " Ranglarni portfolioning asliy oltin-qorong'i rejimiga qaytardim.";
  }

  return { reply, action, scrollTarget, themeColors };
}
