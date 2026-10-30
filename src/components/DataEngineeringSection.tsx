import {
  ArrowDownToLine,
  ArrowRight,
  Boxes,
  Check,
  Code2,
  Database,
  HardDrive,
  Network,
  Radio,
  Server,
  Workflow,
} from "lucide-react";

const technologyGroups = [
  {
    name: "Distributed Storage",
    icon: HardDrive,
    technologies: ["HDFS"],
  },
  {
    name: "Data Processing",
    icon: Boxes,
    technologies: ["Apache Hadoop", "MapReduce", "Apache Spark"],
  },
  {
    name: "Data Streaming",
    icon: Radio,
    technologies: ["Apache Kafka", "KRaft"],
  },
  {
    name: "Data Ingestion",
    icon: ArrowDownToLine,
    technologies: ["Apache SeaTunnel"],
  },
  {
    name: "Workflow Orchestration",
    icon: Workflow,
    technologies: ["Apache Airflow"],
  },
  {
    name: "Programming & Infrastructure",
    icon: Code2,
    technologies: ["Python", "SQL", "Linux", "Docker", "Virtual Machines"],
  },
];

const pipelineStages = [
  { label: "Ingestion", icon: ArrowDownToLine },
  { label: "Processing", icon: Boxes },
  { label: "Storage", icon: Database },
  { label: "Analytics", icon: Workflow },
] as const;

const projects = [
  {
    number: "01",
    title: "Rides Analytics Pipeline",
    description:
      "An end-to-end batch analytics pipeline that processes ride-hailing trip data across multiple cities.",
    technologies: [
      "Apache Airflow",
      "Apache Hadoop",
      "MapReduce",
      "Apache SeaTunnel",
      "HDFS",
      "Python",
    ],
    features: [
      "Ingests and cleans source data with SeaTunnel.",
      "Stores datasets in HDFS for distributed processing.",
      "Runs city-level analytics with Hadoop MapReduce.",
      "Calculates average speed and average fare per kilometre.",
      "Uses Airflow to orchestrate the workflow.",
      "Routes processed analytics into categorized output datasets.",
    ],
    architecture: [
      { label: "Trip data", icon: Database },
      { label: "SeaTunnel", icon: ArrowDownToLine },
      { label: "HDFS", icon: HardDrive },
      { label: "Hadoop MapReduce", icon: Boxes },
      { label: "City analytics", icon: Workflow },
    ],
    architectureNote:
      "Airflow orchestrates the ingestion, processing, and output stages.",
    implementation:
      "SeaTunnel handles ingestion and cleaning before the data is stored in HDFS. Hadoop MapReduce processes the stored trip data to produce city-level analytics, including average speed and average fare per kilometre. Apache Airflow coordinates the batch workflow, and the resulting analytics are routed into categorized output datasets.",
  },
  {
    number: "02",
    title: "Distributed Food Ordering System",
    description:
      "A distributed food-ordering data pipeline across four virtual machines, demonstrating messaging, batch processing, broker replication, and fault tolerance.",
    technologies: [
      "Apache Kafka 3.9.2",
      "Apache Spark 3.3.4",
      "Python 3.10",
      "KRaft",
      "ZeroTier",
    ],
    features: [
      "Runs a distributed Kafka architecture with KRaft.",
      "Uses two brokers with replicated Kafka topics.",
      "Distributes producers and consumers across four VMs.",
      "Batch-processes local JSONL datasets with Spark.",
      "Generates enriched order data and analytics.",
      "Demonstrates broker failure, recovery, and replication.",
    ],
    architecture: [
      { label: "Distributed producers", icon: Server },
      { label: "Kafka · KRaft · 2 brokers", icon: Radio },
      { label: "Distributed consumers", icon: Network },
    ],
    batchArchitecture: [
      { label: "Local JSONL files", icon: Database },
      { label: "Spark batch processing", icon: Boxes },
      { label: "Enriched orders & analytics", icon: Workflow },
    ],
    architectureNote:
      "Kafka messaging and Spark batch processing are separate paths. Spark reads local JSONL files; it does not consume Kafka.",
    implementation:
      "The Kafka deployment uses KRaft and two brokers with replicated topics. Producers and consumers run across four virtual machines connected through ZeroTier. Separately, Apache Spark batch-processes local JSONL datasets to enrich order records and generate analytics; Spark does not consume Kafka. Broker failure and recovery scenarios demonstrate replication and fault tolerance.",
  },
];

function TechnologyGroup({
  group,
}: {
  group: (typeof technologyGroups)[number];
}) {
  const Icon = group.icon;

  return (
    <article className="rounded-2xl border border-slate-700 bg-slate-900/75 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-slate-900 motion-reduce:transform-none motion-reduce:transition-none">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
          <Icon aria-hidden="true" size={18} />
        </span>
        <h3 className="text-sm font-semibold text-white">{group.name}</h3>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.technologies.map((technology) => (
          <li
            key={technology}
            className="rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-xs text-slate-300"
          >
            {technology}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ArchitectureFlow({
  steps,
  label,
}: {
  steps: (typeof projects)[number]["architecture"];
  label: string;
}) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </h4>
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <li
              key={step.label}
              className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2"
            >
              <div className="flex min-h-14 flex-1 items-center gap-2.5 rounded-xl border border-slate-700/80 bg-slate-950/70 px-3 py-2">
                <Icon
                  aria-hidden="true"
                  className="shrink-0 text-cyan-300"
                  size={17}
                />
                <span className="text-xs font-medium leading-5 text-slate-200">
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="hidden shrink-0 text-slate-500 sm:block"
                  size={16}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-700 bg-slate-950/85 shadow-xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-500/5 motion-reduce:transform-none motion-reduce:transition-none">
      <div className="border-b border-slate-800 bg-gradient-to-r from-cyan-500/[0.08] via-transparent to-transparent p-5 sm:p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
          Project {project.number}
        </p>
        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
          {project.description}
        </p>
        <ul
          aria-label="Technology stack"
          className="mt-4 flex flex-wrap gap-2"
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-cyan-400/15 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-100"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">
            Key features
          </h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm leading-5 text-slate-300"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-cyan-300"
                  size={15}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-4 sm:p-5">
          <ArchitectureFlow steps={project.architecture} label="Architecture" />
          {project.batchArchitecture && (
            <div className="mt-5 border-t border-slate-800 pt-4">
              <ArchitectureFlow
                steps={project.batchArchitecture}
                label="Separate Spark batch path"
              />
            </div>
          )}
          <p className="mt-3 text-xs leading-5 text-slate-400">
            {project.architectureNote}
          </p>
        </div>

        <details className="group rounded-xl border border-slate-800 bg-slate-900/40 open:border-cyan-400/25">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-slate-200 marker:hidden transition hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-3">
              Technical implementation
              <span
                aria-hidden="true"
                className="text-lg leading-none text-cyan-300 transition-transform group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </span>
          </summary>
          <p className="border-t border-slate-800 px-4 py-3 text-sm leading-6 text-slate-300">
            {project.implementation}
          </p>
        </details>
      </div>
    </article>
  );
}

export default function DataEngineeringSection() {
  return (
    <div className="mt-8 space-y-8 sm:mt-10">
        <section className="rounded-[2rem] border border-slate-700 bg-slate-950/85 p-5 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <p className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-200 sm:text-xs">
              Distributed systems · pipelines · analytics
            </p>
            <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight text-white">
              Data Engineering &amp; Big Data
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              Building distributed systems, processing large-scale datasets,
              and engineering reliable data pipelines.
            </p>
          </div>

          <div
            aria-label="Data engineering workflow"
            className="rounded-2xl border border-cyan-400/15 bg-gradient-to-r from-cyan-500/[0.08] via-slate-900/70 to-slate-900/70 p-4 sm:p-5"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Pipeline lifecycle
            </p>
            <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {pipelineStages.map((stage) => {
                const StageIcon = stage.icon;
                return (
                  <li
                    key={stage.label}
                    className="flex items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-950/50 px-3 py-2.5"
                  >
                    <StageIcon
                      aria-hidden="true"
                      className="shrink-0 text-cyan-300"
                      size={17}
                    />
                    <span className="text-xs font-medium text-slate-200 sm:text-sm">
                      {stage.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-5 shadow-xl shadow-slate-950/20 sm:mt-10 sm:p-8">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Technology map
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              Big data toolkit
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {technologyGroups.map((group) => (
              <TechnologyGroup key={group.name} group={group} />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-700 bg-slate-950/85 p-5 shadow-2xl shadow-slate-950/20 sm:mt-10 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              Hands-on work
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              Featured Projects
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Batch analytics and distributed messaging, with each system&apos;s
              data flow represented separately.
            </p>
          </div>
          <div className="grid gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.number} project={project} />
            ))}
          </div>
        </section>
    </div>
  );
}
