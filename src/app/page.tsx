"use client";

import { useEffect, useRef, useState } from "react";

// Real activity — swap these as you publish new entries
const LOG_ENTRIES = [
  {
    tag: "journal",
    text: "Diffusion Transformer notes published in the Journal",
    href: "/journal#dit",
  },
  {
    tag: "lab",
    text: "OpenCV pipeline experiments documented in the Journal",
    href: "/journal#opencv",
  },
];

const AVAILABLE_FOR_WORK = true;

// Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function Home() {
  const [needleAngle, setNeedleAngle] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [clock, setClock] = useState("");
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const compassRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickerRef = useRef<HTMLSpanElement>(null);
  const konamiIndex = useRef(0);

  useEffect(() => setMounted(true), []);

  // Respect prefers-reduced-motion throughout
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Live local time
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  // Konami code listener — secret quest unlock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const expected = KONAMI_SEQUENCE[konamiIndex.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        konamiIndex.current++;
        if (konamiIndex.current === KONAMI_SEQUENCE.length) {
          setEasterEggOpen(true);
          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Auto-dismiss the easter egg toast
  useEffect(() => {
    if (!easterEggOpen) return;
    const id = setTimeout(() => setEasterEggOpen(false), 8000);
    return () => clearTimeout(id);
  }, [easterEggOpen]);

  // Compass needle tracks the cursor
  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      const el = compassRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle =
        (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90;
      setNeedleAngle(angle);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  // Cursor-reactive constellation field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999 };
    const COUNT = 42;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
    }));

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      nodes.forEach((n) => {
        n.x = Math.random() * width;
        n.y = Math.random() * height;
      });
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(94, 234, 212, ${0.22 * (1 - dist / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        const dxm = nodes[i].x - mouse.x;
        const dym = nodes[i].y - mouse.y;
        const distm = Math.sqrt(dxm * dxm + dym * dym);
        if (distm < 180) {
          ctx.strokeStyle = `rgba(245, 185, 66, ${0.45 * (1 - distm / 180)})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    if (!reducedMotion) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [reducedMotion]);

  // Terminal-style typewriter ticker
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let entryIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      const entry = LOG_ENTRIES[entryIndex];
      const full = `${entry.tag} — ${entry.text}`;
      if (reducedMotion) {
        el.textContent = full;
        return;
      }
      if (!deleting) {
        charIndex++;
        el.textContent = full.slice(0, charIndex);
        if (charIndex === full.length) {
          deleting = false;
          timeout = setTimeout(() => {
            deleting = true;
            step();
          }, 1800);
          return;
        }
        timeout = setTimeout(step, 28);
      } else {
        charIndex--;
        el.textContent = full.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          entryIndex = (entryIndex + 1) % LOG_ENTRIES.length;
        }
        timeout = setTimeout(step, 14);
      }
    };
    step();
    return () => clearTimeout(timeout);
  }, [reducedMotion]);

  // Subtle 3D tilt on the CTA cards
  const handleTilt = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${y * -8}deg) rotateY(${
      x * 8
    }deg) scale(1.03)`;
  };
  const resetTilt = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const reveal = (delayMs: number) =>
    `transition-all duration-700 ease-out ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`;
  const revealStyle = (delayMs: number) => ({ transitionDelay: `${delayMs}ms` });

  return (
    <div className="min-h-[calc(100vh-192px)] text-white relative overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-95"
      />

      <main className="relative">
        <section className="flex min-h-[calc(100vh-192px)] flex-col items-center justify-center px-4 sm:px-6 text-center">
          {/* Eyebrow + literal compass needle */}
          <div
            className={`mb-5 flex items-center gap-3 ${reveal(0)}`}
            style={revealStyle(0)}
          >
            <div ref={compassRef} className="relative h-6 w-6 sm:h-7 sm:w-7 shrink-0">
              <svg viewBox="0 0 24 24" className="h-full w-full">
                <circle cx="12" cy="12" r="10.5" fill="none" stroke="rgba(94,234,212,0.35)" strokeWidth="1" />
                <g
                  style={{
                    transformOrigin: "12px 12px",
                    transform: `rotate(${needleAngle}deg)`,
                    transition: reducedMotion ? "none" : "transform 0.08s ease-out",
                  }}
                >
                  <path d="M12 4 L14.2 12 L12 20 L9.8 12 Z" fill="#5eead4" />
                  <path d="M12 4 L14.2 12 L12 12 Z" fill="#f5b942" />
                </g>
              </svg>
            </div>
            <p className="text-xs sm:text-base uppercase tracking-[0.4em] text-cyan-300">
              Curiosity is the compass
            </p>
          </div>

          {/* Personal intro line */}
          <p
            className={`mb-3 text-sm sm:text-lg text-slate-400 ${reveal(60)}`}
            style={revealStyle(60)}
          >
            Hi, I&apos;m <span className="text-white font-semibold">Krishitha</span> — 3rd-year CS
            student @ PES University
          </p>

          <h1
            className={`mb-5 text-4xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-tight transition-transform duration-300 hover:scale-[1.02] hover:text-cyan-300 ${reveal(120)}`}
            style={revealStyle(120)}
          >
            Quest-Log
          </h1>

          <p
            className={`mx-auto mb-6 max-w-3xl text-center text-sm sm:text-xl leading-7 sm:leading-9 text-slate-400 ${reveal(190)}`}
            style={revealStyle(190)}
          >
            A working record of what I&apos;m building, learning and investigating
          </p>

          {/* Terminal ticker */}
          <div
            className={`mb-10 w-full max-w-xl rounded-lg border border-slate-800 bg-black/30 px-4 py-3 text-left font-mono text-[11px] sm:text-sm text-slate-300 backdrop-blur-sm ${reveal(260)}`}
            style={revealStyle(260)}
          >
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-[10px] uppercase tracking-widest text-slate-500">
                latest.log
              </span>
            </div>
            <div className="min-h-[1.4em]">
              <span ref={tickerRef} />
              <span className="animate-pulse text-cyan-300">▍</span>
            </div>
          </div>

          <div
            className={`mt-2 flex flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto sm:flex-row sm:justify-center px-2 sm:px-0 ${reveal(330)}`}
            style={revealStyle(330)}
          >
            <a
              href="/journal"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="w-full sm:w-auto rounded-full bg-cyan-500 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold text-black transition-colors duration-300 hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              style={{ transition: "transform 0.15s ease, background-color 0.3s ease" }}
            >
              Read journal
            </a>
            <a
              href="/projects"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              className="w-full sm:w-auto rounded-full border border-slate-700 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold text-white transition-colors duration-300 hover:border-amber-300 hover:text-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              style={{ transition: "transform 0.15s ease, border-color 0.3s ease, color 0.3s ease" }}
            >
              View projects
            </a>
          </div>

          <div
            className={`mt-10 flex items-center gap-4 font-mono text-[11px] sm:text-xs text-slate-400 ${reveal(400)}`}
            style={revealStyle(400)}
          >
            <span className="flex items-center gap-1.5 text-slate-300">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  AVAILABLE_FOR_WORK ? "bg-emerald-400" : "bg-slate-500"
                }`}
              />
              {AVAILABLE_FOR_WORK ? "available for work" : "not currently available"}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">{clock || "--:--"} IST</span>
          </div>
        </section>
      </main>

      {/* Konami code reward: detective badge unlock */}
      {easterEggOpen && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-2xl border border-amber-400/40 bg-slate-950/95 p-5 shadow-2xl shadow-amber-500/10 backdrop-blur-md animate-[popIn_0.35s_ease]"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xl">🕵️</span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Quest Unlocked
            </p>
            <button
              onClick={() => setEasterEggOpen(false)}
              aria-label="Dismiss"
              className="ml-auto text-slate-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white mb-1">
            Achievement: Master Detective
          </p>
          <p className="text-xs sm:text-sm leading-6 text-slate-400">
            You found the secret code. Fun fact — I&apos;m weirdly good at piecing
            together true-crime mysteries. My detective success rate remains
            unverified.
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes popIn {
          from {
            opacity: 0;
            transform: translate(-50%, 12px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}