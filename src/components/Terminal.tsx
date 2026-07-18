"use client";

import { useEffect, useRef, useState } from "react";

type Output =
  | { kind: "text"; lines: string[] }
  | { kind: "table"; rows: [string, string][] };

const GITHUB_URL = "https://github.com/krista9669";
const LINKEDIN_URL = "https://www.linkedin.com/in/krishitha-k/"

const HELP_ROWS: [string, string][] = [
  ["whoami", "who I am"],
  ["current", "what I'm doing now"],
  ["projects", "things I've built"],
  ["contact", "get in touch"],
  ["github", "open my GitHub"],
  ["linkedin", "open my LinkedIn"],
  ["clr", "clear the terminal"],
];

const COMMAND_OUTPUT: Record<string, Output> = {
  help: { kind: "table", rows: HELP_ROWS },
  whoami: {
    kind: "text",
    lines: [
      "Hi, I'm Krishitha.",
      "3rd CSE student @ PES University.",
    ],
  },
  current: {
    kind: "text",
    lines: [
      "Currently working on",
      "• Open source contributions",
      "• Learning diffusion models",
      "• Building personal projects",
    ],
  },
  projects: {
    kind: "text",
    lines: [
      "✓ Regulus VS Code Theme",
      "✓ Quest-Log",
      "✓ OpenCV Vision Pipeline",
      "✓ F1 Analytics",
      "✓ CardioTwin",
      "✓ ML Basics",
    ],
  },
  contact: {
    kind: "text",
    lines: [
      "Email     krishithaaaa@gmail.com",
      "GitHub    krista9669",
      "LinkedIn  linkedin.com/in/krishitha-k",
    ],
  },
  github: {
    kind: "text",
    lines: ["Opening GitHub...", `→ ${GITHUB_URL.replace("https://", "")}`],
  },
  linkedin: {
    kind: "text",
    lines: ["Opening LinkedIn...", `→ ${LINKEDIN_URL.replace("https://", "")}`],
  },
};

const PROMPT = "krishitha@quest-log:~$";
const CHAR_MS = 32;
const LINE_MS = 150;

function outputLength(output: Output) {
  return output.kind === "table" ? output.rows.length : output.lines.length;
}

function OutputLine({ output, index }: { output: Output; index: number }) {
  if (output.kind === "table") {
    const [cmd, desc] = output.rows[index];
    return (
      <div className="grid grid-cols-[5.5rem_1fr] gap-2 sm:grid-cols-[6rem_1fr]">
        <span className="text-cyan-300">{cmd}</span>
        <span className="text-slate-400">{desc}</span>
      </div>
    );
  }
  return (
    <div className="whitespace-pre-wrap text-slate-400">
      {output.lines[index]}
    </div>
  );
}

type Block = { id: number; command: string; output: Output };

export default function Terminal() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [liveCommand, setLiveCommand] = useState<string | null>(null);
  const [liveOutput, setLiveOutput] = useState<Output | null>(null);
  const [typedChars, setTypedChars] = useState(0);
  const [revealedLines, setRevealedLines] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "revealing">("idle");
  const [inputValue, setInputValue] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [blocks, typedChars, revealedLines]);

  const isBusy = phase !== "idle";

  useEffect(() => {
    if (!isBusy) inputRef.current?.focus();
  }, [isBusy]);

  const schedule = (fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timeouts.current.push(id);
  };

  const finishClear = () => {
    setBlocks([]);
    setLiveCommand(null);
    setLiveOutput(null);
    setTypedChars(0);
    setRevealedLines(0);
    setPhase("idle");
  };

  const revealOutput = (cmd: string, output: Output) => {
    setPhase("revealing");
    const total = outputLength(output);
    let j = 0;
    const step = () => {
      j++;
      setRevealedLines(j);
      if (j < total) {
        schedule(step, LINE_MS);
      } else {
        schedule(() => {
          setBlocks((prev) => [...prev, { id: nextId.current++, command: cmd, output }]);
          setLiveCommand(null);
          setLiveOutput(null);
          setTypedChars(0);
          setRevealedLines(0);
          setPhase("idle");
            if (cmd === "github") {
            window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
            }
            if (cmd === "linkedin") {
            window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
            }
        }, 260);
      }
    };
    step();
  };

  const runCommand = (raw: string, opts?: { simulate?: boolean }) => {
    if (phase !== "idle") return;
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    const simulate = opts?.simulate ?? true;

    if (cmd === "clr") {
      if (reducedMotion || !simulate) {
        finishClear();
        return;
      }
      setLiveCommand("clr");
      setLiveOutput(null);
      setTypedChars(0);
      setPhase("typing");
      let i = 0;
      const typeStep = () => {
        i++;
        setTypedChars(i);
        if (i < "clr".length) {
          schedule(typeStep, CHAR_MS);
        } else {
          schedule(finishClear, 220);
        }
      };
      schedule(typeStep, CHAR_MS);
      return;
    }

    const output: Output = COMMAND_OUTPUT[cmd] ?? {
      kind: "text",
      lines: [`command not found: ${cmd}`, "type 'help' to see available commands"],
    };

    if (reducedMotion) {
    setBlocks((prev) => [...prev, { id: nextId.current++, command: cmd, output }]);
    if (cmd === "github") {
        window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
    }
    if (cmd === "linkedin") {
        window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
    }
    return;
    }


    if (!simulate) {
      // Typed live by the visitor — the command text is already on screen,
      // so jump straight to revealing the output.
      setLiveCommand(cmd);
      setLiveOutput(output);
      setTypedChars(cmd.length);
      setRevealedLines(0);
      revealOutput(cmd, output);
      return;
    }

    setLiveCommand(cmd);
    setLiveOutput(output);
    setTypedChars(0);
    setRevealedLines(0);
    setPhase("typing");

    let i = 0;
    const typeStep = () => {
      i++;
      setTypedChars(i);
      if (i < cmd.length) {
        schedule(typeStep, CHAR_MS);
      } else {
        schedule(() => revealOutput(cmd, output), 180);
      }
    };
    typeStep();
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (isBusy) return;
    const value = inputValue;
    setInputValue("");
    runCommand(value, { simulate: false });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-slate-800 bg-black/30 backdrop-blur-sm shadow-[0_0_30px_-12px_rgba(94,234,212,0.3)]">
      {/* scanlines + noise overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(rgba(255,255,255,0.6) 0px, transparent 1px, transparent 2px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.9) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative z-20 px-3.5 sm:px-4 py-2 sm:py-2.5">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-[9px] uppercase tracking-widest text-slate-500">
            krishitha — zsh
          </span>
        </div>

        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          onClick={() => inputRef.current?.focus()}
          className="terminal-scroll max-h-32 sm:max-h-40 overflow-y-auto pr-1 text-left font-mono text-[10px] sm:text-xs leading-relaxed text-slate-300"
        >
          {blocks.map((block) => (
            <div key={block.id} className="mb-2">
              {block.command !== "clr" && (
                <div>
                  <span className="text-cyan-300">{PROMPT}</span>{" "}
                  <span className="text-slate-200">{block.command}</span>
                </div>
              )}
              {block.command === "help" && (
                <div className="mb-0.5 text-[9px] uppercase tracking-widest text-slate-600">
                  commands
                </div>
              )}
              {Array.from({ length: outputLength(block.output) }).map((_, idx) => (
                <OutputLine key={idx} output={block.output} index={idx} />
              ))}
            </div>
          ))}

          {liveCommand !== null && (
            <div className="mb-2">
              <div>
                <span className="text-cyan-300">{PROMPT}</span>{" "}
                <span className="text-slate-200">
                  {liveCommand.slice(0, typedChars)}
                </span>
                {phase === "typing" && (
                  <span className="animate-pulse text-cyan-300">▍</span>
                )}
              </div>
              {phase === "revealing" && liveOutput && liveCommand === "help" && (
                <div className="mb-0.5 text-[9px] uppercase tracking-widest text-slate-600">
                  commands
                </div>
              )}
              {phase === "revealing" &&
                liveOutput &&
                Array.from({ length: revealedLines }).map((_, idx) => (
                  <OutputLine key={idx} output={liveOutput} index={idx} />
                ))}
            </div>
          )}

          {!isBusy && (
            <div className="flex items-center">
              <span className="shrink-0 text-cyan-300">{PROMPT}</span>
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleSubmit}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="type 'help' to begin"
                aria-label="Terminal command input"
                className="ml-2 min-w-0 flex-1 border-none bg-transparent font-mono text-[10px] text-slate-200 outline-none caret-cyan-300 placeholder:text-slate-600 sm:text-xs"
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .terminal-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(94, 234, 212, 0.25) transparent;
        }
        .terminal-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(94, 234, 212, 0.25);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}