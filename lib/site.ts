export const site = {
  name: "Prakash Sirvi K",
  firstName: "Prakash",
  lastName: "Sirvi K",
  /* One sentence. Never a paragraph — jingjinghan.com's discipline. */
  positioning:
    "I build complete, tested applications — Python and FastAPI on the backend, Next.js and TypeScript on the front.",
  roles: ["Full-stack", "Backend / Python", "Frontend / React"],
  seeking: "Open to junior software engineering roles",

  location: "Bengaluru, India",
  locationShort: "Bengaluru",
  /* jcedrik.com uses coordinates instead of a city name. */
  coordinates: "12.9716° N — 77.5946° E",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  relocate: "Open to relocate",

  email: "prakashpv.tech@gmail.com",
  github: "https://github.com/prakashpvtech",
  githubHandle: "prakashpvtech",
  linkedin: "https://www.linkedin.com/in/prakashsirvik",

  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Surana Evening College, Bengaluru",
    graduation: "Expected 2027",
  },

  stamp: "PORTFOLIO — 2K26",
  sourceRepo: "https://github.com/prakashpvtech/portfolio",
} as const;

export const sections = [
  { id: "intro", index: "01", label: "Intro" },
  { id: "work", index: "02", label: "Selected Work" },
  { id: "how-i-build", index: "03", label: "How I Build" },
  { id: "about", index: "04", label: "About" },
  { id: "contact", index: "05", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
