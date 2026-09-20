/**
 * Loyihalar ro'yxati — tilga bog'liq bo'lmagan ma'lumotlar.
 *
 * Nomi va ta'rifi `translations.ts` ichida (projects -> items), chunki ular
 * tarjima qilinadi. Bu yerda faqat rasm, havolalar va teglar turadi, shuning
 * uchun ro'yxatni JSON-LD (server tomoni) ham, Projects komponenti ham
 * bir manbadan o'qiydi.
 *
 * Yangi loyiha qo'shsangiz: shu yerga id bilan qo'shing, keyin
 * `translations.ts` dagi uz va en bo'limlariga ham xuddi shu id bilan
 * nomi va ta'rifini yozing.
 */
export interface ProjectData {
  id: number;
  /** JSON-LD va boshqa mashina o'qiydigan joylar uchun barqaror nom. */
  name: string;
  image: string;
  github: string;
  demo: string;
  tags: string[];
  /** Batafsil tahlil sahifasi bo'lsa — uning slug'i. */
  caseSlug?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 1,
    name: "DevCommons",
    image: "/img/devcommons.png",
    github: "https://github.com/OgabekHub/devcommons",
    demo: "https://devcommons.vercel.app/",
    tags: ["nextjs", "react"],
    caseSlug: "devcommons",
  },
  {
    id: 2,
    name: "AgroVision AI",
    image: "/img/agrovision.png",
    github: "https://github.com/OgabekHub/agro-vision-ai",
    demo: "https://agro-vision-ai-zeta.vercel.app/",
    tags: ["ai", "nextjs", "react"],
    caseSlug: "agrovision-ai",
  },
  {
    id: 3,
    name: "Faxr Mebel",
    image: "/img/faxrmebel.png",
    github: "https://github.com/OgabekHub/faxr-mebel",
    demo: "https://faxr-mebel.vercel.app/",
    tags: ["react", "landing"],
  },
  {
    id: 4,
    name: "Zetra Store",
    image: "/img/zetrastore.png",
    github: "https://github.com/OgabekHub/zetra-store",
    demo: "https://zetra-store-one.vercel.app/",
    tags: ["ecommerce", "nextjs", "react"],
  },
  {
    id: 5,
    name: "NexusDevs",
    image: "/img/nexusdevs.png",
    github: "https://github.com/OgabekHub/nexus-devs",
    demo: "https://nexusdevs.vercel.app/",
    tags: ["landing", "nextjs", "react"],
  },
];
