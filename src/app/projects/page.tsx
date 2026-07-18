// app/projects/page.tsx
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import PageHeader from "@/components/PageHeader";

const projects = [
  {
    name: "quest-log",
    description:
      "This portfolio site built with Next.js, Tailwind, and a modern web app layout.",
    tags: ["Next.js", "React", "Web"],
    url: "https://github.com/krista9669/quest-log",
  },
  {
    name: "F1",
    description:
      "Formula 1 data analytics and visualizations using FastF1, pandas, and Plotly.",
    tags: ["Python", "Data", "Visualization"],
    url: "https://github.com/krista9669/F1",
  },
  {
    name: "CV",
    description:
      "Computer vision notebooks for image processing, OpenCV practice, and real-world examples.",
    tags: ["Python", "OpenCV", "Learning"],
    url: "https://github.com/krista9669/CV_basics",
  },
  {
    name: "ML_basics",
    description:
      "Machine learning experiments and notebook-driven model exploration.",
    tags: ["Python", "ML", "Notebooks"],
    url: "https://github.com/krista9669/ML_basics",
  },
  {
    name: "CardioTwin",
    description:
      "Frontend health interface built with HTML and CSS, focused on design and responsiveness.",
    tags: ["HTML", "UI", "Design"],
    url: "https://github.com/krista9669/CardioTwin",
  },
  {
    name: "Regulus",
    description:
      "A handcrafted Visual Studio Code theme designed with readability and consistency in mind.",
    tags: ["VS Code", "Theme"],
    url: "https://github.com/krista9669/regulus-vscode-theme",
  },
];

const highlights = [
  "Exploring AI, Computer Vision and Web Development",
  "Contributing to open source projects",
  "Turning curiosity into projects and ideas into reality",
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized -0.5..0.5 offset from card center, drives the tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 20, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(tiltY, [-0.5, 0.5], [9, -9]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(tiltX, [-0.5, 0.5], [-9, 9]),
    springConfig
  );

  // 0..100% position within the card, drives the spotlight gradient
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);
  const spotlightBackground = useMotionTemplate`radial-gradient(280px circle at ${spotlightX}% ${spotlightY}%, rgba(34,211,238,0.16), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    tiltX.set(relX - 0.5);
    tiltY.set(relY - 0.5);
    spotlightX.set(relX * 100);
    spotlightY.set(relY * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 800 }
      }
      whileHover={{ y: prefersReducedMotion ? 0 : -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      animate={{
        boxShadow: isHovered
          ? "0 0 0 1px rgba(34,211,238,0.5), 0 20px 45px -15px rgba(34,211,238,0.25)"
          : "0 0 0 0 rgba(34,211,238,0)",
      }}
      className={`group relative overflow-hidden rounded-[1.75rem] border bg-slate-900/80 p-5 transition-colors duration-300 hover:bg-slate-900/95 ${
        isHovered ? "border-cyan-400/60" : "border-slate-700"
      }`}
    >
      {/* Spotlight glow that follows the cursor */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlightBackground }}
        />
      )}

      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {project.name}
          </h3>
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
              isHovered
                ? "bg-cyan-500/30 text-cyan-100"
                : "bg-slate-700/40 text-slate-300"
            }`}
          >
            GitHub
          </span>
        </div>
        <p className="text-sm leading-6 text-slate-300">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <section className="mb-8 sm:mb-10 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60">
          <PageHeader
            className="mb-6 sm:mb-8"
            eyebrow="What I've built"
            title="Projects"
            description="A selection of projects from my GitHub profile, focused on computer vision, machine learning, data analysis and practical web development."
          />
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm sm:text-base text-slate-300 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 sm:mt-10 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Project Gallery
            </h2>
            <a
              href="https://github.com/krista9669?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              View GitHub Repos
            </a>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}