export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-24">
        <section className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-900/90 p-6 sm:p-10 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-700/60">
            <div className="space-y-6">
            <div className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
                Under Construction
            </div>
            <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
                Quest Journal
                </h1>
                <p className="max-w-3xl text-base sm:text-xl leading-7 sm:leading-9 text-gray-400">
                A place for project stories, lessons learned, book notes and random ideas
                </p>
            </div>
            </div>
        </section>
      </main>
    </div>
  );
}