// app/blog/page.tsx
"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { SiMedium } from "react-icons/si";
import PageHeader from "@/components/PageHeader";

type JournalEntry = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  remainder: string;
  tags: string[];
  link?: { label: string; url: string };
};

const journalEntries: JournalEntry[] = [
  {
    id: "dit",
    date: "July 16, 2026",
    title: "Diffusion Transformer (DiT)",
    excerpt:
      "Today I explored DiT, a diffusion-transformer model that applies attention mechanisms inside a diffusion process.",
    remainder:
      "What fascinates me is how it combines generative diffusion with transformer structure to produce sharper, more coherent visual outputs.",
    tags: ["Diffusion Models", "Transformers", "Generative AI"],
    link: {
      label: "Read the DiT paper on PaperswithCode",
      url: "https://paperswithcode.co/methods/diffusion-transformer-dit",
    },
  },
  {
    id: "opencv",
    date: "June 05, 2026",
    title: "Optimizing an OpenCV Pipeline",
    excerpt: "Every camera frame hides thousands of patterns.",
    remainder:
      "I've been using OpenCV to uncover them — tracking movement, isolating objects, detecting features, and transforming raw pixels into meaningful information through real-time computer vision experiments.",
    tags: ["Computer Vision", "OpenCV", "Real-Time"],
  },
];

function getReadTime(entry: JournalEntry) {
  const wordCount = `${entry.excerpt} ${entry.remainder}`
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function ReadingProgressBar() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyan-400 to-cyan-200"
      style={{ scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress }}
    />
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
        open ? "rotate-180" : "rotate-0"
      }`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CopyLinkButton({ entryId }: { entryId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${entryId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link to this entry"
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-[11px] font-medium text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="inline-flex"
            >
              <CheckIcon />
            </motion.span>
          ) : (
            <motion.span
              key="link"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="inline-flex"
            >
              <LinkIcon />
            </motion.span>
          )}
        </AnimatePresence>
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

function JournalArticle({
  entry,
  index,
}: {
  entry: JournalEntry;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);
  const readTime = getReadTime(entry);

  return (
    <motion.article
      id={entry.id}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-5 sm:p-6 transition-colors hover:border-cyan-400/40 hover:bg-slate-900/95"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <time className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-cyan-300/80">
            {entry.date}
          </time>
          <span className="text-slate-600">·</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-500">
            {readTime} min read
          </span>
        </div>
        <CopyLinkButton entryId={entry.id} />
      </div>

      <h2 className="mt-2.5 text-lg sm:text-xl font-semibold text-white">
        {entry.title}
      </h2>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {entry.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">
        {entry.excerpt}
      </p>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="remainder"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-2.5 text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">
              {entry.remainder}
            </p>
            {entry.link && (
              <a
                href={entry.link.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-200 transition hover:text-cyan-300"
              >
                {entry.link.label}
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-cyan-200"
      >
        {isExpanded ? "Read less" : "Read more"}
        <ChevronIcon open={isExpanded} />
      </button>
    </motion.article>
  );
}

export default function JournalPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen text-white">
      <ReadingProgressBar />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <section className="rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60">
          <PageHeader
            className="mb-6 sm:mb-8"
            eyebrow="Blog"
            title="Journal"
            description="Research logs and progress notes for my latest quests."
          />

          <div className="space-y-4 sm:space-y-5">
            {journalEntries.map((entry, index) => (
              <JournalArticle key={entry.id} entry={entry} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              delay: journalEntries.length * 0.08,
              ease: "easeOut",
            }}
            className="mt-8 sm:mt-10 rounded-[1.75rem] border border-slate-700 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 sm:p-8 text-center transition hover:-translate-y-1 hover:border-cyan-400/40"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/50 text-2xl text-slate-200">
              <SiMedium />
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Beyond the Journal
            </h3>

            <p className="mt-2.5 max-w-2xl mx-auto text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">
              On Medium, I write about life and the moments in between.
            </p>

            <a
              href="https://medium.com/@kwqish"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Visit My Medium
            </a>
          </motion.div>
        </section>
      </main>
    </div>
  );
}