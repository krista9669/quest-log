// app/about/page.tsx
import PageHeader from "@/components/PageHeader";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiC,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiFigma,
  SiTypescript,
  SiNextdotjs,
  SiPandas,
  SiNumpy,
  SiOpencv,
  SiPlotly,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export default function AboutPage() {
  const skills = [
    { icon: SiPython, name: "Python", color: "#3776AB" },
    { icon: SiC, name: "C", color: "#A8B9CC" },
    { icon: SiCplusplus, name: "C++", color: "#00599C" },
    { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
    { icon: SiReact, name: "React", color: "#61DAFB" },
    { icon: SiNextdotjs, name: "Next.js", color: "#000000" },
    { icon: SiHtml5, name: "HTML", color: "#E34F26" },
    { icon: SiCss, name: "CSS", color: "#1572B6" },
    { icon: SiTailwindcss, name: "Tailwind CSS", color: "#38B2AC" },
    { icon: SiPandas, name: "Pandas", color: "#150458" },
    { icon: SiNumpy, name: "NumPy", color: "#F9C74F" },
    { icon: SiPlotly, name: "Matplotlib", color: "#FF6F00" },
    { icon: SiOpencv, name: "OpenCV", color: "#33A4DC" },
    { icon: SiPython, name: "FastF1", color: "#3776AB" },
    { icon: SiGit, name: "Git", color: "#F05032" },
    { icon: SiGithub, name: "GitHub", color: "#FFFFFF" },
    { icon: VscVscode, name: "VS Code", color: "#007ACC" },
    { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  ];

  const interests = [
    "Open Source Contributions",
    "Formula 1 Analytics",
    "Data Visualization",
    "Web Development",
    "Computer Vision",
    "Machine Learning",
  ];

  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-24">
        <section className="mb-12 sm:mb-16 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-10 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60">
          <PageHeader
            className="mb-8 sm:mb-10"
            eyebrow="Welcome to my corner of the internet"
            title="About Me"
          />
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-semibold text-white">
              Hi, I&apos;m Krishitha 👋
            </h2>
            <div className="space-y-6 text-base sm:text-xl leading-7 sm:leading-10 text-slate-300">
              <p>
                I&apos;m a 3rd-year Computer Science student @ PES University
              </p>
              <p>
                I&apos;m someone who is constantly brainstorming ideas, exploring
                new interests and imagining ways to turn concepts into
                meaningful projects. Whether it&apos;s a new technology, a
                fascinating book or a topic in human psychology, I love diving
                deep into subjects that spark my curiosity. I enjoy building
                things, solving problems, reading, learning how people think
                and exploring the intersection between creativity, technology
                and human behavior.
              </p>
              <p>
                A fun fact about me is that I&apos;m fascinated by human
                psychology, which might explain my love for true crime
                stories and murder mystery novels. I enjoy piecing together
                clues, analyzing motives and trying to understand what drives
                people&apos;s actions. My detective success rate remains
                unverified.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
          <article className="rounded-[1.75rem] border border-slate-700 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 sm:p-8 shadow-xl shadow-cyan-500/5 transition hover:-translate-y-1 hover:shadow-cyan-500/20">
            <h2 className="mb-4 text-xl sm:text-3xl font-semibold text-white">
              Current Quest
            </h2>
            <p className="text-sm sm:text-base leading-6 sm:leading-8 text-slate-300">
              Building projects, contributing to open source and learning new
              technologies.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-slate-700 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 sm:p-8 shadow-xl shadow-cyan-500/5 transition hover:-translate-y-1 hover:shadow-cyan-500/20">
            <h2 className="mb-4 text-xl sm:text-3xl font-semibold text-white">
              Current Objective
            </h2>
            <p className="text-sm sm:text-base leading-6 sm:leading-8 text-slate-300">
              Keep learning, keep building and create things I&apos;m
              genuinely proud of.
            </p>
          </article>
        </div>

        <section className="mt-12 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-8 shadow-xl shadow-slate-950/20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Interests
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {interests.map((interest) => (
              <div
                key={interest}
                className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 px-5 py-4 text-slate-300 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95"
              >
                {interest}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-8 shadow-2xl shadow-slate-950/20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Tech Stack
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="group rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95 hover:shadow-xl hover:shadow-cyan-500/10"
                >
                  <div
                    className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800/50 text-4xl"
                    style={{ color: skill.color }}
                  >
                    <Icon />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                    {skill.name}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}