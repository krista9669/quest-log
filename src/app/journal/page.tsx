// app/blog/page.tsx
import PageHeader from "@/components/PageHeader";
import { SiMedium } from "react-icons/si";

export default function JournalPage() {
  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-24">
        <section className="rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-10 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60">
          <PageHeader
            className="mb-8 sm:mb-10"
            eyebrow="Blog"
            title="Journal"
            description="Research logs and progress notes for my latest quests."
          />

          <div className="space-y-6">
            <article
              id="dit"
              className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-6 sm:p-8 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95"
            >
              <time className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
                July 16, 2026
              </time>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Diffusion Transformer (DiT)
              </h2>
              <p className="mt-3 text-slate-300 leading-7">
                Today I explored DiT, a diffusion-transformer model that
                applies attention mechanisms inside a diffusion process. What
                fascinates me is how it combines generative diffusion with
                transformer structure to produce sharper, more coherent
                visual outputs.
              </p>
              <a
                href="https://paperswithcode.co/methods/diffusion-transformer-dit"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-cyan-200 transition hover:text-cyan-300"
              >
                Read the DiT paper on PaperswithCode
              </a>
            </article>

            <article
              id="opencv"
              className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-6 sm:p-8 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95"
            >
              <time className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
                June 05, 2026
              </time>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Optimizing an OpenCV Vision Pipeline
              </h2>
              <p className="mt-3 text-slate-300 leading-7">
                Every camera frame hides thousands of patterns. I&apos;ve been
                using OpenCV to uncover them — tracking movement, isolating
                objects, detecting features, and transforming raw pixels into
                meaningful information through real-time computer vision
                experiments.
              </p>
            </article>
          </div>

          <div className="mt-12 rounded-[1.75rem] border border-slate-700 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-8 sm:p-10 text-center transition hover:-translate-y-1 hover:border-cyan-400/40">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800/50 text-3xl text-slate-200">
              <SiMedium />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white">
              Beyond the Journal
            </h3>

            <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">
              On Medium, I write about life and the moments in between.
            </p>

            <a
              href="https://medium.com/@kwqish"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 sm:px-6 py-2.5 text-sm sm:text-base font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Visit My Medium
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}