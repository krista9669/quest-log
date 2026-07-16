// app/projects/page.tsx
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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-24">
        <section className="mb-12 sm:mb-16 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-10 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60">
          <PageHeader
            className="mb-8 sm:mb-10"
            eyebrow="What I've built"
            title="Projects"
            description="A selection of projects from my GitHub profile, focused on computer vision, machine learning, data analysis and practical web development."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 px-5 py-4 text-slate-300 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-8 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
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

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h3 className="text-lg sm:text-2xl font-semibold text-white">
                    {project.name}
                  </h3>
                  <span className="rounded-full bg-slate-700/40 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                    GitHub
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-300 leading-6 sm:leading-7">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}