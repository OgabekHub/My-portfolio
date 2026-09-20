import type { Language } from "./translations";

/**
 * Batafsil case study'lar.
 *
 * Kartadagi bir qatorlik ta'rif ish beruvchiga yetarli emas — u nima
 * qurganingizni, qanday qaror qabul qilganingizni va nimasi qiyin bo'lganini
 * bilishi kerak. Shuning uchun eng kuchli ikki loyiha uchun alohida sahifa.
 *
 * Bu yerdagi har bir texnik da'vo repodagi koddan tekshirilgan. Tasdiqlab
 * bo'lmaydigan raqam (masalan model aniqligi foizi) ataylab yozilmagan.
 */

export interface CaseSection {
  heading: string;
  /** Har bir band alohida paragraf. */
  body: string[];
}

export interface CaseStudy {
  slug: string;
  /** projects.ts dagi id — karta bilan bog'lash uchun. */
  projectId: number;
  title: string;
  /** Sahifa tepasidagi bir jumlalik ta'rif. */
  summary: string;
  role: string;
  period: string;
  stack: string[];
  liveUrl: string;
  repoUrl: string;
  image: string;
  sections: CaseSection[];
  /** Tekshirib bo'ladigan natijalar — yorliq va qiymat. */
  facts: { label: string; value: string }[];
}

const uz: CaseStudy[] = [
  {
    slug: "devcommons",
    projectId: 1,
    title: "DevCommons",
    summary:
      "Dasturchilar va AI bilan ishlaydiganlar uchun kod parchalari, promtlar va agent konfiguratsiyalarini bir joyda saqlab, ulashadigan platforma.",
    role: "Next.js frontend, Supabase ma'lumotlar bazasi va autentifikatsiya, REST API, CLI va MCP serveri",
    period: "2026-yil iyul — sentabr",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Supabase (Postgres, RLS, GitHub OAuth)",
      "Tailwind CSS",
      "Monaco Editor",
      "Sandpack",
      "next-intl",
      "Jest",
    ],
    liveUrl: "https://devcommons.vercel.app/",
    repoUrl: "https://github.com/OgabekHub/devcommons",
    image: "/img/devcommons.png",
    sections: [
      {
        heading: "Muammo",
        body: [
          "Dasturchining foydali kod parchalari, promtlari va AI agent sozlamalari hamma joyda sochilib yotadi: chat tarixida, qaydlarda, gist'larda, eski loyihalarda. Kerak bo'lganda topib bo'lmaydi, boshqaga ulashish esa yana ham qiyin.",
          "So'nggi yillarda bu muammo kengaydi — endi faqat kod emas, promtlar, Cursor qoidalari, Claude konfiguratsiyalari ham xuddi shunday sochilib ketadi. Ularni saqlaydigan umumiy joy yo'q edi.",
        ],
      },
      {
        heading: "Nima qurdim",
        body: [
          "Foydalanuvchi GitHub orqali kiradi, Monaco muharririda kod parchasi yozadi, uni Sandpack'da o'sha zahoti ishlatib ko'radi va til hamda teglar bilan chop etadi. Boshqalar ovoz beradi, saqlaydi, fork qiladi, izoh qoldiradi yoki versiyalar tarixini ko'radi.",
          "Promtlar uchun alohida \"playground\" bor: promt ichidagi {{o'zgaruvchi}} joylarini to'ldirib, natijani darhol ko'rish mumkin.",
          "Kontentni saytdan tashqarida ham olish mumkin — foydalanuvchi API kalit yaratadi va REST API, `devcommons` CLI yoki MCP orqali ulanadi. MCP nuqtasi Claude Desktop va Cursor bilan ishlashi uchun qo'lda yozilgan JSON-RPC server.",
          "Qidiruv Postgres'ning to'liq matnli qidiruvi (tsvector, GIN indeks, pg_trgm) ustida ishlaydi, bildirishnomalar esa Supabase realtime kanali orqali keladi.",
        ],
      },
      {
        heading: "Eng qiyin joyi",
        body: [
          "Eng qiyin qismi texnik emas, foydalanuvchini tushunish bo'ldi. Platforma dasturchilar, AI bilan ishlaydiganlar va vibe coding qiladiganlar uchun. Ularning bugungi og'riqlari nimada — shuni aniqlab, platformani shunga qarab qurish kerak edi, qurish oson bo'lgan narsaga qarab emas.",
          "Texnik tomondan eng ko'p vaqt olgan joy — xavfsizlik va cheklovlar. 20 ta jadval ustiga 92 ta Row Level Security siyosati yozildi. Yo'l davomida jiddiy kamchilik topildi: autentifikatsiyasiz ham yozuv qo'shish mumkin edi. Uni alohida migratsiya bilan yopdim.",
          "Rate limiting serverless muhitda ishlashi kerak edi, lekin yangi dependency qo'shmasdan. Yechim: Upstash Redis'ga bitta HTTP so'rovda INCR + EXPIRE + TTL yuborish, Upstash bo'lmasa xotiradagi Map'ga tushib qolish.",
        ],
      },
      {
        heading: "Natija",
        body: [
          "Platforma to'liq ishlaydi: 217 commit, ~15 800 qator TypeScript, Jest testlari va har PR'da lint → tip tekshiruvi → test → build zanjiri.",
          "Keyingi qadam — kontent. Platforma tayyor, lekin unda hali jamoa to'plagan material yo'q. Keyingi ish texnik emas, odamlarni jalb qilish.",
        ],
      },
    ],
    facts: [
      { label: "Commit", value: "217" },
      { label: "Kod hajmi", value: "~15 800 qator TS/TSX" },
      { label: "Ma'lumotlar bazasi", value: "20 jadval, 92 RLS siyosati" },
      { label: "Testlar", value: "Jest + GitHub Actions CI" },
      { label: "Tillar", value: "O'zbekcha va inglizcha" },
    ],
  },
  {
    slug: "agrovision-ai",
    projectId: 2,
    title: "AgroVision AI",
    summary:
      "Fermer o'simlik yoki kasallik rasmini yuklaydi — platforma turini aniqlaydi, tashxis qo'yadi va o'zbek tilida davolash tavsiyasini beradi.",
    role: "Frontend (Next.js), FastAPI backend, EfficientNet-B3 modelini o'zim o'rgatdim, Telegram bot",
    period: "2026-yil may — iyun",
    stack: [
      "Next.js 15",
      "React 19",
      "FastAPI (Python)",
      "PyTorch / EfficientNet-B3",
      "Gemini 2.5 Flash Vision",
      "Supabase",
      "Cloudinary",
      "Leaflet",
    ],
    liveUrl: "https://agro-vision-ai-zeta.vercel.app/",
    repoUrl: "https://github.com/OgabekHub/agro-vision-ai",
    image: "/img/agrovision.png",
    sections: [
      {
        heading: "Muammo",
        body: [
          "Fermer barg yoki mevadagi dog'ni ko'radi, lekin bu qanday kasallik ekanini va nima qilish kerakligini bilmaydi. Mutaxassisga murojaat qilish har doim ham imkon emas, internetdagi ma'lumot esa asosan chet tilida va boshqa iqlim uchun yozilgan.",
          "Kerak bo'lgan narsa oddiy: telefonda rasmga olasan, javobni o'zbek tilida va shu yerdagi sharoitga mos holda olasan.",
        ],
      },
      {
        heading: "Nima qurdim",
        body: [
          "Next.js frontend Vercel'da, FastAPI backend esa Hugging Face Spaces'da ishlaydi. Uchta tahlil turi bor: o'simlik turini aniqlash, kasallik tahlili va yer tahlili. Har bir natija Supabase'ga model nomi va ishlov berish vaqti bilan yoziladi.",
          "O'zbekistonning 14 ta hududi uchun iqlim, tuproq va ekin ma'lumotlari Leaflet xaritasida ko'rsatiladi.",
          "Saytdan tashqari ikkinchi kirish nuqtasi — Telegram bot, chunki ko'p fermer uchun Telegram brauzerdan qulayroq.",
        ],
      },
      {
        heading: "Qabul qilgan asosiy qarorim",
        body: [
          "Boshida YOLOv8 bilan qilmoqchi edim. Keyin Gemini Vision'ga o'tdim: Google'da o'simliklarga oid ma'lumot juda ko'p, va men o'zim yig'a oladigan ma'lumotdan ancha kengroq. Shuning uchun aniqlash sifati yuqoriroq bo'ladi deb hisobladim.",
          "Lekin faqat Gemini'ga tayanmadim. O'zim EfficientNet-B3 modelini 109 ta sinf uchun o'rgatdim va ikkovini birga ishlatdim.",
          "Ular quyidagicha birlashadi: avval Gemini rasmni ko'rib kategoriyani aniqlaydi. Keyin mening modelim ishga tushadi, lekin softmax'da o'sha kategoriyadan tashqaridagi barcha sinflar nolga tushiriladi va qayta normallashtiriladi — ya'ni Gemini'ning qarori mening modelimning qidiruv maydonini toraytiradi. Oxirida ishonch darajasiga qarab qaysi biri g'olib bo'lishi hal qilinadi. Agar ishonch 0.40 dan past bo'lsa, tizim javob bermaydi va yaxshiroq rasm so'raydi. Qaysi yo'l ishlatilgani har bir natijada saqlanadi.",
        ],
      },
      {
        heading: "Eng qiyin joyi",
        body: [
          "Eng qiyin qismi ma'lumot bo'ldi. Modelni o'rgatish uchun o'simliklar haqida juda katta hajmdagi ma'lumot kerak ekan. Platforma samarali ishlashi uchun shunga o'xshash ma'lumotni ko'proq to'plash zarurligini ish jarayonida tushundim.",
          "Bu men uchun asosiy saboq bo'ldi: model arxitekturasi emas, ma'lumot sifati va hajmi natijani belgilaydi.",
        ],
      },
      {
        heading: "Natija va keyingi qadam",
        body: [
          "Backend jonli ishlaydi, tahlil natijalari bazaga yoziladi. Frontend uch tilda (o'zbek, rus, ingliz).",
          "Keyingi ish — o'rgatish uchun ma'lumot to'plamini kengaytirish va model sifatini o'lchab, natijani hujjatlashtirish.",
        ],
      },
    ],
    facts: [
      { label: "Model", value: "EfficientNet-B3, 109 sinf, o'zim o'rgatgan" },
      { label: "Ikkinchi model", value: "Gemini 2.5 Flash Vision" },
      { label: "Backend", value: "FastAPI, Hugging Face Spaces" },
      { label: "Kirish nuqtalari", value: "Veb-sayt va Telegram bot" },
      { label: "Tillar", value: "O'zbek, rus, ingliz" },
    ],
  },
];

const en: CaseStudy[] = [
  {
    slug: "devcommons",
    projectId: 1,
    title: "DevCommons",
    summary:
      "A platform where developers and people working with AI keep and share code snippets, prompts and agent configurations in one place.",
    role: "Next.js frontend, Supabase database and auth, REST API, CLI and MCP server",
    period: "July – September 2026",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Supabase (Postgres, RLS, GitHub OAuth)",
      "Tailwind CSS",
      "Monaco Editor",
      "Sandpack",
      "next-intl",
      "Jest",
    ],
    liveUrl: "https://devcommons.vercel.app/",
    repoUrl: "https://github.com/OgabekHub/devcommons",
    image: "/img/devcommons.png",
    sections: [
      {
        heading: "The problem",
        body: [
          "A developer's useful snippets, prompts and AI agent settings end up scattered everywhere: in chat history, in notes, in gists, in old projects. They are hard to find again and harder to share.",
          "In the last few years the problem grew past code. Prompts, Cursor rules and Claude configs get lost the same way, and there was no shared place to keep them.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "You sign in with GitHub, write a snippet in a Monaco editor, run it immediately in a Sandpack preview, and publish it with a language and tags. Others vote, bookmark, fork, comment or open the version history.",
          "Prompts get their own playground: fill in the {{variable}} placeholders and see the result right away.",
          "The content is reachable from outside the site too. You mint an API key and pull through the REST API, the `devcommons` CLI, or MCP — a hand-written JSON-RPC server so the library works inside Claude Desktop and Cursor.",
          "Search runs on Postgres full-text search (tsvector, GIN indexes, pg_trgm), and notifications arrive over a Supabase realtime channel.",
        ],
      },
      {
        heading: "The hardest part",
        body: [
          "The hardest part was not technical — it was understanding the user. The platform is for developers, for people working with AI, and for people doing vibe coding. I had to work out what actually hurts for them today and shape the platform around that, rather than around whatever was easiest to build.",
          "On the technical side, security and limits took the most time. 92 Row Level Security policies across 20 tables. Along the way I found a real hole: rows could be inserted without authentication. I closed it in a dedicated migration.",
          "Rate limiting had to work on serverless without adding a dependency. The answer was one HTTP round-trip to Upstash Redis carrying INCR + EXPIRE + TTL together, falling back to an in-memory Map when Upstash is not configured.",
        ],
      },
      {
        heading: "Result",
        body: [
          "The platform is fully working: 217 commits, roughly 15,800 lines of TypeScript, Jest tests and a lint → typecheck → test → build chain on every PR.",
          "What is missing is content. The platform is ready but the community material is not there yet, so the next job is not engineering — it is getting people in.",
        ],
      },
    ],
    facts: [
      { label: "Commits", value: "217" },
      { label: "Code size", value: "~15,800 lines of TS/TSX" },
      { label: "Database", value: "20 tables, 92 RLS policies" },
      { label: "Tests", value: "Jest + GitHub Actions CI" },
      { label: "Languages", value: "Uzbek and English" },
    ],
  },
  {
    slug: "agrovision-ai",
    projectId: 2,
    title: "AgroVision AI",
    summary:
      "A farmer uploads a photo of a plant or a diseased leaf; the platform identifies it, diagnoses the problem and gives treatment advice in Uzbek.",
    role: "Frontend (Next.js), FastAPI backend, trained the EfficientNet-B3 model myself, Telegram bot",
    period: "May – June 2026",
    stack: [
      "Next.js 15",
      "React 19",
      "FastAPI (Python)",
      "PyTorch / EfficientNet-B3",
      "Gemini 2.5 Flash Vision",
      "Supabase",
      "Cloudinary",
      "Leaflet",
    ],
    liveUrl: "https://agro-vision-ai-zeta.vercel.app/",
    repoUrl: "https://github.com/OgabekHub/agro-vision-ai",
    image: "/img/agrovision.png",
    sections: [
      {
        heading: "The problem",
        body: [
          "A farmer sees a spot on a leaf or a fruit but does not know which disease it is or what to do about it. An expert is not always reachable, and what is online is mostly in another language and written for another climate.",
          "What is actually needed is simple: take a photo on your phone, get the answer in Uzbek and for local conditions.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "A Next.js frontend on Vercel with a FastAPI backend on Hugging Face Spaces. There are three kinds of analysis: plant identification, disease analysis and land analysis. Every result is written to Supabase together with the model used and the processing time.",
          "Climate, soil and crop data for the 14 regions of Uzbekistan are shown on a Leaflet map.",
          "A Telegram bot is a second entry point, because for many farmers Telegram is easier to reach than a browser.",
        ],
      },
      {
        heading: "The main decision I made",
        body: [
          "I started out intending to use YOLOv8. Then I moved to Gemini Vision: Google has a great deal of plant data behind it, far more than I could assemble myself, so I judged that recognition would be more accurate that way.",
          "But I did not rely on Gemini alone. I trained an EfficientNet-B3 model myself over 109 classes and used the two together.",
          "They combine like this: Gemini looks at the image first and decides the category. Then my model runs, but every class outside that category is zeroed out of the softmax and the rest renormalized — so Gemini's judgement narrows my model's search space. Finally the two are arbitrated by confidence. Below 0.40 the system refuses to answer and asks for a better photo. Which path won is stored with every result.",
        ],
      },
      {
        heading: "The hardest part",
        body: [
          "The hardest part was the data. Training the model takes a very large amount of material about plants, and during the work I came to understand that the platform only performs well once you have gathered much more of it.",
          "That was the main lesson for me: it is the quality and the amount of data, not the model architecture, that decides the result.",
        ],
      },
      {
        heading: "Result and what is next",
        body: [
          "The backend is live and analysis results are logged to the database. The frontend ships in three languages (Uzbek, Russian, English).",
          "The next piece of work is to widen the training set, then measure the model properly and publish the numbers.",
        ],
      },
    ],
    facts: [
      { label: "Model", value: "EfficientNet-B3, 109 classes, trained by me" },
      { label: "Second model", value: "Gemini 2.5 Flash Vision" },
      { label: "Backend", value: "FastAPI on Hugging Face Spaces" },
      { label: "Entry points", value: "Website and Telegram bot" },
      { label: "Languages", value: "Uzbek, Russian, English" },
    ],
  },
];

export const CASE_STUDIES: Record<Language, CaseStudy[]> = { uz, en };

export const CASE_STUDY_SLUGS = uz.map((c) => c.slug);

export function getCaseStudy(locale: Language, slug: string): CaseStudy | undefined {
  return CASE_STUDIES[locale].find((c) => c.slug === slug);
}
