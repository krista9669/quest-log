export default function Home() {
  return (
    <div className="min-h-[calc(100vh-192px)] text-white">
      <main>
        <section className="flex min-h-[calc(100vh-192px)] flex-col items-center justify-center px-4 sm:px-6 text-center">
          <p className="mb-4 text-xs sm:text-base uppercase tracking-[0.4em] text-cyan-300">
            Curiosity is the compass
          </p>

          <h1 className="mb-6 text-4xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-tight">
            Quest-Log
          </h1>

          <p className="mx-auto mb-8 max-w-5xl text-center text-sm sm:text-2xl leading-6 sm:leading-10 text-gray-300">
            Quest-Log is my personal record of exploration, learning and creation
            <br />
            A place where projects, ideas, side quests and lessons learned come together
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto sm:flex-row sm:justify-center px-2 sm:px-0">
            <a
              href="/about"
              className="w-full sm:w-auto rounded-full bg-cyan-500 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold text-black transition hover:bg-cyan-400"
            >
              Learn more
            </a>
            <a
              href="/projects"
              className="w-full sm:w-auto rounded-full border border-gray-700 px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-semibold text-white transition hover:border-white hover:text-white"
            >
              See projects
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}