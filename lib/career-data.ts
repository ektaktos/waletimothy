/**
 * Career content, sourced from the resume (public/resume.pdf) but written
 * out in fuller, explanatory prose rather than resume-bullet shorthand.
 * Kept as data so app/career/page.tsx stays a plain render.
 */

export const summary = `I'm a Senior Software Engineer and Engineering Lead with 8+ years of
experience building and scaling distributed systems. For the past few years
I've led platform-wide engineering at PiggyVest, one of Africa's largest
fintech platforms — in practice, that means I'm responsible for the
infrastructure behind 20M+ user wallets and for the technical direction of
three cross-functional engineering teams. My day-to-day work sits at the
intersection of system design, payment orchestration, and backend
architecture, mostly in Node.js, TypeScript, and Golang, running on GCP and
AWS. What I care about most is building systems that stay reliable as they
scale — infrastructure that keeps working quietly under load instead of
becoming the story. I'm currently open to opportunities in Canada's tech
sector.`;

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    label: "Languages & Frameworks",
    items: ["JavaScript (Node.js, React, Vue.js)", "TypeScript", "Golang", "HTML/CSS"],
  },
  {
    label: "Data",
    items: ["SQL (Postgres, MySQL)", "MongoDB"],
  },
  {
    label: "Cloud & Infrastructure",
    items: ["GCP", "AWS", "Huawei Cloud"],
  },
  {
    label: "Practice",
    items: ["System Design", "API Design", "Technical Leadership"],
  },
];

export interface Role {
  company: string;
  location: string;
  title: string;
  dates: string;
  summary: string;
  highlights: string[];
  awards?: string[];
}

export const experience: Role[] = [
  {
    company: "PiggyTech Global Limited (Fintech)",
    location: "Lagos, Nigeria",
    title: "Engineering Lead, PiggyVest Business (Full Stack Developer)",
    dates: "March 2022 – Present",
    summary:
      "PiggyTech is the company behind PiggyVest, PocketApp, and PiggyVest Business — three products I'm responsible for at the architecture level. The role spans hands-on system design and people leadership: I set technical direction for the platform and manage three engineering teams.",
    highlights: [
      "Own platform-scale architecture across PiggyVest, PocketApp, and PiggyVest Business, keeping availability, performance, and reliability intact as transaction volume and user numbers grow quickly.",
      "Architected and scaled the distributed wallet platform that now supports 20M+ wallets — the system behind P2P transfers, bank transactions, interest accrual, and automated payouts.",
      "Designed a payment orchestration and routing layer that picks a payment provider dynamically, based on real-time success rates, available fund balances, and name-inquiry accuracy — this meaningfully cut failed transactions by routing around underperforming providers automatically.",
      "Built and mentored three engineering teams — technical leadership, performance management, and setting the engineering and system-design standards those teams build against.",
      "Own end-to-end system design for services that need to be secure, low-latency, and high-throughput at once, while keeping the technical roadmap aligned with what the business actually needs.",
    ],
    awards: ["PiggyTech Engineering Excellence Award (2023)", "Engineering Excellence Award – Pocket (2024)"],
  },
  {
    company: "Etap Inc. (InsureTech)",
    location: "Lagos, Nigeria",
    title: "Full Stack Developer",
    dates: "Aug 2021 – Feb 2022",
    summary:
      "Etap is an insurtech company. I joined as a full stack developer building their public-facing presence and the APIs behind their mobile app.",
    highlights: [
      "Designed and launched etapinsure.com, the company's public-facing website.",
      "Built and maintained the RESTful APIs powering the mobile application and its third-party integrations, working closely with cross-functional teams.",
      "Led integration work with several third-party platforms, extending what the product could do and smoothing out operational workflows.",
    ],
  },
  {
    company: "Safelybuy Operating Company Limited (E-commerce)",
    location: "Lagos, Nigeria",
    title: "Full Stack Developer",
    dates: "July 2018 – July 2021",
    summary:
      "Safelybuy is an e-commerce company. Over three years here I worked across their web platform, mobile apps, and production infrastructure.",
    highlights: [
      "Contributed to the company's e-commerce website and its cross-platform mobile applications.",
      "Designed and maintained the APIs powering core mobile commerce features.",
      "Architected system workflows for real estate and property management modules, and managed the production website and VPS server after launch.",
    ],
  },
  {
    company: "7UP Bottling Company",
    location: "Ilorin, Nigeria",
    title: "Intern, Computer Department",
    dates: "July 2016 – Sept 2016",
    summary: "An early internship in the company's computer department.",
    highlights: [
      "Maintained sales records in Microsoft SQL Server, ran hardware diagnostics, and managed internal email communications.",
    ],
  },
  {
    company: "Lautech ICT Department",
    location: "Oyo, Nigeria",
    title: "Programmer Intern",
    dates: "July 2015 – Sept 2015",
    summary: "A university-affiliated internship where I built two small systems end to end.",
    highlights: [
      "Built a biometric attendance system in Java using fingerprint sensors, plus a companion web app with user registration, an admin dashboard, and CSV bulk import.",
    ],
  },
];

export interface ProjectEntry {
  name: string;
  location?: string;
  role: string;
  description: string;
  link?: string;
}

export const projects: ProjectEntry[] = [
  {
    name: "Pathfinder AI",
    location: "CA, USA",
    role: "Full Stack Developer",
    description:
      "A full-stack agentic AI platform that helps students explore academic majors, universities, and career paths. I integrated LLM-based multi-step agent reasoning into the product, working with the product and AI teams to turn fairly complex guidance logic into something that felt simple for the end user.",
  },
  {
    name: "Smart Stewards",
    location: "Lagos, Nigeria",
    role: "Full Stack Developer",
    description:
      "A fintech web application managing 2,000+ investment wallets, with card and virtual-account funding, investment management, fund withdrawal, and interest locking.",
  },
  {
    name: "Amaze",
    location: "Lagos, Nigeria",
    role: "Front-End Developer",
    link: "https://amaze.africa",
    description:
      "A video shoutout platform serving 1,000+ fans. I built the Celebrity and Admin dashboards with role-based access control, along with booking, payment processing, and video download functionality.",
  },
  {
    name: "Faaji",
    location: "Lagos, Nigeria",
    role: "Full Stack Developer",
    link: "https://faaji.app",
    description:
      "An event-discovery platform connecting 3,000+ users to curated events with ticket purchasing. I also built the event-host management module used to track sales and fund withdrawals.",
  },
  {
    name: "Coachli",
    location: "Lagos, Nigeria",
    role: "Full Stack Developer",
    description:
      "Delivered a full product rebrand — a redesigned customer dashboard and homepage — plus a transaction charge-routing feature spanning both the frontend and backend.",
  },
];

export const education = {
  school: "Adeleke University",
  location: "Osun, Nigeria",
  degree: "B.Sc. Computer Science — First Class Honours",
  dates: "Sept 2013 – July 2017",
  leadership: [
    {
      title: "President, Nigeria Association of Computer Science Students — Adeleke University Chapter",
      dates: "Aug 2015 – Aug 2016",
      description:
        "Coordinated programs and workshops supporting members' professional growth, and liaised with university administration.",
    },
    {
      title: "Class Coordinator, Computer Science Department",
      dates: "Sept 2013 – July 2017",
      description: "Bridged communication between faculty and students, and facilitated peer collaboration and academic organisation.",
    },
  ],
};
