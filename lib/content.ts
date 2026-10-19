// Single source of truth for everything the portfolio says.
// Every fact here comes from Ranim's CV or her existing portfolio — nothing invented.

export const profile = {
  first: "Ranim",
  last: "Abker",
  fullName: "Ranim Abker",
  role: "Full-Stack Software Engineer",
  school: "ENICarthage",
  email: "ranim.abker@enicar.ucar.tn",
  github: "https://github.com/Abker-Ranim",
  githubHandle: "Abker-Ranim",
  linkedin: "https://www.linkedin.com/in/abker-ranim-1023002aa/",
  linkedinHandle: "abker-ranim",
  cv: "/cv.pdf",
  location: "Tunis, Tunisia",
  tagline: "I build software you can trust: secure by design, observable end to end.",
  intro:
    "I love taking a process that is slow, fragile or done on paper and turning it into software people rely on every day. Curious by nature, I keep one foot in AI — and both in building things that last.",
  manifesto:
    "Innovation is my comfort zone. I love pushing the limits of code, turning complexity into clarity and building solutions that matter.",
  languages: [
    ["Arabic", "native"],
    ["French", "B2"],
    ["English", "B2"],
  ] as const,
  certifications: [
    { name: "CCNA", detail: "Introduction to Networks — Cisco" },
    { name: "Docker", detail: "Containerization, image deployment & orchestration" },
  ],
};

export const logos = {
  enicarthage: { src: "/logos/enicarthage.webp", alt: "ENICarthage — École Nationale d'Ingénieurs de Carthage", w: 273, h: 108 },
  ipein: { src: "/logos/ipein.webp", alt: "IPEIN — Preparatory Institute for Engineering Studies of Nabeul", w: 284, h: 176 },
  intechgeeks: { src: "/logos/intechgeeks-wordmark-light.svg", alt: "IntechGeeks", w: 313, h: 113 },
  intechgeeksMark: { src: "/logos/intechgeeks-mark.svg", alt: "IntechGeeks mascot", w: 422, h: 422 },
};

export type Station = {
  id: string;
  when: string;
  from: number;
  to: number;
  place: string;
  title: string;
  detail: string;
  lesson: { key: string; rest: string };
  logo?: keyof typeof logos;
  honors?: string;
};

export const origins: Station[] = [
  {
    id: "bac",
    when: "2020",
    from: 2020,
    to: 2020,
    place: "Pilot High School of Zaghouan",
    title: "Baccalaureate in Mathematics",
    detail: "Zaghouan, Tunisia",
    lesson: { key: "Where the rigour started.", rest: "Mathematics taught me that every hard problem has a structure, if you look long enough." },
  },
  {
    id: "ipein",
    when: "2020 — 2023",
    from: 2020,
    to: 2023,
    place: "IPEIN",
    title: "Preparatory Cycle for Engineering Studies",
    detail: "Nabeul, Tunisia",
    lesson: { key: "Intensive maths & physics.", rest: "Learning to model a problem, break it down, and not let go until it gives in." },
    logo: "ipein",
  },
  {
    id: "enicarthage",
    when: "2023 — 2026",
    from: 2023,
    to: 2026,
    place: "National Engineering School of Carthage (ENICarthage)",
    title: "Engineering Degree in Computer Engineering",
    detail: "Charguia II, Tunis",
    lesson: { key: "From theory to systems.", rest: "Software architecture, networks, databases, AI — and the clubs where I learned to build with others." },
    logo: "enicarthage",
    honors: "with Very Good Honors",
  },
];

export const associations = [
  { name: "CLUB Mécatronique ENICarthage", role: "Member", when: "2023 — 2024" },
  { name: "CPC ENICarthage", role: "Member", when: "2023 — 2024" },
  { name: "MELKART Junior Entreprise", role: "Member", when: "2024" },
];

export type Media =
  | { kind: "video"; src: string; poster: string; label: string; frame?: "browser" | "phone" }
  | { kind: "image"; src: string; label: string; w: number; h: number; frame?: "browser" | "phone"; note?: string };

export type Project = {
  id: string;
  name: string;
  kind: string;
  when: string;
  pitch: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  fullDemo?: { src: string; label: string; duration: string };
  media: Media[];
};

// ── IntechGeeks — professional experience ────────────────────────────────

export const intechgeeks = {
  company: "IntechGeeks",
  city: "Tunis",
  site: "https://www.intechgeeks.com",
};

export const cbs: Project & { role: string } = {
  id: "cbs",
  name: "CBS Orchestration Middleware",
  role: "Summer Internship",
  kind: "Internship · IntechGeeks",
  when: "Jul — Aug 2025",
  pitch: "A lightweight middleware that talks to core banking services — and lets you see every request it makes.",
  problem:
    "Core banking services (CBS) are critical and opaque. Front-end applications need a clean, documented way to call them, and the team needs to know what happens to each request.",
  solution:
    "I designed a Spring Boot middleware in front of a Docker-based CBS simulator: documented REST APIs, orchestration of CBS calls, request supervision, OpenTelemetry tracing and a React supervision dashboard.",
  highlights: [
    "REST APIs documented with Swagger / OpenAPI",
    "Orchestration of simulated CBS calls & request supervision",
    "Distributed tracing with OpenTelemetry, inspected in Zipkin",
    "React dashboard: success rate, response time, status & endpoint distribution",
  ],
  stack: ["Spring Boot", "React", "Docker", "OpenTelemetry", "Swagger", "MongoDB"],
  links: [{ label: "GitHub", href: "https://github.com/Abker-Ranim/Dashboard-cbs" }],
  fullDemo: { src: "/d%C3%A9mo.mp4", label: "CBS middleware — full walkthrough", duration: "4 min" },
  media: [
    { kind: "video", src: "/media/cbs-loop.mp4", poster: "/media/cbs-loop-poster.webp", label: "Supervision dashboard in action", frame: "browser" },
    { kind: "image", src: "/media/cbs-swagger.webp", label: "Middleware API documented with Swagger", w: 1400, h: 650, frame: "browser" },
    { kind: "image", src: "/media/cbs-traces.webp", label: "Request traces in Zipkin", w: 1400, h: 650, frame: "browser" },
    { kind: "image", src: "/media/cbs-charts.webp", label: "HTTP status & API usage distribution", w: 1400, h: 650, frame: "browser" },
  ],
};

export const crediwise = {
  id: "crediwise",
  name: "CrediWise",
  role: "Final-year engineering project",
  kind: "Intelligent account officer · IntechGeeks",
  when: "Feb — Aug 2026",
  pitch: "A secure microservices platform that digitalises the entire credit lifecycle — from the first client contact to the release of funds.",
  problem:
    "A credit file passes through many hands — front office, analysts, risk, committee, branch manager. Financial institutions need that journey to be fast, secure and fully traceable, and to keep up as the number of files grows.",
  solution:
    "I designed and built CrediWise end to end: ten independent services (nine Quarkus microservices and a Python OCR service), each with its own PostgreSQL database, a React + TypeScript front-end, Keycloak for identity, an AI recommendation engine at every step and end-to-end observability.",
  stages: [
    {
      name: "Request",
      text: "The client record is created and a credit request is drafted: amount, duration, product, guarantees. An initial score is computed and, on submission, the request is routed automatically to the right circuit.",
      services: ["client", "demande"],
    },
    {
      name: "Analysis",
      text: "A seven-step analysis file — client visit, loan purpose, client, commercial and financial risk, guarantees, final proposal. Scoring combines deterministic rules (DRG) and a logistic model (DSS); financial statements are read by the OCR service.",
      services: ["analyse", "ocr", "ia"],
    },
    {
      name: "Risk review",
      text: "A pre-committee checklist locks each verified section. When the amount requires it, the credit risk analysis (CRA) adds a checklist, a Q&A thread with the branch decision-maker and the analyst's reasoned opinion.",
      services: ["checklist", "risque", "ia"],
    },
    {
      name: "Committee",
      text: "Derogation, preparation, decision. The committee approves or rejects with conditions, supported by a PDF report consolidating every AI recommendation — and can trigger a management field visit.",
      services: ["comite", "ia"],
    },
    {
      name: "Disbursement",
      text: "The branch manager records the disbursement — amount, date, reference — and closes the file, ending its lifecycle with a complete trace of who did what.",
      services: ["decaissement"],
    },
  ],
  services: [
    { id: "gestionnaire", name: "Gestionnaire" },
    { id: "client", name: "Client" },
    { id: "demande", name: "Nouvelle demande" },
    { id: "analyse", name: "Analyse" },
    { id: "ocr", name: "OCR", sub: "FastAPI" },
    { id: "checklist", name: "Checklist" },
    { id: "risque", name: "Risque (CRA)" },
    { id: "comite", name: "Comité" },
    { id: "decaissement", name: "Décaissement" },
    { id: "ia", name: "Recommandation IA", sub: "Llama 3.1" },
  ],
  facts: [
    { value: 10, label: "independent microservices, one database each" },
    { value: 9, label: "user roles enforced with Keycloak RBAC" },
    { value: 84, label: "unit tests passing across the services" },
  ],
  pillars: [
    {
      title: "Security by design",
      text: "Keycloak 26 with OIDC + PKCE for the SPA and client credentials between services, 9 RBAC roles, TOTP two-factor authentication, lockout after 3 failed attempts and 5-minute access tokens. Nginx is the single gateway: TLS, token validation, rate limiting, CORS.",
      media: "/media/crediwise/managers.webp",
      label: "Managers & roles administration",
    },
    {
      title: "Scoring + OCR",
      text: "Eligibility is decided by two layers: a deterministic rule gate (DRG) and a logistic scoring model (DSS) producing a 0–1000 score. At step 5, a Python / FastAPI service extracts balance sheet and income statement figures to pre-fill the financial risk form.",
      media: "/media/crediwise/scoring.webp",
      label: "Credit scoring — DRG & DSS",
    },
    {
      title: "AI that advises, never decides",
      text: "Llama 3.1 8B, run locally with Ollama and forced tool-calling, returns a structured opinion — decision, confidence, reasoning, risks, conditions — at each transition. Personal data is stripped before every call; each version is stored for audit.",
      media: "/media/crediwise/ai-approve.webp",
      label: "AI recommendation — approval, 80 % confidence",
    },
    {
      title: "Observable end to end",
      text: "Every Quarkus service is instrumented with OpenTelemetry and exports traces, metrics and logs over OTLP to SigNoz, with logs correlated to traces by trace ID and business dashboards built on audit events.",
      media: "/media/crediwise/signoz-dashboard.webp",
      label: "SigNoz — Gestionnaire analytics dashboard",
    },
  ],
  highlights: [
    "Database-per-service, gRPC between services, REST for workflow orchestration",
    "Containerised with Docker; dev and runtime Docker Compose setups",
    "Azure DevOps CI: Maven & npm builds, JUnit gate, versioned Docker images",
    "Built on open technologies, designed to scale with the volume of files",
  ],
  stack: ["Quarkus", "React", "TypeScript", "Keycloak", "PostgreSQL", "Python", "FastAPI", "Ollama", "OpenTelemetry", "SigNoz", "Docker", "Nginx"],
};

// ── Builds — academic & personal projects ────────────────────────────────

export const builds: Project[] = [
  {
    id: "nexum",
    name: "NEXUM",
    kind: "Academic project · Social platform",
    when: "Jul — Sep 2024",
    pitch: "A social network where posts, reactions and conversations happen in real time.",
    problem:
      "A community platform lives or dies by how alive it feels: people expect to share, react and talk without ever refreshing the page.",
    solution:
      "A full-stack MERN platform: share posts and moments, like and comment, personalise your profile, follow people — and chat in real time with presence indicators.",
    highlights: ["Real-time chat with WebSockets (Socket.io)", "Online presence & live updates", "Profiles, follows, posts, likes and comments", "TypeScript across the stack"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "TypeScript"],
    links: [{ label: "GitHub", href: "https://github.com/Abker-Ranim/social-media-app" }],
    fullDemo: { src: "/demo.mp4", label: "NEXUM — full demo", duration: "4 min" },
    media: [
      { kind: "video", src: "/media/nexum-loop.mp4", poster: "/media/nexum-loop-poster.webp", label: "Two users chatting in real time", frame: "browser" },
      { kind: "image", src: "/media/nexum-feed.webp", label: "Home feed", w: 1600, h: 766, frame: "browser" },
    ],
  },
  {
    id: "eventicar",
    name: "EventiCar",
    kind: "Academic project · Event management",
    when: "Feb — Apr 2025",
    pitch: "One place to plan school events, manage volunteers and reward the people who make them happen.",
    problem:
      "Organising a school event means coordinating volunteers, tasks and applications at the same time — and knowing who actually did the work.",
    solution:
      "A centralised web platform: event planning, real-time task management, fast student volunteer registration with an approval workflow, a rewards leaderboard and an interactive dashboard.",
    highlights: ["Secure REST APIs with Spring Security", "Application approval workflow & task evaluation", "Rewards leaderboard and tracking dashboard", "AOP logging and unit tests with Mockito"],
    stack: ["Java", "Spring Boot", "Spring Security", "Angular", "MySQL"],
    links: [{ label: "GitHub", href: "https://github.com/Abker-Ranim/projetSpringBoot" }],
    fullDemo: { src: "/202505061422.mp4", label: "EventiCar — full walkthrough", duration: "4 min" },
    media: [
      { kind: "video", src: "/media/eventicar-loop.mp4", poster: "/media/eventicar-loop-poster.webp", label: "Creating an event", frame: "browser" },
      { kind: "image", src: "/media/eventicar-events.webp", label: "Event management", w: 1259, h: 608, frame: "browser" },
      { kind: "image", src: "/media/eventicar-applications.webp", label: "Volunteer applications", w: 1263, h: 583, frame: "browser" },
    ],
  },
  {
    id: "showreserv",
    name: "ShowReserv",
    kind: "Academic project · Android app",
    when: "Mobile",
    pitch: "Browse shows, pick your seats, get your ticket — in a few taps.",
    problem: "Booking a show should be as simple as finding it: see what's on, where it is, and reserve a seat without friction.",
    solution:
      "A native Android application: show listings and search, show details with venue location, seat selection by ticket category, booking and ticket confirmation.",
    highlights: ["Seat map with Gold / Silver / Normal categories", "Show search, details & venue on the map", "Secure sign-in and booking confirmation", "PHP / MySQL backend"],
    stack: ["Java", "Android", "PHP", "MySQL"],
    links: [],
    fullDemo: { src: "/android.mp4", label: "ShowReserv — full demo", duration: "1 min" },
    media: [{ kind: "video", src: "/media/showreserv-loop.mp4", poster: "/media/showreserv-loop-poster.webp", label: "Booking a ticket", frame: "phone" }],
  },
  {
    id: "mario",
    name: "Super Mario — Design Patterns",
    kind: "Academic project · Software architecture",
    when: "Java 17 · Swing",
    pitch: "A fully playable Super Mario clone whose real purpose is its architecture: eight design patterns, all of them doing actual work.",
    problem:
      "Design patterns are easy to recite and hard to apply well. A game is the perfect stress test: states change every frame, objects multiply, power-ups come and go — and a bad structure collapses fast.",
    solution:
      "A platformer written in pure Java 17 (Swing/AWT, no external dependency) with two complete levels, persistent scores, sounds, a timed speed boost, victory and game-over screens — built so that adding a level takes minutes.",
    highlights: [
      "8 design patterns, each solving a concrete problem in the game",
      "2 levels (Forest & Desert), each built by its own Abstract Factory",
      "Timed Speed Boost power-up as a Decorator (×2 speed for 7 s)",
      "Persistent scoreboard, sounds, logging — dockerised build",
    ],
    stack: ["Java", "Swing", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/Abker-Ranim/SuperMarioDesignPatterns" }],
    fullDemo: { src: "/supermario.mp4", label: "Super Mario — code walkthrough & demo", duration: "4 min" },
    media: [
      { kind: "video", src: "/media/mario-loop.mp4", poster: "/media/mario-loop-poster.webp", label: "Level 1 → victory → level 2" },
      { kind: "image", src: "/media/mario-menu.webp", label: "Main menu", w: 960, h: 706 },
      { kind: "image", src: "/media/mario-victory.webp", label: "Victory screen", w: 960, h: 706 },
      { kind: "image", src: "/media/mario-desert.webp", label: "Level 2 — Desert", w: 960, h: 706 },
    ],
  },
  {
    id: "emotion",
    name: "Multimodal Emotion Recognition",
    kind: "AI project · Deep learning",
    when: "Audio & video",
    pitch: "Reading emotions from a face and a voice at the same time.",
    problem: "Facial expression alone is ambiguous; voice alone is too. Emotion recognition gets far more reliable when both signals are combined.",
    solution:
      "A deep-learning system that fuses a 3D CNN (R3D-18) on video frames with a 2D CNN on audio MFCCs, trained and evaluated with PyTorch, and wrapped in a real-time PyQt5 interface.",
    highlights: [
      "Multimodal fusion: R3D-18 for video, 2D CNN on MFCC for audio",
      "Preprocessing pipeline with OpenCV & Librosa",
      "K-fold validation, class balancing, early stopping",
      "Real-time PyQt5 GUI with confidence scores",
    ],
    stack: ["Python", "PyTorch", "OpenCV", "Librosa", "scikit-learn", "NumPy", "PyQt5"],
    links: [],
    media: [{ kind: "image", src: "/media/emotion-illustration.webp", label: "Concept illustration", w: 1280, h: 853, note: "Illustration — demo capture to come" }],
  },
];

// The eight patterns of the Super Mario project, straight from its README.
export const marioPatterns = [
  { name: "State", use: "Player states (idle, running, jumping) and game states (playing, victory, game over)", classes: ["PlayerState", "IdleState", "JumpingState", "GameState"] },
  { name: "Decorator", use: "Timed power-ups: Speed Boost doubles speed, adds a visual effect, then removes itself", classes: ["PlayerComponent", "SpeedBoostDecorator"] },
  { name: "Composite", use: "Platforms, enemies, items, coins and the flag handled as one tree", classes: ["CompositeGameObject", "LevelManager"] },
  { name: "Factory Method", use: "Centralised creation of every game object", classes: ["GameObjectFactory"] },
  { name: "Abstract Factory", use: "Each level built by its own factory — a new level in minutes", classes: ["LevelFactory", "ForestLevelFactory", "DesertLevelFactory"] },
  { name: "Observer", use: "Picking up a coin or item notifies score and HUD with zero coupling", classes: ["PlayerObserver", "ScoreAndHudObserver"] },
  { name: "Prototype", use: "Coins cloned from one prototype instead of built one by one", classes: ["Coin.clone()"] },
  { name: "Singleton", use: "Single instances for sound, logging and save data", classes: ["SoundManager", "LoggerManager"] },
];

// ── Toolbox ──────────────────────────────────────────────────────────────

export const toolbox: { layer: string; caption: string; items: string[] }[] = [
  { layer: "Interface", caption: "what people touch", items: ["React", "Angular", "TypeScript", "JavaScript", "Android", "Swing"] },
  { layer: "Services", caption: "where the logic lives", items: ["Quarkus", "Spring Boot", "gRPC", "Node.js", "Express", "FastAPI", "Socket.io"] },
  { layer: "Security", caption: "who gets in", items: ["Keycloak", "Spring Security"] },
  { layer: "Data", caption: "what we remember", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  { layer: "Intelligence", caption: "what we learn", items: ["Ollama", "PyTorch", "TensorFlow", "OpenCV", "NumPy", "scikit-learn"] },
  { layer: "Ops & observability", caption: "how we know it works", items: ["Docker", "Nginx", "Azure DevOps", "OpenTelemetry", "SigNoz", "Zipkin", "ELK Stack", "Swagger", "Postman", "Git"] },
];

export const languagesCode = ["Java", "Python", "TypeScript", "JavaScript", "C++", "C"];

// Which projects use a technology — powers the cross-highlighting in the toolbox.
export function projectsUsing(tech: string): string[] {
  const all: { name: string; stack: string[] }[] = [
    { name: "CrediWise", stack: crediwise.stack },
    { name: "CBS Middleware", stack: cbs.stack },
    ...builds.map((b) => ({ name: b.name, stack: b.stack })),
  ];
  return all.filter((p) => p.stack.includes(tech)).map((p) => p.name);
}

export const chapters = [
  { id: "origins", n: "01", label: "Origins" },
  { id: "intechgeeks", n: "02", label: "IntechGeeks" },
  { id: "builds", n: "03", label: "Builds" },
  { id: "toolbox", n: "04", label: "Toolbox" },
  { id: "contact", n: "05", label: "Contact" },
];
