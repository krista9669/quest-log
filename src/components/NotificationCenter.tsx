"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Aperture,
  BookMarked,
  GitPullRequest,
  Terminal as TerminalIcon,
  Code2,
  type LucideIcon,
} from "lucide-react";

type NotificationItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  timestamp: string;
};

const NOTIFICATIONS: NotificationItem[] = [
  {
    icon: BookOpen,
    title: "Journal",
    description: "Published notes on Diffusion Transformers",
    timestamp: "Today",
  },
  {
    icon: Brain,
    title: "Learning",
    description: "Exploring Vision Transformers",
    timestamp: "Currently",
  },
  {
    icon: Aperture,
    title: "OpenCV",
    description: "Improved contour detection pipeline",
    timestamp: "Yesterday",
  },
  {
    icon: GitPullRequest,
    title: "Open Source",
    description: "Merged a contribution",
    timestamp: "Last week",
  },
  {
    icon: TerminalIcon,
    title: "Portfolio",
    description: "Added interactive terminal",
    timestamp: "Just now",
  },
  {
    icon: Code2,
    title: "Projects",
    description: "Working on my Lyra programming language",
    timestamp: "In progress",
  },
];

const FIRST_DELAY_MS = 1000;
const SHOW_MS = 4000;
const GAP_MIN_MS = 3000;
const GAP_MAX_MS = 5000;

function randomGap() {
  return GAP_MIN_MS + Math.random() * (GAP_MAX_MS - GAP_MIN_MS);
}

function pickNextIndex(last: number | null) {
  if (NOTIFICATIONS.length <= 1) return 0;
  let idx = Math.floor(Math.random() * NOTIFICATIONS.length);
  while (idx === last) {
    idx = Math.floor(Math.random() * NOTIFICATIONS.length);
  }
  return idx;
}

export default function NotificationCenter() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);

  const lastIndexRef = useRef<number | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinnedRef = useRef(false);
  const armDismissRef = useRef<() => void>(() => {});

  useEffect(() => {
    pinnedRef.current = pinned;
  }, [pinned]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mount once: wire up the show/hide/schedule cycle via hoisted function
  // declarations so they can reference each other, and stash the latest
  // "arm dismiss" call in a ref so JSX handlers can trigger it.
  useEffect(() => {
    function clearDismiss() {
      if (dismissTimer.current) {
        clearTimeout(dismissTimer.current);
        dismissTimer.current = null;
      }
    }
    function clearNext() {
      if (nextTimer.current) {
        clearTimeout(nextTimer.current);
        nextTimer.current = null;
      }
    }
    function armDismiss() {
      clearDismiss();
      dismissTimer.current = setTimeout(() => {
        if (pinnedRef.current) return;
        hide();
      }, SHOW_MS);
    }
    function scheduleShow() {
      clearNext();
      nextTimer.current = setTimeout(() => {
        const idx = pickNextIndex(lastIndexRef.current);
        lastIndexRef.current = idx;
        setCurrentIndex(idx);
        armDismiss();
      }, randomGap());
    }
    function hide() {
      clearDismiss();
      setCurrentIndex(null);
      scheduleShow();
    }

    armDismissRef.current = armDismiss;

    const firstId = setTimeout(() => {
      const idx = pickNextIndex(lastIndexRef.current);
      lastIndexRef.current = idx;
      setCurrentIndex(idx);
      armDismiss();
    }, FIRST_DELAY_MS);

    return () => {
      clearTimeout(firstId);
      clearDismiss();
      clearNext();
    };
  }, []);

  const handleMouseEnter = () => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
  };

  const handleMouseLeave = () => {
    setPinned(false);
    if (currentIndex !== null) armDismissRef.current();
  };

  const handleClick = () => {
    setPinned(true);
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
  };

  const notification = currentIndex !== null ? NOTIFICATIONS[currentIndex] : null;
  const Icon = notification?.icon;

  return (
    <div className="pointer-events-none absolute top-3 right-3 z-30 sm:top-6 sm:right-6">
      <AnimatePresence>
        {notification && Icon && (
          <motion.div
            key={currentIndex}
            role="status"
            aria-live="polite"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 36, y: -8 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 36, y: -6 }}
            transition={
              reducedMotion
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 320, damping: 28 }
            }
            className="pointer-events-auto w-48 cursor-default rounded-xl border border-slate-700/50 bg-slate-900/70 px-2.5 py-2 shadow-2xl shadow-black/40 backdrop-blur-md sm:w-72 sm:px-3.5 sm:py-3"
          >
            <div className="flex items-start gap-2 sm:gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 sm:h-7 sm:w-7">
                <Icon className="h-3.5 w-3.5 sm:h-[14px] sm:w-[14px]" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[11px] font-semibold text-white sm:text-[13px]">
                  {notification.title}
                </p>
                <p className="mt-0.5 text-[10px] leading-snug text-slate-400 sm:text-xs">
                  {notification.description}
                </p>
                <p className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}