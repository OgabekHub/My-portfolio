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
      timelineTitle: "Ta'lim va Tajriba",
      timeline: [
        {
          period: "2024 - Hozirgacha",
          title: "Frontend Dasturlash (Freelance / Amaliyot)",
          location: "Masofaviy",
          desc: "React.js, Next.js va Tailwind CSS yordamida turli xil veb-saytlar va foydalanuvchi interfeyslarini yaratish. Loyihalarni optimallashtirish va UI qulayligini ta'minlash."
        },
        {
          period: "2023 - Hozirgacha",
          title: "Kompyuter Ilmlari va Dasturiy Injiniring",
          location: "Namangan Davlat Universiteti",
          desc: "Algoritmlar, ma'lumotlar tuzilmalari, dasturlash asoslari va dasturiy ta'minotni ishlab chiqish metodologiyalarini o'rganish."
        },
        {
          period: "2023 (6 oy)",
          title: "Frontend Web Development Kursi",
          location: "IT Akademiya",
          desc: "HTML, CSS, JavaScript, SASS, Bootstrap, Git va React.js asoslari bo'yicha intensiv ta'lim va ko'plab amaliy loyihalarni ishlab chiqish."
        }
      ]
    },
    skills: {
      title: "Mening ko'nikmalarim",
      frontend: "Frontend Texnologiyalari",
      design: "Dizayn Asboblari",
      tools: "Dasturlash Asboblari va Boshqalar",
      badgesView: "Ko'nikmalar",
      progressView: "Darajalar"
    },
    projects: {
      title: "Mening Loyihalarim",
      all: "Barchasi",
      react: "React",
      vanilla: "Vanilla CSS/JS",
      design: "Dizayn",
      items: [
        {
          id: 1,
          title: "DevCommons – Dasturchilar Platformasi",
          desc: "Dasturchilar o'z kod parchalari (snippets), sun'iy intellekt promtlari va loyihalarini o'zaro bepul bo'lishadigan ochiq platforma. Next.js va Tailwind CSS yordamida yaratilgan zamonaviy hamjamiyat portal.",
          tags: ["react", "design"],
          techs: ["React", "Next.js", "Tailwind CSS", "TypeScript"]
        },
        {
          id: 2,
          title: "AgroVision AI Platformasi",
          desc: "AgroVision AI – Qishloq xo'jaligi uchun sun'iy intellekt platformasi. Zamonaviy kompyuter ko'rishi va chuqur o'rganish (YOLOv8 & EfficientNet) modellari yordamida o'simlik turlarini aniqlash, kasalliklarni tashxislash va aqlli ekin tavsiyalarini olish tizimi.",
          tags: ["react", "design"],
          techs: ["React", "Next.js", "Tailwind", "Python", "YOLOv8"]
        },
        {
          id: 3,
          title: "Faxr Mebel veb-sayti",
          desc: "Faxr Mebel – Zamonaviy mebel fabrikasining katalog veb-sayti. Mijozlarga oshxona, mehmonxona va yotoqxona uchun premium mebellarni onlayn ko'rish va buyurtma berish imkonini beruvchi chiroyli va qulay platforma.",
          tags: ["react", "design"],
          techs: ["React", "Vite", "Tailwind", "Framer Motion"]
        },
        {
          id: 4,
          title: "Zetra Store – Onlayn Do'kon",
          desc: "Zetra Store – Zamonaviy elektron savdo (E-commerce) platformasi. Foydalanuvchilarga eng so'nggi mahsulotlarni qulay katalogda ko'rish, saralash va tezgi buyurtma berish imkonini taqdim etuvchi zamonaviy internet do'kon.",
          tags: ["react", "design"],
          techs: ["React", "Next.js", "Tailwind CSS", "E-commerce"]
        },
        {
          id: 5,
          title: "Nexus Devs – Dasturchilar Agentligi",
          desc: "Nexus Devs – Zamonaviy IT agentlik va dasturiy yechimlar dizayn korxonasi sayti. Yuqori unumdorlik va mukammal UI/UX dizayn asosida qurilgan maxsus sahifa.",
          tags: ["react", "design"],
          techs: ["React", "Next.js", "Tailwind CSS", "UI/UX"]
        }
      ],
      liveDemo: "Saytni ko'rish",
      gitHub: "Kodni ko'rish",
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
      timelineTitle: "Education & Experience",
      timeline: [
        {
          period: "2024 - Present",
          title: "Frontend Developer (Freelance / Internship)",
          location: "Remote",
          desc: "Building websites and user interfaces using React.js, Next.js, and Tailwind CSS. Optimizing performance and ensuring user experience (UX) quality."
        },
        {
          period: "2023 - Present",
          title: "Computer Science & Software Engineering",
          location: "Namangan State University",
          desc: "Studying algorithms, data structures, programming fundamentals, and software development methodologies."
        },
        {
          period: "2023 (6 months)",
          title: "Frontend Web Development Course",
          location: "IT Academy",
          desc: "Intensive training on HTML, CSS, JavaScript, SASS, Bootstrap, Git, and React.js basics along with building real-world practical projects."
        }
      ]
    },
    skills: {
      title: "My Skills",
      frontend: "Frontend Technologies",
      design: "Design Tools",
      tools: "Development Tools & Others",
      badgesView: "Skills",
      progressView: "Proficiency"
    },
    projects: {
      title: "My Projects",
      all: "All",
      react: "React",
      vanilla: "Vanilla CSS/JS",
      design: "Design",
      items: [
        {
          id: 1,
          title: "DevCommons Platform",
          desc: "An open platform where developers share their code snippets, AI prompts, and useful architectural resources for free. Built with Next.js, Tailwind CSS, and full interactive UI features.",
          tags: ["react", "design"],
          techs: ["React", "Next.js", "Tailwind CSS", "TypeScript"]
        },
        {
          id: 2,
          title: "AgroVision AI Platform",
          desc: "AgroVision AI – Artificial Intelligence platform for agriculture in Uzbekistan. Utilizing modern computer vision and deep learning (YOLOv8 & EfficientNet) models to detect plant types, diagnose crop diseases, and provide smart agricultural recommendations.",
          tags: ["react", "design"],
          techs: ["React", "Next.js", "Tailwind", "Python", "YOLOv8"]
        },
        {
          id: 3,
          title: "Faxr Mebel Website",
          desc: "Faxr Mebel – Catalog and showcase website for a modern furniture factory. An elegant platform for clients to browse and order premium kitchen, bedroom, and living room furniture online.",
          tags: ["react", "design"],
          techs: ["React", "Vite", "Tailwind", "Framer Motion"]
        },
        {
          id: 4,
          title: "Zetra Store E-Commerce",
          desc: "Zetra Store – A modern electronic commerce platform featuring dynamic product catalogs, seamless filtering, and responsive shopping cart workflows for an elite shopping experience.",
          tags: ["react", "design"],
          techs: ["React", "Next.js", "Tailwind CSS", "E-commerce"]
        },
        {
          id: 5,
          title: "Nexus Devs Digital Agency",
          desc: "Nexus Devs – Modern IT agency and software solutions portal featuring state-of-the-art UI/UX animations and high-performance frontend architecture.",
          tags: ["react", "design"],
          techs: ["React", "Next.js", "Tailwind CSS", "UI/UX"]
        }
      ],
      liveDemo: "Live Demo",
      gitHub: "View Code",
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
