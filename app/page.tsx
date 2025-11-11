"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
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
import { FlipCard } from "@/components/flip-card";
// Technology icons data
const techIcons = {
  react: "/12.png?height=100&width=100&text=React",
  angular: "/13.png?height=100&width=100&text=Angular",
  ELK: "/elk.png?height=100&width=100&text=ELK",
  nextjs: "/placeholder.svg?height=100&width=100&text=Next.js",
  nodejs: "/14.png?height=100&width=100&text=Node.js",
  express: "/20.png?height=100&width=100&text=Express",
  python: "/17.png?height=100&width=100&text=Python",
  django: "/placeholder.svg?height=100&width=100&text=Django",
  android: "/19.png?height=100&width=100&text=React+Native",
  flutter: "/33.png?height=100&width=100&text=Flutter",
  postman: "/postman.png?height=100&width=100&text=postman",
  kotlin: "/placeholder.svg?height=100&width=100&text=Kotlin",
  mongodb: "/15.png?height=100&width=100&text=MongoDB",
  SQLite: "/177.jpg?height=100&width=100&text=SQLite",
  mysql: "/16.png?height=100&width=100&text=MySQL",
  firebase: "/placeholder.svg?height=100&width=100&text=Firebase",
  docker: "/18.png?height=100&width=100&text=Docker",
  kubernetes: "/placeholder.svg?height=100&width=100&text=Kubernetes",
  aws: "/66.png?height=100&width=100&text=AWS",
  git: "/55.webp?height=100&width=100&text=Git",
  vscode: "/download.png?height=100&width=100&text=VS+Code",
  figma: "/22.png?height=100&width=100&text=Figma",
  swagger: "/swagger.png?height=100&width=100&text=swagger",
  opentelemetry: "/opentel.png?height=100&width=100&text=opentelemetry",
};

const projectsData = [
  {
    id: 5,
    title: "Dhashboard API Monitoring",
    description: "API Middleware Development for CBS Orchestration.",
    longDescription:
      "Designed and developed a lightweight middleware interfacing with core banking services (CBS). Deployed a Docker-based backend simulating CBS and exposed REST APIs with integrated Swagger documentation. Implemented orchestration of simulated CBS calls and request supervision. Integrated monitoring using OpenTelemetry and developed a supervision dashboard.",
    category: "Web & Mobile",
    technologies: ["React", "Spring Boot", "Docker", "OpenTelemetry."],
    images: ["/25.png?height=600&width=800&text=ShowReserv+Screenshot+1"],
    demoUrl: "démo.mp4",
    githubUrl: "https://github.com/Abker-Ranim/Dashboard-cbs",
  },
  {
    id: 1,
    title: "NEXUM",
    description:
      "A dynamic social networking platform built with passion and purpose!",
    longDescription:
      "This system aims to provide a seamless experience where you can easily share posts and moments, like, comment, and engage with others, personalize your profile to reflect your unique personality, build global connections, and chat in real-time with friends and new people around the world.",
    category: "Web & Mobile",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    images: [
      "/1.png?height=600&width=800&text=NEXUM+Screenshot+1",
      "/2.png?height=600&width=800&text=NEXUM+Screenshot+2",
      "/3.png?height=600&width=800&text=NEXUM+Screenshot+3",
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
    category: "Web & Mobile",
    technologies: ["Angular", "Spring Boot", "MySQL", "Java"],
    images: [
      "/4.png?height=600&width=800&text=EventiCar+Screenshot+1",
      "/5.png?height=600&width=800&text=EventiCar+Screenshot+2",
      "/6.png?height=600&width=800&text=EventiCar+Screenshot+3",
    ],
    demoUrl: "202505061422.mp4",
    githubUrl: "https://github.com/Abker-Ranim/projetSpringBoot",
  },
  {
    id: 3,
    title: "Parascolaire",
    description: "Club Management Web Application.",
    longDescription:
      "A front-end application for club management. It allows users to add new clubs, view the list of existing clubs, and create or view events associated with each club.",
    category: "Web & Mobile",
    technologies: ["Angular", "TypeScript", "Bootstrap"],
    images: ["/10.jpg?height=600&width=800&text=Parascolaire+Screenshot+1"],
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/Abker-Ranim/parascolaire",
  },
  {
    id: 4,
    title: "ShowReserv",
    description: "A mobile-Application for viewing and booking shows.",
    longDescription:
      "Development of a mobile application (Android) allowing users to view and book shows with an intuitive interface and seamless booking experience.",
    category: "Web & Mobile",
    technologies: ["Java", "XML", "PHP", "MySQL", "Android Studio"],
    images: [
      "/9.png?height=600&width=800&text=ShowReserv+Screenshot+1",
      "/7.png?height=600&width=800&text=ShowReserv+Screenshot+2",
      "/8.png?height=600&width=800&text=ShowReserv+Screenshot+3",
    ],
    demoUrl: "android.mp4",
    githubUrl: "https://github.com/username/project",
  },
  {
    id: 6,
    title: "Multimodal Emotion Recognition System",
    description: "Multimodal Emotion Recognition System (Audio & Video)",
    longDescription:
      "• Developed a deep learning–based system for emotion detection from video inputs by combining facial expression and audio signal analysis.• Built a multimodal architecture integrating a 3D CNN (R3D-18) for video feature extraction and a 2D CNN for audio MFCC processing.• Designed a preprocessing pipeline for video frame extraction and audio feature computation using OpenCV and Librosa.• Implemented model fusion, training, and evaluation with PyTorch and scikit-learn (K-Fold validation, class balancing, early stopping).• Developed an interactive PyQt5 GUI enabling real-time emotion recognition with visualization of confidence scores.",
    category: "IA",
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "Librosa",
      "scikit-learn",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "PyQt5",
    ],
    images: ["/102.png?height=700&width=900&text=ShowReserv+Screenshot+1"],
    demoUrl: "android.mp4",
    githubUrl: "https://github.com/username/project",
  },
  {
    id: 7,
    title: "Real-Time Object Detection ",

    description: "Multimodal Emotion Recognition System (Audio & Video)",
    longDescription:
      "• Developing an intelligent system for real-time object detection using the YOLO (You Only Look Once) architecture.",
    category: "In Progress",
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "YOLOv8",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "TensorFlow",
    ],
    images: ["/444.png?height=700&width=900&text=ShowReserv+Screenshot+1"],
    demoUrl: "android.mp4",
    githubUrl: "https://github.com/username/project",
  },
  {
    id: 8,
    title: "Brain Cancer Detection System ",

    description:
      "Developed a deep learning system to detect and classify brain cancer from MRI scans using advanced convolutional neural networks.",
    longDescription:
      "Developed a deep learning system to detect and classify brain cancer from MRI scans using advanced convolutional neural networks.",
    category: "In Progress",
    technologies: [
      "Python",
      "PyTorch",
      "OpenCV",
      "NiBabel",
      "Seaborn",
      "NumPy",
      "Pandas",
    ],
    images: ["/444.png?height=700&width=900&text=ShowReserv+Screenshot+1"],
    demoUrl: "android.mp4",
    githubUrl: "https://github.com/username/project",
  },
];

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [projectsScrollPosition, setProjectsScrollPosition] = useState(0);
  const [techScrollPosition, setTechScrollPosition] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const handleProjectsScroll = () => {
    const container = document.getElementById("projects-container");
    if (container) {
      const scrollPercentage =
        (container.scrollLeft /
          (container.scrollWidth - container.clientWidth)) *
        100;
      const position = Math.round(
        (scrollPercentage / 100) * (filteredProjects.length - 1)
      );
      setProjectsScrollPosition(Math.min(position, 3));
    }
  };

  const handleTechScroll = () => {
    const container = document.getElementById("tech-categories");
    if (container) {
      const scrollPercentage =
        (container.scrollLeft /
          (container.scrollWidth - container.clientWidth)) *
        100;
      const position = Math.round((scrollPercentage / 100) * 5);
      setTechScrollPosition(Math.min(position, 5));
    }
  };

  const scrollProjectsToPosition = (position: number) => {
    const container = document.getElementById("projects-container");
    if (container) {
      const cardWidth = 420 + 32; // card width + gap
      const scrollLeft = position * cardWidth;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      setProjectsScrollPosition(position);
    }
  };

  const scrollTechToPosition = (position: number) => {
    const container = document.getElementById("tech-categories");
    if (container) {
      const cardWidth = 380 + 32; // card width + gap
      const scrollLeft = position * cardWidth;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      setTechScrollPosition(position);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-950 transition-colors duration-500">
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
            Ranim Abker
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
              href="/cv.pdf"
              download="cv.pdf"
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
              I don’t just write code I build bridges between ideas and
              technology to create meaningful digital experiences.
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
                <a href="/cv.pdf" download>
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
                journey has equipped me with a strong foundation in software
                aspects of computing.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I specialize in full-stack development, with expertise in modern
                frameworks and technologies. My goal is to create efficient,
                scalable, and user-friendly applications that make a positive
                impact.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                When I'm not coding, I enjoy exploring new technologies,
                contributing to open-source projects expand my skill set.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  className="bg-purple-600 hover:bg-purple-700 text-white transform transition-transform duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <a href="/cv.pdf" download>
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

        {/* My Approach Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-purple-50/20 dark:from-gray-900/0 dark:to-purple-900/20 animated-gradient"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white relative z-10">
            My{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Approach
            </span>
          </h2>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Analysis & Planning",
                  description:
                    "I analyze requirements, define the project scope, and select the optimal tech stack — ensuring scalability, maintainability, and security from day one.",
                },
                {
                  number: "02",
                  title: "Development & Integration",
                  description:
                    "Using agile methods, I implement clean, efficient code, integrating APIs, databases, and user interfaces to create a cohesive system.",
                },
                {
                  number: "03",
                  title: "Testing & Deployment",
                  description:
                    "Before delivery, I rigorously test performance and reliability. Once deployed, I provide continuous support and updates to keep the solution running flawlessly.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="group relative h-80 rounded-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105 cursor-pointer"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 dark:from-gray-800 dark:via-purple-900/30 dark:to-gray-900"></div>

                  {/* Animated Background Glow on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
                  </div>

                  {/* Front Side Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-6 z-10 group-hover:opacity-0 transition-all duration-500">
                    <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 mb-4">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-bold text-white text-center">
                      {step.title}
                    </h3>
                  </div>

                  {/* Back Side Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <div>
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        {step.description}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 border-t border-purple-500/20 pt-3">
                      Step {step.number.replace(/0/, "")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-purple-50/20 dark:from-gray-900/0 dark:to-purple-900/20 animated-gradient"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white relative z-10">
            Featured{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Projects
            </span>
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto relative z-10">
            Explore my latest work and personal projects that showcase my skills
            and expertise.
          </p>

          <div className="flex justify-center gap-3 mb-12 relative z-10 flex-wrap px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/50"
                    : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-purple-200 dark:border-purple-900 hover:border-purple-500 dark:hover:border-purple-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="relative">
              {/* Improved scrolling and snap behavior */}
              <div
                id="projects-container"
                className="flex gap-8 pb-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                onScroll={handleProjectsScroll}
              >
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="min-w-[320px] md:min-w-[420px] snap-center"
                  >
                    <FlipCard
                      title={project.title}
                      image={
                        project.images[0] ||
                        "/placeholder.svg?height=600&width=800"
                      }
                      description={project.description}
                      technologies={project.technologies}
                      category={project.category}
                      githubUrl={project.githubUrl}
                      onViewDetails={() => setSelectedProject(project)}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-purple-200/30 dark:border-purple-900/30">
                <button
                  onClick={() => {
                    const container =
                      document.getElementById("projects-container");
                    if (container) {
                      container.scrollBy({ left: -500, behavior: "smooth" });
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-full backdrop-blur-sm shadow-lg shadow-purple-600/50 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Scroll left"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <button
                      key={i}
                      onClick={() => scrollProjectsToPosition(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer ${
                        projectsScrollPosition === i
                          ? "bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg shadow-purple-600/50 scale-125"
                          : "bg-purple-400/50 hover:bg-purple-500/70"
                      }`}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    const container =
                      document.getElementById("projects-container");
                    if (container) {
                      container.scrollBy({ left: 500, behavior: "smooth" });
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-full backdrop-blur-sm shadow-lg shadow-purple-600/50 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Scroll right"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section id="technologies" className="py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Explore my{" "}
              <span className="text-purple-600 dark:text-purple-400">
                technologies
              </span>
            </h2>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Whether you're looking for frontend development, backend
              solutions, or full-stack expertise, I've got the skills to bring
              your project to life.
            </p>

            <div className="relative">
              <div
                className="flex gap-8 pb-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
                id="tech-categories"
                onScroll={handleTechScroll}
              >
                {[
                  {
                    name: "Frontend",
                    skills: [
                      { name: "React", icon: techIcons.react, proficiency: 80 },
                      {
                        name: "Angular",
                        icon: techIcons.angular,
                        proficiency: 90,
                      },
                    ],
                  },
                  {
                    name: "Backend",
                    skills: [
                      {
                        name: "Node.js",
                        icon: techIcons.nodejs,
                        proficiency: 85,
                      },
                      {
                        name: "Express",
                        icon: techIcons.express,
                        proficiency: 85,
                      },
                      {
                        name: "spring boot",
                        icon: techIcons.python,
                        proficiency: 85,
                      },
                      {
                        name: "php",
                        icon: techIcons.django,
                        proficiency: 50,
                      },
                    ],
                  },
                  {
                    name: "Mobile",
                    skills: [
                      {
                        name: "Flutter",
                        icon: techIcons.flutter,
                        proficiency: 60,
                      },
                      {
                        name: "java",
                        icon: techIcons.android,
                        proficiency: 70,
                      },
                    ],
                  },
                  {
                    name: "Database",
                    skills: [
                      {
                        name: "MongoDB",
                        icon: techIcons.mongodb,
                        proficiency: 85,
                      },

                      { name: "MySQL", icon: techIcons.mysql, proficiency: 85 },
                      {
                        name: "SQLite",
                        icon: techIcons.SQLite,
                        proficiency: 80,
                      },
                    ],
                  },
                  {
                    name: "DevOps",
                    skills: [
                      {
                        name: "Docker",
                        icon: techIcons.docker,
                        proficiency: 80,
                      },

                      { name: "AWS", icon: techIcons.aws, proficiency: 50 },
                      { name: "Git", icon: techIcons.git, proficiency: 90 },
                    ],
                  },
                  {
                    name: "Tools",
                    skills: [
                      {
                        name: "postman",
                        icon: techIcons.postman,
                        proficiency: 90,
                      },
                      {
                        name: "swagger",
                        icon: techIcons.swagger,
                        proficiency: 90,
                      },
                      {
                        name: "opentelemetry",
                        icon: techIcons.opentelemetry,
                        proficiency: 70,
                      },
                      {
                        name: "ELK Stack",
                        icon: techIcons.ELK,
                        proficiency: 65,
                      },
                    ],
                  },
                ].map((category, index) => (
                  <div
                    key={index}
                    className="min-w-[320px] md:min-w-[380px] snap-center group"
                  >
                    {/* Card Container with Border Glow */}
                    <div className="relative h-96 rounded-2xl overflow-hidden backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105 cursor-pointer">
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 dark:from-gray-800 dark:via-purple-900/30 dark:to-gray-900"></div>

                      {/* Animated Background Glow on Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
                      </div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col p-6 z-10">
                        {/* Skills Grid - Front Side */}
                        <div className="flex-1 grid grid-cols-2 gap-3 mb-6 group-hover:opacity-0 transition-all duration-500">
                          {category.skills.map((skill, i) => (
                            <div
                              key={i}
                              className="relative rounded-lg bg-gradient-to-br from-purple-600/20 to-purple-900/30 border border-purple-500/30 hover:border-purple-400/60 p-3 flex items-center justify-center overflow-hidden group/skill transform hover:scale-110 transition-all duration-300"
                            >
                              <div className="relative w-12 h-12">
                                <Image
                                  src={skill.icon || "/placeholder.svg"}
                                  alt={skill.name}
                                  fill
                                  className="object-contain drop-shadow-lg"
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-purple-400/0 group-hover/skill:to-purple-400/20 transition-all duration-300"></div>
                            </div>
                          ))}
                        </div>

                        {/* Category Name - Front Bottom */}
                        <div className="group-hover:opacity-0 transition-all duration-500">
                          <h3 className="text-2xl font-bold text-white flex items-center justify-between">
                            {category.name}
                            <span className="text-purple-400 transform group-hover:translate-x-1 transition-transform duration-300">
                              →
                            </span>
                          </h3>
                        </div>
                      </div>

                      {/* Back Side - Details with Progress Bars */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                        <div>
                          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 mb-4">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-300 mb-4">
                            Core skills and technologies in{" "}
                            {category.name.toLowerCase()}
                          </p>
                        </div>

                        <div className="space-y-4">
                          {category.skills.map((skill, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-200">
                                  {skill.name}
                                </span>
                                <span className="text-xs font-semibold text-purple-400">
                                  {skill.proficiency}%
                                </span>
                              </div>
                              <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden border border-purple-500/20">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-purple-500/50"
                                  style={{ width: `${skill.proficiency}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="text-xs text-gray-400 border-t border-purple-500/20 pt-3">
                          Hover to explore
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-purple-200/30 dark:border-purple-900/30">
                <button
                  onClick={() => {
                    const container =
                      document.getElementById("tech-categories");
                    if (container) {
                      container.scrollBy({ left: -500, behavior: "smooth" });
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-full backdrop-blur-sm shadow-lg shadow-purple-600/50 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Scroll left"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      onClick={() => scrollTechToPosition(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 cursor-pointer ${
                        techScrollPosition === i
                          ? "bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg shadow-purple-600/50 scale-125"
                          : "bg-purple-400/50 hover:bg-purple-500/70"
                      }`}
                      aria-label={`Go to technology ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    const container =
                      document.getElementById("tech-categories");
                    if (container) {
                      container.scrollBy({ left: 500, behavior: "smooth" });
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-full backdrop-blur-sm shadow-lg shadow-purple-600/50 transition-all duration-300 hover:scale-110 active:scale-95"
                  aria-label="Scroll right"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
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
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-100 dark:border-purple-900 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white text-center">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Mail className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email
                      </h4>
                      <p className="text-gray-900 dark:text-white">
                        ranim.abker@enicar.ucar.tn
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Github className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        GitHub
                      </h4>
                      <Link
                        href="https://github.com/Abker-Ranim"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        Abker-Ranim
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105">
                    <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Linkedin className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        LinkedIn
                      </h4>
                      <Link
                        href="https://www.linkedin.com/in/abker-ranim-1023002aa/"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        abker-ranim
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-center">
                  <Button
                    asChild
                    className="bg-purple-600 hover:bg-purple-700 text-white transform transition-transform duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <a href="mailto:ranim.abker@enicar.ucar.tn">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Me an Email
                    </a>
                  </Button>
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
