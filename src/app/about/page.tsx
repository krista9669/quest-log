// app/about/page.tsx
"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { ChevronDown, ExternalLink } from "lucide-react";
import { FaJava } from "react-icons/fa";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiPython,
  SiC,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPandas,
  SiPlotly,
  SiOpencv,
  SiFigma,
  SiPostgresql,
  SiNeo4J,
  SiRedis,
  SiJupyter,
  SiSqlite,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const PROJECTS = {
  cardioTwin: {
    name: "CardioTwin",
    url: "https://github.com/krista9669/CardioTwin",
  },
  cv: { name: "CV", url: "https://github.com/krista9669/CV" },
  f1: { name: "F1", url: "https://github.com/krista9669/F1" },
  questLog: {
    name: "quest-log",
    url: "https://github.com/krista9669/quest-log",
  },
  regulus: {
    name: "regulus-vscode-theme",
    url: "https://github.com/krista9669/regulus-vscode-theme",
  },
  gitForensics: {
    name: "git-repository-forensics",
    url: "https://github.com/krista9669/git-repository-forensics",
  },
  poseToCloth: {
    name: "pose-to-cloth-prediction",
    url: "https://github.com/krista9669/pose-to-cloth-prediction",
  },
  syntaxParser: {
    name: "python-syntax-parser",
    url: "https://github.com/krista9669/python-syntax-parser",
  },
  mlBasics: {
    name: "ML_basics",
    url: "https://github.com/krista9669/ML_basics",
  },
  vcs: {
    name: "PES2UG24CS234-pes-vcs",
    url: "https://github.com/krista9669/PES2UG24CS234-pes-vcs",
  },
  electronicsInventory: {
    name: "Electronics Store Inventory Management System",
    url: "https://github.com/ElectronicsStore-ManagementSystem/Team-9-Electronics-Store-Inventory-Management-System",
  },
};

const SKILLS = [
  {
    icon: SiPython,
    name: "Python",
    color: "#3776AB",
    category: "Languages",
    projects: [
      PROJECTS.poseToCloth,
      PROJECTS.syntaxParser,
      PROJECTS.mlBasics,
      PROJECTS.f1,
      PROJECTS.electronicsInventory,
    ],
  },
  {
    icon: SiC,
    name: "C",
    color: "#A8B9CC",
    category: "Languages",
    projects: [PROJECTS.vcs],
  },
  {
    icon: SiCplusplus,
    name: "C++",
    color: "#00599C",
    category: "Languages",
    projects: [],
  },
  {
    icon: FaJava,
    name: "Java",
    color: "#ED8B00",
    category: "Languages",
    projects: [],
  },
  {
    icon: SiJavascript,
    name: "JavaScript",
    color: "#F7DF1E",
    category: "Languages",
    projects: [],
  },
  {
    icon: SiTypescript,
    name: "TypeScript",
    color: "#3178C6",
    category: "Languages",
    projects: [PROJECTS.questLog, PROJECTS.gitForensics],
  },
  {
    icon: SiReact,
    name: "React",
    color: "#61DAFB",
    category: "Web",
    projects: [PROJECTS.questLog, PROJECTS.gitForensics],
  },
  {
    icon: SiNextdotjs,
    name: "Next.js",
    color: "#000000",
    category: "Web",
    projects: [PROJECTS.questLog, PROJECTS.gitForensics],
  },
  {
    icon: SiHtml5,
    name: "HTML",
    color: "#E34F26",
    category: "Web",
    projects: [PROJECTS.cardioTwin],
  },
  {
    icon: SiCss,
    name: "CSS",
    color: "#1572B6",
    category: "Web",
    projects: [PROJECTS.questLog],
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind CSS",
    color: "#38B2AC",
    category: "Web",
    projects: [PROJECTS.questLog],
  },
  {
    icon: SiPandas,
    name: "Pandas",
    color: "#150458",
    category: "Data & ML",
    projects: [PROJECTS.f1],
  },
  {
    icon: SiPlotly,
    name: "Plotly",
    color: "#FF6F00",
    category: "Data & ML",
    projects: [PROJECTS.f1],
  },
  {
    icon: SiJupyter,
    name: "Jupyter Notebook",
    color: "#F37626",
    category: "Data & ML",
    projects: [PROJECTS.cv],
  },
  {
    icon: SiOpencv,
    name: "Computer Vision",
    color: "#33A4DC",
    category: "Data & ML",
    projects: [PROJECTS.cv, PROJECTS.poseToCloth],
  },
  {
    icon: SiPostgresql,
    name: "PostgreSQL",
    color: "#4169E1",
    category: "Systems & Data",
    projects: [PROJECTS.gitForensics],
  },
  {
    icon: SiNeo4J,
    name: "Neo4j",
    color: "#008CC1",
    category: "Systems & Data",
    projects: [PROJECTS.gitForensics],
  },
  {
    icon: SiRedis,
    name: "Redis",
    color: "#DC382D",
    category: "Systems & Data",
    projects: [PROJECTS.gitForensics],
  },
  {
    icon: SiSqlite,
    name: "SQL",
    color: "#003B57",
    category: "Systems & Data",
    projects: [PROJECTS.gitForensics],
  },
  {
    icon: SiGit,
    name: "Git",
    color: "#F05032",
    category: "Tools",
    projects: [PROJECTS.gitForensics],
  },
  {
    icon: SiGithub,
    name: "GitHub",
    color: "#FFFFFF",
    category: "Tools",
    projects: [],
  },
  {
    icon: VscVscode,
    name: "VS Code",
    color: "#007ACC",
    category: "Tools",
    projects: [PROJECTS.regulus],
  },
  {
    icon: SiFigma,
    name: "Figma",
    color: "#F24E1E",
    category: "Tools",
    projects: [],
  },
];

const CATEGORIES = [
  "All",
  "Languages",
  "Web",
  "Data & ML",
  "Systems & Data",
  "Tools",
];

const INTERESTS = [
  "Machine Learning",
  "Data Visualization",
  "Web Development",
  "AI Agents",
  "Data Anayltics",
  "Big Data",
];

const FUN_FACT =
  "I usually fall in love with a project name before I figure out what the project is. Quest Log was no different. It eventually became a record of my journey; every project, every experiment, every lesson and every small step toward becoming a better engineer. ";

const TYPEWRITER_TEXT = "Hi, I'm Krishitha";
const CONTACT_EMAIL = "krishithaaaa@gmail.com";

function useTypewriter(text: string, enabled: boolean, speedMs = 55) {
  const [displayed, setDisplayed] = useState(enabled ? "" : text);
  const [done, setDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speedMs);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, text]);

  return { displayed, done };
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { displayed: typedGreeting, done: typingDone } = useTypewriter(
    TYPEWRITER_TEXT,
    mounted && !reducedMotion
  );

  const reveal = (delayMs: number) =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;
  const revealStyle = (delayMs: number) => ({ transitionDelay: `${delayMs}ms` });

  const handleTilt = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${y * -6}deg) rotateY(${
      x * 6
    }deg) translateY(-2px)`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform =
      "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  const visibleSkills =
    activeCategory === "All"
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeCategory);

  const toggleSkill = (skillName: string) => {
    setActiveSkill((prev) => (prev === skillName ? null : skillName));
  };

  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <section
          className={`mb-8 sm:mb-10 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-5 sm:p-8 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60 ${reveal(0)}`}
          style={revealStyle(0)}
        >
          <PageHeader
            className="mb-6 sm:mb-8"
            eyebrow="I'm glad you stopped by"
            title="About Me"
          />
          <div className="space-y-4 sm:space-y-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              <span aria-hidden={!typingDone}>{typedGreeting}</span>
              <span className="sr-only">{TYPEWRITER_TEXT}</span>
              {!typingDone && (
                <span
                  aria-hidden
                  className="ml-0.5 inline-block h-[1.1em] w-[2px] -translate-y-[1px] animate-pulse bg-cyan-300 align-middle"
                />
              )}
            </h2>
            <div className="space-y-3 text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">
              <p>
                I&apos;m a 3rd-year CSE student at PES University who learns by
                building. My projects include a portfolio, Git repository
                analytics, machine-learning experiments, Formula 1 data
                visualizations, and programming projects in Python, TypeScript,
                C and HTML.
              </p>
              <p>
                I enjoy exploring how software works through hands-on projects:
                analyzing Git history, experimenting with cloth-deformation
                prediction, parsing Python syntax, and shaping a focused coding
                experience with a VS Code theme.
              </p>
            </div>

            <div>
              <button
                onClick={() => setShowFunFact((prev) => !prev)}
                aria-expanded={showFunFact}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                Fun fact
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${
                    showFunFact ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: showFunFact ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="mt-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-100">
                    {FUN_FACT}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          <article
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{ ...revealStyle(80), transition: "transform 0.15s ease" }}
            className={`rounded-[1.75rem] border border-slate-700 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5 sm:p-6 shadow-xl shadow-cyan-500/5 will-change-transform ${reveal(80)}`}
          >
            <h2 className="mb-2.5 text-lg sm:text-xl font-semibold text-white">
              Current Quest
            </h2>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">
              Exploring web development, Git analytics, machine learning and
              data visualization through the projects I build.
            </p>
          </article>

          <article
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            style={{ ...revealStyle(140), transition: "transform 0.15s ease" }}
            className={`rounded-[1.75rem] border border-slate-700 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5 sm:p-6 shadow-xl shadow-cyan-500/5 will-change-transform ${reveal(140)}`}
          >
            <h2 className="mb-2.5 text-lg sm:text-xl font-semibold text-white">
              Current Objective
            </h2>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">
              Keep turning curiosity into projects, from cloth-prediction
              experiments to practical tools for exploring Git history.
            </p>
          </article>
        </div>

        <section
          className={`mt-8 sm:mt-10 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-5 sm:p-8 shadow-xl shadow-slate-950/20 ${reveal(200)}`}
          style={revealStyle(200)}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Interests
          </h2>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {INTERESTS.map((interest, i) => (
              <div
                key={interest}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{ transition: "transform 0.15s ease, border-color 0.3s ease, background-color 0.3s ease" }}
                className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm sm:text-base text-slate-300 will-change-transform hover:border-cyan-400/40 hover:bg-slate-900/95"
              >
                {interest}
              </div>
            ))}
          </div>
        </section>

        <section
          className={`mt-8 sm:mt-10 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-5 sm:p-8 shadow-2xl shadow-slate-950/20 ${reveal(260)}`}
          style={revealStyle(260)}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveSkill(null);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-wider transition ${
                    activeCategory === category
                      ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                      : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Tap a skill to see which projects use it.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleSkills.map((skill) => {
              const Icon = skill.icon;
              const isOpen = activeSkill === skill.name;
              const hasProjects = skill.projects.length > 0;

              return (
                <div
                  key={skill.name}
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                  onClick={() => hasProjects && toggleSkill(skill.name)}
                  role={hasProjects ? "button" : undefined}
                  tabIndex={hasProjects ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (hasProjects && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      toggleSkill(skill.name);
                    }
                  }}
                  aria-expanded={hasProjects ? isOpen : undefined}
                  style={{ transition: "transform 0.15s ease, border-color 0.3s ease, background-color 0.3s ease" }}
                  className={`group rounded-[1.75rem] border p-3 sm:p-5 text-center will-change-transform hover:shadow-xl hover:shadow-cyan-500/10 ${
                    hasProjects ? "cursor-pointer" : "cursor-default"
                  } ${
                    isOpen
                      ? "border-cyan-400/60 bg-slate-900/95"
                      : "border-slate-700 bg-slate-900/80 hover:border-cyan-400/40 hover:bg-slate-900/95"
                  }`}
                >
                  <div className="relative mx-auto mb-2 sm:mb-3 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-slate-800/50 text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">
                    <div style={{ color: skill.color }}>
                      <Icon />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                      {skill.name}
                    </p>
                    {hasProjects && (
                      <ChevronDown
                        className={`h-3 w-3 text-slate-500 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    )}
                  </div>

                  {hasProjects && (
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                          {skill.projects.map((project) => (
                            <a
                              key={project.name}
                              href={project.url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
                            >
                              {project.name}
                              <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="contact"
          className={`mt-8 sm:mt-10 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-5 sm:p-8 shadow-2xl shadow-cyan-500/10 ${reveal(320)}`}
          style={revealStyle(320)}
        >
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Get in touch
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                Let&apos;s connect
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Have a question, an idea, or just want to chat? I&apos;d love to
                hear from you.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's connect")}`}
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                Email me
              </a>
              <a
                href="https://github.com/krista9669"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/krishitha-k/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}