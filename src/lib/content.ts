export const profile = {
  name: "Nguyễn Minh Tâm",
  handle: "Tam02112003",
  role: "Backend Developer",
  location: "Ho Chi Minh City, Vietnam",
  email: "ngminhtam021103@gmail.com",
  github: "https://github.com/Tam02112003",
  bio: "Backend Developer tốt nghiệp ngành Kỹ thuật Phần mềm tại HUTECH (Đại học Công nghệ TP.HCM). Thích xây dựng các hệ thống chạy được thật sự, từ backend Java/Spring đến các dịch vụ AI/chatbot bằng Python, và luôn tò mò với công nghệ mới.",
};

export const skills = {
  languages: ["Java", "Python", "TypeScript", "C#", "SQL"],
  frameworks: ["Spring Boot MVC", "FastAPI", "Next.js", "React"],
  tools: ["Docker", "Nginx", "Git", "SQL Server", "MySQL", "PostgreSQL"],
  concepts: ["OOP", "Deep Learning", "REST API Design", "Interface Design"],
  soft: [
    "Communication",
    "Self-Learning Mindset",
    "Problem-Solving",
    "Teamwork & Collaboration",
    "English Reading Comprehension",
  ],
};

export type TimelineEntry = {
  kind: "education" | "experience";
  title: string;
  org: string;
  period: string;
  detail: string;
};

export const timeline: TimelineEntry[] = [
  {
    kind: "experience",
    title: "BE Developer",
    org: "TDT Asia",
    period: "01/2026 — Present",
    detail: "Backend development.",
  },
  {
    kind: "experience",
    title: "AI Engineer Intern",
    org: "HDBank",
    period: "06/2025 — 09/2025",
    detail: "AI engineering internship.",
  },
  {
    kind: "education",
    title: "Software Engineering",
    org: "HUTECH (Ho Chi Minh City University of Technology) — Faculty of Information Technology",
    period: "09/2021 — 09/2025",
    detail: "Good Academic Performance.",
  },
];

export const featuredRepos = [
  "Chatbot_Hybrid-Retrieval",
  "Website-TMDT-AI",
  "Front-end_Website-TMDT-AI",
  "medi247-ai-assistant",
];

export const excludedRepos = new Set([
  "Tam02112003",
  "NguyenMinhTam-Website",
  "nguyenminhtamwebsite.github.io",
  "DACNreadme",
  "btnhombuoi7",
  "KTCaNhanJAVA",
  "KiemTraCaNhanMonJava",
  "baitapnhombuoi7java",
  "BT-tuan5Java",
  "CRUD-in-Java",
  "CRUDValidationJAVA",
  "N4_21DTHB4",
  "First-Deploy-Token",
  "TDT-training-frontend",
  "TDTASIA_Training",
  "Website-Management-Hotel",
  "Backend-Financial",
  "Python_co_ban",
  "Webbantruyen_DAPHP_Nhom6",
  "Back-end-Websitecanhan",
]);
