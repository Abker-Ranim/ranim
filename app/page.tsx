"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
   Github, Linkedin,
  Mail,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { ProjectModal } from "@/components/ui/project-modal";
// Technology icons data
const techIcons = {
  react: "/12.png?height=100&width=100&text=React",
  angular: "/13.png?height=100&width=100&text=Angular",
  vue: "/placeholder.svg?height=100&width=100&text=Vue",
  nextjs: "/placeholder.svg?height=100&width=100&text=Next.js",
  nodejs: "/14.png?height=100&width=100&text=Node.js",
  express: "/20.png?height=100&width=100&text=Express",
  python: "/17.png?height=100&width=100&text=Python",
  django: "/placeholder.svg?height=100&width=100&text=Django",
  android : "/19.png?height=100&width=100&text=React+Native",
  flutter: "/placeholder.svg?height=100&width=100&text=Flutter",
  swift: "/placeholder.svg?height=100&width=100&text=Swift",
  kotlin: "/placeholder.svg?height=100&width=100&text=Kotlin",
  mongodb: "/15.png?height=100&width=100&text=MongoDB",
  postgres: "/placeholder.svg?height=100&width=100&text=PostgreSQL",
  mysql: "/16.png?height=100&width=100&text=MySQL",
  firebase: "/placeholder.svg?height=100&width=100&text=Firebase",
  docker: "/18.png?height=100&width=100&text=Docker",
  kubernetes: "/placeholder.svg?height=100&width=100&text=Kubernetes",
  aws: "/placeholder.svg?height=100&width=100&text=AWS",
  git: "/placeholder.svg?height=100&width=100&text=Git",
  vscode: "/22.png?height=100&width=100&text=VS+Code",
  figma: "/download.png?height=100&width=100&text=Figma",
  tailwind: "/placeholder.svg?height=100&width=100&text=Tailwind",
  typescript: "/placeholder.svg?height=100&width=100&text=TypeScript",
};
// Project data
const projects = [
  {
    id: 1,
    title: "NEXUM",
    description:
      " A dynamic social networking platform built with passion and purpose! 🚀.",
    longDescription:
      " This system aims to provide a seamless experience where you can easily share posts and moments, like, comment, and engage with others, personalize your profile to reflect your unique personality, build global connections, and chat in real-time with friends and new people around the world.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    images: [
      "/1.png?height=600&width=800&text=E-Commerce+Screenshot+1",
      "/2.png?height=600&width=800&text=E-Commerce+Screenshot+2",
      "/3.png?height=600&width=800&text=E-Commerce+Screenshot+3",
    ],
    demoUrl: "demo.mp4",
    githubUrl: "https://github.com/Abker-Ranim/social-media-app",
  },
  {
    id: 2,
    title: "EventiCar",
    description: "School Event Management Web Application.",
    longDescription:
      "A centralized web platform facilitating event planning, real-time task management, and rapid registration of student volunteers, with a rewards system and an interactive dashboard for overall monitoring.",
    technologies: ["Angular", "Spring Boot", "MySQL", "Java"],
    images: [
      "/4.png?height=600&width=800&text=Task+App+Screenshot+1",
      "/5.png?height=600&width=800&text=Task+App+Screenshot+2",
      "/6.png?height=600&width=800&text=Task+App+Screenshot+3",
    ],
    demoUrl: "202505061422.mp4",
    githubUrl: "https://github.com/Abker-Ranim/projetSpringBoot",
  },
  {
    id: 3,
    title: "Parascolaire",
    description: "Club Management Web       Application.",
    longDescription:
      "This weather dashboard provides users with accurate, real-time weather information and forecasts for any location worldwide. Features include hourly and 7-day forecasts, severe weather alerts, radar maps, and customizable widgets. The application uses geolocation to automatically detect the user's location for instant weather updates.",
    technologies: ["Angular", "TypeScript", "bootstrap"],
    images: ["/10.jpg?height=600&width=800&text=Weather+App+Screenshot+1"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/Abker-Ranim/parascolaire",
  },
  {
    id: 4,
    title: "ShowReserv",
    description:
      "A mobile-Application.                                                                                                                                                                                                              ",

    longDescription:
      "Development of a mobile application (Android) allowing users to view and book shows.",
    technologies: ["Java", "XML", "PHP", "MySQL", "Android Studio"],
    images: [
      "/9.png?height=600&width=800&text=Fitness+App+Screenshot+3",
      "/7.png?height=600&width=800&text=Fitness+App+Screenshot+1",
      "/8.png?height=600&width=800&text=Fitness+App+Screenshot+2",
    ],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/username/project",
  },
];

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const scrollCategories = (direction: "left" | "right") => {
    const container = document.getElementById("tech-categories");
    if (container) {
      const scrollAmount = 600;
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const scrollToPosition = (position: number) => {
    const container = document.getElementById("tech-categories");
    if (container) {
      const scrollAmount = position * container.clientWidth;
      container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 transition-colors duration-500">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-[10px] opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-500 dark:bg-purple-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                filter: "blur(70px)",
                animation: `float ${
                  Math.random() * 10 + 10
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-purple-100 dark:border-purple-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-800 dark:text-purple-400">
            Portfolio
          </h1>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#technologies"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Technologies
            </a>
            <a
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Contact
            </a>
            <a
              href="/resume.pdf"
              download
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors font-medium flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <line x1="10" y1="9" x2="8" y2="9" />
              </svg>
              CV
            </a>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 relative z-0">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 min-h-[calc(100vh-200px)] py-16">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white animate-fade-in">
              <span className="text-purple-600 dark:text-purple-400">
                Computer Engineering
              </span>{" "}
              Student
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in-delay">
              Passionate about building innovative solutions and exploring new
              technologies.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
              <Button
                asChild
                className="bg-purple-600 hover:bg-purple-700 text-white transform transition-transform duration-300 hover:scale-105"
              >
                <a href="#contact">Contact Me</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950 transform transition-transform duration-300 hover:scale-105"
              >
                <a href="#projects">View Projects</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950 transform transition-transform duration-300 hover:scale-105 flex items-center gap-2"
              >
                <a href="/resume.pdf" download>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-file-text"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                  Download CV
                </a>
              </Button>
            </div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-600 dark:border-purple-400 shadow-xl transform hover:scale-105 transition-transform duration-500 animate-float">
            <Image
              src="/ranim.jpg?height=400&width=400"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 to-white/0 dark:from-purple-900/20 dark:to-gray-900/0 animated-gradient"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              About{" "}
              <span className="text-purple-600 dark:text-purple-400">Me</span>
            </h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I am a Computer Engineering student with a passion for
                developing innovative solutions to complex problems. My academic
                journey has equipped me with a strong foundation in both
                hardware and software aspects of computing.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I specialize in full-stack development, with expertise in modern
                frameworks and technologies. My goal is to create efficient,
                scalable, and user-friendly applications that make a positive
                impact.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                When I'm not coding, I enjoy exploring new technologies,
                contributing to open-source projects, and participating in
                hackathons to challenge myself and expand my skill set.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white transform transition-transform duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <a href="/resume.pdf" download>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download My Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-purple-50/20 dark:from-gray-900/0 dark:to-purple-900/20 animated-gradient"></div>
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white relative z-10">
            My{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Projects
            </span>
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto relative z-10">
            Explore my latest work and personal projects that showcase my skills
            and expertise. Click on any project to see more details.
          </p>

          <div className="container mx-auto px-4 relative z-10">
            <div className="relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex gap-2 z-10">
                <button
                  onClick={() => {
                    const container =
                      document.getElementById("projects-container");
                    if (container) {
                      container.scrollBy({ left: -350, behavior: "smooth" });
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm"
                  aria-label="Scroll left"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    const container =
                      document.getElementById("projects-container");
                    if (container) {
                      container.scrollBy({ left: 350, behavior: "smooth" });
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm"
                  aria-label="Scroll right"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div
                id="projects-container"
                className="flex gap-6 pb-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="min-w-[300px] md:min-w-[350px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-purple-100 dark:border-purple-900 transition-all duration-500 hover:scale-105 hover:shadow-2xl section-transition snap-start cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="h-48 bg-purple-200 dark:bg-purple-900 relative overflow-hidden">
                      <Image
                        src={project.images[0] || "/placeholder.svg"}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <span className="text-white flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" /> View Details
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        View Project Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-1 mt-4">
                {[0, 1].map((dot) => (
                  <button
                    key={dot}
                    className={`w-8 h-1 rounded-full ${
                      dot === 0 ? "bg-red-600" : "bg-gray-600"
                    }`}
                    onClick={() => {
                      const container =
                        document.getElementById("projects-container");
                      if (container) {
                        const scrollAmount = dot * container.clientWidth;
                        container.scrollTo({
                          left: scrollAmount,
                          behavior: "smooth",
                        });
                      }
                    }}
                    aria-label={`Go to page ${dot + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
      {/* Technologies Section */}
        <section id="technologies" className="py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Explore my <span className="text-purple-600 dark:text-purple-400">technologies</span>
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Whether you're looking for frontend development, backend solutions, or full-stack expertise, I've got the
              skills to bring your project to life.
            </p>

            <div className="relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex gap-2 z-10">
                <button
                  onClick={() => scrollCategories("left")}
                  className="w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollCategories("right")}
                  className="w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div
                className="flex gap-6 pb-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                id="tech-categories"
              >
                {[
                  {
                    name: "Frontend",
                    skills: [
                      { name: "React", icon: techIcons.react },
                      { name: "Angular", icon: techIcons.angular },
                      { name: "Vue.js", icon: techIcons.vue },
                      { name: "Next.js", icon: techIcons.nextjs },
                    ],
                  },
                  {
                    name: "Backend",
                    skills: [
                      { name: "Node.js", icon: techIcons.nodejs },
                      { name: "springBoot", icon: techIcons.express },
                      { name: "PHP", icon: techIcons.python },
                      { name: "Django", icon: techIcons.django },
                    ],
                  },
                  {
                    name: "Mobile",
                    skills: [
                      { name: "android studio", icon: techIcons.android  },
                      { name: "Flutter", icon: techIcons.flutter },
                      { name: "Swift", icon: techIcons.swift },
                      { name: "Kotlin", icon: techIcons.kotlin },
                    ],
                  },
                  {
                    name: "Database",
                    skills: [
                      { name: "MongoDB", icon: techIcons.mongodb },
                      { name: "PostgreSQL", icon: techIcons.postgres },
                      { name: "MySQL", icon: techIcons.mysql },
                      { name: "Firebase", icon: techIcons.firebase },
                    ],
                  },
                  {
                    name: "DevOps",
                    skills: [
                      { name: "Docker", icon: techIcons.docker },
                      { name: "Kubernetes", icon: techIcons.kubernetes },
                      { name: "AWS", icon: techIcons.aws },
                      { name: "Git", icon: techIcons.git },
                    ],
                  },
                  {
                    name: "Tools",
                    skills: [
                      { name: "Figma", icon: techIcons.figma },
                      { name: "VS Code", icon: techIcons.vscode },
                      { name: "Tailwind", icon: techIcons.tailwind },
                      { name: "TypeScript", icon: techIcons.typescript },
                    ],
                  },
                ].map((category, index) => (
                  <div
                    key={index}
                    className="min-w-[280px] bg-gray-900/90 rounded-lg overflow-hidden shadow-xl border border-gray-800 snap-start hover:scale-105 transition-transform duration-300"
                  >
                    <div className="h-48 grid grid-cols-2 grid-rows-2 gap-0.5 bg-gray-800 overflow-hidden">
                      {category.skills.map((skill, i) => (
                        <div key={i} className="relative overflow-hidden bg-gray-700">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-800/40">
                            <div className="relative w-full h-full">
                              <Image
                                src={skill.icon || "/placeholder.svg"}
                                alt={skill.name}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white text-xl font-bold flex items-center justify-between">
                        {category.name}
                        <ArrowRight className="w-5 h-5" />
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-1 mt-4">
                {[0, 1].map((dot) => (
                  <button
                    key={dot}
                    className={`w-8 h-1 rounded-full ${dot === 0 ? "bg-red-600" : "bg-gray-600"}`}
                    onClick={() => scrollToPosition(dot)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 to-white/0 dark:from-purple-900/20 dark:to-gray-900/0 animated-gradient"></div>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white relative z-10">
            Get In{" "}
            <span className="text-purple-600 dark:text-purple-400">Touch</span>
          </h2>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Send Me a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105">
                    Send Message
                  </Button>
                </form>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Connect With Me
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 transition-transform duration-300 hover:translate-x-2">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        ranim.abker@enicar.ucar.tn
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transition-transform duration-300 hover:translate-x-2">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Github className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        GitHub
                      </h4>
                      <Link
                        href="https://github.com/"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        github.com/Abker-Ranim
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 transition-transform duration-300 hover:translate-x-2">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        LinkedIn
                      </h4>
                      <Link
                        href="https://linkedin.com/"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        linkedin.com/in/ranim-abker
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-purple-100 dark:border-purple-900 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-20px) rotate(3deg);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards 0.3s;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards 0.6s;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-in {
          animation: animateIn 0.3s ease forwards;
        }

        @keyframes animateIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .zoom-in-95 {
          transform: scale(0.95);
          animation: zoomIn 0.3s ease forwards;
        }

        @keyframes zoomIn {
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
