// app/contact/page.tsx
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-24">
        <section className="rounded-[2rem] border border-slate-700 bg-slate-950/85 p-6 sm:p-10 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60">
          <PageHeader
            className="mb-8 sm:mb-10"
            eyebrow="Get in touch"
            title="Contact"
            description="I'm always open to new opportunities and conversations. Reach out if you want to build something together."
          />

          <div className="grid gap-6 sm:gap-8">
            <div className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-6 sm:p-8 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95">
              <h2 className="mb-3 text-xl sm:text-3xl font-semibold text-white">
                Email
              </h2>
              <a
                href="mailto:krishithaaaa@gmail.com"
                className="text-sm sm:text-base text-slate-300 hover:text-cyan-300 transition-colors"
              >
                krishithaaaa@gmail.com
              </a>
            </div>

            <div className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-6 sm:p-8 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95">
              <h2 className="mb-3 text-xl sm:text-3xl font-semibold text-white">
                Social
              </h2>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-slate-300">
                <a
                  href="https://github.com/krista9669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/krishitha-k/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-300 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-6 sm:p-8 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/95">
              <h2 className="mb-3 text-xl sm:text-3xl font-semibold text-white">
                Get in Touch
              </h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-slate-300">
                Fill out the form and I&apos;ll get back to you as soon as
                possible.
              </p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}