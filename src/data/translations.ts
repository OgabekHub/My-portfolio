export type Language = "uz" | "en";

export const translations = {
  uz: {
    nav: {
      home: "Bosh sahifa",
      about: "Men haqimda",
      skills: "Ko'nikmalar",
      projects: "Loyihalar",
      contact: "Aloqa",
    },
    hero: {
      role: "Frontend Dasturchi",
      hello: "Assalomu alaykum,",
      im: "Men Og'abek",
      surname: "Olimjonov",
      words: ["Web Dasturchi", "UI/UX Dizayner", "Frontend Dasturchi"],
      talk: "Bog'lanish",
      work: "Loyihalarim",
    },
    about: {
      title: "Men haqimda",
      intro: "Assalomu alaykum! Men Og'abek Olimjonov — zamonaviy, tezkor va foydalanuvchilar uchun qulay veb-saytlar yaratishga qiziquvchi Junior Frontend dasturchiman. HTML, CSS, JavaScript va React.js yordamida responsive (moslashuvchan) interfeyslar yaratish hamda Figma dizaynlarini piksel-ideal ko'rinishda kodga o'tkazish bo'yicha amaliy tajribaga egaman. Har doim toza kod yozishga va ilg'or texnologiyalarni o'rganishga intilaman.",
      coreSkillsTitle: "Asosiy Ko'nikmalar",
      coreSkills: [
        "HTML5, CSS3, JavaScript",
        "React.js, Moslashuvchan Dizayn (Responsive)",
        "UI/UX Dizayn, Figma"
      ],
      interestsTitle: "Qiziqishlar",
      interests: [
        "Veb Dasturlash",
        "UI/UX Dizayn",
        "Musiqa tinglash 🎵"
      ],
      goalsTitle: "Mening Maqsadlarim",
      goalsDesc: "Professional dasturchi bo'lib yetishish, xalqaro loyihalarda ishtirok etish va kelajakda o'z IT kompaniyamga asos solish.",
      viewResume: "Rezyumeni Ko'rish",
    },
    skills: {
      title: "Mening ko'nikmalarim",
      frontend: "Frontend Texnologiyalari",
      design: "Dizayn Asboblari",
      tools: "Dasturlash Asboblari va Boshqalar"
    },
    projects: {
      title: "Mening Loyihalarim",
      all: "Barchasi",
      filters: {
        nextjs: "Next.js",
        react: "React",
        ai: "Sun'iy intellekt",
        ecommerce: "Elektron savdo",
        landing: "Landing / Agentlik",
      } as Record<string, string>,
      empty: "Bu turkumda hozircha loyiha yo'q.",
      items: [
        {
          id: 1,
          title: "DevCommons – Dasturchilar Platformasi",
          desc: "Dasturchilar va AI bilan ishlaydiganlar uchun kod parchalari, promtlar va agent konfiguratsiyalarini bir joyda saqlab, ulashadigan platforma. REST API, CLI va MCP orqali ham ulanish mumkin.",
          role: "Frontend, Supabase bazasi va autentifikatsiya, API, CLI",
          techs: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"]
        },
        {
          id: 2,
          title: "AgroVision AI Platformasi",
          desc: "Fermer o'simlik yoki kasallangan barg rasmini yuklaydi — platforma turini aniqlaydi, tashxis qo'yadi va o'zbek tilida davolash tavsiyasini beradi. Gemini Vision va men o'zim o'rgatgan EfficientNet-B3 modeli birga ishlaydi.",
          role: "Frontend, FastAPI backend, modelni o'rgatish",
          techs: ["Next.js", "React", "FastAPI", "PyTorch", "Gemini Vision"]
        },
        {
          id: 3,
          title: "Faxr Mebel veb-sayti",
          desc: "Mebel fabrikasi uchun buyurtma asosida qilingan katalog sayti: kolleksiyalar, AR orqali mebelni xonada ko'rish, konsultatsiya band qilish va admin paneli. Uch tilda ishlaydi.",
          role: "Buyurtma ishi — butun frontend, Firebase, AR ko'rish",
          techs: ["React", "Vite", "Firebase", "Tailwind"]
        },
        {
          id: 4,
          title: "Zetra Store – Onlayn Do'kon",
          desc: "Raqamli mahsulotlar bozorining frontend qismi: katalog, saralash, savat, valyuta va til almashtirish. Ma'lumotlar statik, to'lov tizimi ulanmagan — e'tibor holat boshqaruvi va testlarga qaratilgan.",
          role: "Frontend — o'z holat qatlami, 18 ta test, CI",
          techs: ["Next.js 16", "React 19", "Tailwind 4", "Vitest"]
        },
        {
          id: 5,
          title: "Nexus Devs – shaxsiy sayt va blog",
          desc: "Frontend, AI avtomatlashtirish va Telegram botlar yo'nalishlarini ko'rsatuvchi shaxsiy sayt. Markdown fayllardan quriladigan blog va EmailJS orqali ishlaydigan bog'lanish formasi bilan.",
          role: "Butun sayt — Next.js, fayl asosidagi blog",
          techs: ["Next.js", "React", "Tailwind CSS", "Markdown"]
        }
      ],
      liveDemo: "Saytni ko'rish",
      gitHub: "Kodni ko'rish",
      caseStudy: "Batafsil tahlil",
      roleLabel: "Mening rolim",
      showMore: "Ko'proq ko'rish",
      showLess: "Yig'ish"
    },
    contact: {
      title: "Men bilan bog'lanish",
      connect: "Aloqa o'rnatamiz",
      desc: "Har qanday savol yoki hamkorlik takliflari uchun murojaat qilishingiz mumkin. Yangi loyihalar va ajoyib g'oyalarni muhokama qilish uchun doim ochiqman.",
      nameLabel: "Ismingiz",
      namePlaceholder: "Ismingizni kiriting",
      emailLabel: "Elektron pochta",
      emailPlaceholder: "Pochtangizni kiriting",
      subjectLabel: "Mavzu",
      subjectPlaceholder: "Mavzu",
      messageLabel: "Xabar",
      messagePlaceholder: "Xabaringizni yozing...",
      sendBtn: "Xabarni Yuborish",
      sendingBtn: "Yuborilmoqda...",
      errorAlert: "❌ Kechirasiz, xatolik yuz berdi. Iltimos, menga to'g'ridan-to'g'ri yozing:\nolimjonov.ogabek.dev@gmail.com"
    },
    footer: {
      desc: "Chiroyli va funksional veb-tajribalar yaratishga ishtiyoqi baland frontend dasturchi. Fikrlaringizni hayotga tatbiq etish uchun birgalikda ishlaymiz.",
      quickLinks: "Tezkor havolalar",
      info: "Aloqa ma'lumotlari",
      rights: "Barcha huquqlar himoyalangan.",
      madeWith: "tomonidan yaratildi"
    },
    thankYou: {
      title: "Xabar Qabul Qilindi!",
      desc: "Murojaat qilganingiz uchun tashakkur! Xabaringizni oldim va siz bilan 24-48 soat ichida bog'lanaman. Siz bilan muloqot qilishni intiqlik bilan kutaman! 🚀",
      redirect: "Bosh sahifaga qaytishga qoldi:",
      seconds: "soniya...",
      backBtn: "Bosh sahifaga",
      projectsBtn: "Loyihalarim",
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      role: "Frontend Developer",
      hello: "Hello,",
      im: "I'm Og'abek",
      surname: "Olimjonov",
      words: ["Web Developer", "UI/UX Designer", "Frontend Developer"],
      talk: "Let's Talk",
      work: "My Work",
    },
    about: {
      title: "About Me",
      intro: "Hello! I'm Og'abek Olimjonov, a passionate Junior Frontend Developer dedicated to building modern, responsive, and user-friendly web interfaces. I have hands-on experience working with HTML, CSS, JavaScript, and React.js, focusing on pixel-perfect translation from Figma designs to clean, maintainable code. I am always eager to learn new technologies and build solutions that deliver great user experiences.",
      coreSkillsTitle: "Core Skills",
      coreSkills: [
        "HTML5, CSS3, JavaScript",
        "React.js, Responsive Design",
        "UI/UX Design, Figma"
      ],
      interestsTitle: "Interests",
      interests: [
        "Web Development",
        "UI/UX Design",
        "Listening to music 🎵"
      ],
      goalsTitle: "My Goals",
      goalsDesc: "To become a professional developer, participate in international projects, and establish my own IT company in the future.",
      viewResume: "View My Resume",
    },
    skills: {
      title: "My Skills",
      frontend: "Frontend Technologies",
      design: "Design Tools",
      tools: "Development Tools & Others"
    },
    projects: {
      title: "My Projects",
      all: "All",
      filters: {
        nextjs: "Next.js",
        react: "React",
        ai: "AI / Machine Learning",
        ecommerce: "E-Commerce",
        landing: "Landing / Agency",
      } as Record<string, string>,
      empty: "No projects in this category yet.",
      items: [
        {
          id: 1,
          title: "DevCommons Platform",
          desc: "A platform where developers and people working with AI keep and share code snippets, prompts and agent configurations in one place, reachable through a REST API, a CLI and MCP.",
          role: "Frontend, Supabase database and auth, API, CLI",
          techs: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"]
        },
        {
          id: 2,
          title: "AgroVision AI Platform",
          desc: "A farmer uploads a photo of a plant or a diseased leaf; the platform identifies it, diagnoses the problem and gives treatment advice in Uzbek. Gemini Vision works together with an EfficientNet-B3 model I trained myself.",
          role: "Frontend, FastAPI backend, model training",
          techs: ["Next.js", "React", "FastAPI", "PyTorch", "Gemini Vision"]
        },
        {
          id: 3,
          title: "Faxr Mebel Website",
          desc: "A commissioned catalogue site for a furniture factory: collections, viewing a piece in your own room through AR, consultation booking and an admin area. Ships in three languages.",
          role: "Client work — the whole frontend, Firebase, AR viewing",
          techs: ["React", "Vite", "Firebase", "Tailwind"]
        },
        {
          id: 4,
          title: "Zetra Store E-Commerce",
          desc: "The frontend of a digital-products marketplace: catalogue, filtering, cart, currency and language switching. The data is static and no payment provider is wired up — the focus was state management and tests.",
          role: "Frontend — custom state layer, 18 test files, CI",
          techs: ["Next.js 16", "React 19", "Tailwind 4", "Vitest"]
        },
        {
          id: 5,
          title: "Nexus Devs – personal site and blog",
          desc: "A personal site presenting frontend, AI automation and Telegram bot work, with a blog built from Markdown files and a contact form running on EmailJS.",
          role: "The whole site — Next.js, file-based blog",
          techs: ["Next.js", "React", "Tailwind CSS", "Markdown"]
        }
      ],
      liveDemo: "Live Demo",
      gitHub: "View Code",
      caseStudy: "Read the case study",
      roleLabel: "My role",
      showMore: "Show More",
      showLess: "Show Less"
    },
    contact: {
      title: "Contact Me",
      connect: "Let's Connect",
      desc: "Feel free to reach out to me for any questions or opportunities. I'm always open to discussing new projects and ideas.",
      nameLabel: "Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      subjectLabel: "Subject",
      subjectPlaceholder: "Subject",
      messageLabel: "Message",
      messagePlaceholder: "Write your message...",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      errorAlert: "❌ Sorry, something went wrong. Please email me directly:\nolimjonov.ogabek.dev@gmail.com"
    },
    footer: {
      desc: "A passionate frontend developer focused on creating beautiful and functional web experiences. Let's work together to bring your ideas to life.",
      quickLinks: "Quick Links",
      info: "Contact Info",
      rights: "All rights reserved.",
      madeWith: "Made with"
    },
    thankYou: {
      title: "Message Received!",
      desc: "Thank you for reaching out! I've received your message and will get back to you within 24–48 hours. Looking forward to connecting with you! 🚀",
      redirect: "Redirecting to home in",
      seconds: "seconds...",
      backBtn: "Back to Portfolio",
      projectsBtn: "My Projects",
    }
  }
};
