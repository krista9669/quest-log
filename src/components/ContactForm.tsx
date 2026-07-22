// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send email");
        return;
      }

      setStatus("success");
      setEmail("");
      setMessage("");
      onSuccess?.();
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-base sm:text-lg font-medium text-white mb-2 sm:mb-3"
        >
          Your Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-slate-500 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-base sm:text-lg font-medium text-white mb-2 sm:mb-3"
        >
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Your message here..."
          rows={6}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-slate-500 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-cyan-500 px-5 py-2.5 sm:px-6 sm:py-3 text-base sm:text-lg font-semibold text-white transition hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2.5 rounded-lg border border-green-500/20 bg-green-500/10 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-green-300"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 sm:h-5 sm:w-5 shrink-0"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            >
              <path d="M20 6 9 17l-5-5" />
            </motion.svg>
            Message sent successfully! I&apos;ll get back to you soon.
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 sm:h-5 sm:w-5 shrink-0"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}