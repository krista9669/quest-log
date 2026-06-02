import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-24">
        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-6xl font-bold tracking-tight">Contact</h1>
        <p className="mb-8 sm:mb-10 max-w-5xl text-lg sm:text-2xl leading-7 sm:leading-9 text-gray-300">
          I’m always open to new opportunities and conversations.
          Reach out if you want to build something together.
        </p>

        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="rounded-2xl sm:rounded-3xl border border-gray-800 bg-white/5 p-5 sm:p-8">
            <h2 className="mb-3 text-xl sm:text-3xl font-semibold">Email</h2>
            <a href="mailto:krishithaaaa@gmail.com"
            className="text-sm sm:text-base text-gray-300 hover:text-violet-400 transition-colors">
                krishithaaaa@gmail.com
            </a>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-gray-800 bg-white/5 p-5 sm:p-8">
            <h2 className="mb-3 text-xl sm:text-3xl font-semibold">Social</h2>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base text-gray-300">
            <a  href="https://github.com/krista9669"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-400 transition-colors">
                GitHub
            </a>
            <a  href="https://www.linkedin.com/in/krishitha-k/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-400 transition-colors">
                LinkedIn
            </a>
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-gray-800 bg-white/5 p-5 sm:p-8">
            <h2 className="mb-3 text-xl sm:text-3xl font-semibold">Get in Touch</h2>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-300">Fill out the form and I'll get back to you as soon as possible</p>
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}
