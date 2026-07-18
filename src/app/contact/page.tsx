// app/contact/page.tsx
"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

const EMAIL = "krishithaaaa@gmail.com";

function CopyIcon() {
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
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
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

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
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
        aria-label={`Copy ${label}`}
        className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/60 p-1.5 text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-300"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
            >
              <CheckIcon />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
            >
              <CopyIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-[10px] font-medium text-cyan-200 shadow-lg"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function AvailabilityBadge() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs sm:text-sm text-slate-300">
      <span className="relative flex h-2.5 w-2.5">
        {!prefersReducedMotion && (
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-green-400"
            animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
      </span>
      Usually replies within 24 hours
    </div>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-800 hover:text-cyan-300"
    >
      {icon}
      {label}
    </a>
  );
}

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();
  const [justSubmitted, setJustSubmitted] = useState(false);
  const pulseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFormSuccess = () => {
    setJustSubmitted(true);
    if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    pulseTimeoutRef.current = setTimeout(() => setJustSubmitted(false), 2500);
  };

  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <section className="rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60">
          <PageHeader
            className="mb-4 sm:mb-5"
            eyebrow="Get in touch"
            title="Contact"
            description="I'm always open to new opportunities and conversations."
          />

          <div className="mb-6 sm:mb-8">
            <AvailabilityBadge />
          </div>

          <div className="grid gap-4 sm:gap-5">
            <div className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-5 sm:p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95">
              <h2 className="mb-2.5 text-lg sm:text-xl font-semibold text-white">
                Email
              </h2>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm sm:text-base text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {EMAIL}
                </a>
                <CopyButton value={EMAIL} label="email address" />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-5 sm:p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95">
              <h2 className="mb-2.5 text-lg sm:text-xl font-semibold text-white">
                Social
              </h2>
              <div className="flex flex-wrap gap-4 sm:gap-5">
              <SocialButton
                href="https://github.com/krista9669"
                icon={<FaGithub className="h-4 w-4" />}
                label="GitHub"
              />

              <SocialButton
                href="https://www.linkedin.com/in/krishitha-k/"
                icon={<FaLinkedin className="h-4 w-4" />}
                label="LinkedIn"
              />
              </div>
            </div>

            <motion.div
              animate={{
                boxShadow:
                  justSubmitted && !prefersReducedMotion
                    ? "0 0 0 1px rgba(34,211,238,0.6), 0 0 40px rgba(34,211,238,0.3)"
                    : "0 0 0 0 rgba(34,211,238,0)",
                borderColor: justSubmitted
                  ? "rgba(34,211,238,0.5)"
                  : "rgb(51 65 85)",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-[1.75rem] border bg-slate-900/80 p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-slate-900/95"
            >
              <h2 className="mb-2.5 text-lg sm:text-xl font-semibold text-white">
                Get in Touch
              </h2>
              <p className="mb-3 sm:mb-4 text-sm sm:text-base text-slate-300">
                Fill out the form and I&apos;ll get back to you as soon as
                possible.
              </p>
              <ContactForm onSuccess={handleFormSuccess} />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}