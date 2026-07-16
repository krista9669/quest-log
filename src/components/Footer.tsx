import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { FaLinkedin} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-12 sm:mt-0">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 sm:gap-6 px-4 sm:px-8 py-6 sm:py-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-white">
            Quest-Log
          </h2>
          <p className="text-xs sm:text-base text-slate-400">
            By Krishitha ♡
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-lg text-slate-300">
          <Link href="/" className="hover:text-cyan-300 transition">
            Home
          </Link>

          <Link href="/about" className="hover:text-cyan-300 transition">
            About
          </Link>

          <Link href="/projects" className="hover:text-cyan-300 transition">
            Projects
          </Link>

          <Link href="/journal" className="hover:text-cyan-300 transition">
            Journal
          </Link>

          <Link href="/contact" className="hover:text-cyan-300 transition">
            Contact
          </Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/krista9669"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-300 transition"
          >
            <SiGithub size={32} />
          </a>

          <a
            href="https://www.linkedin.com/in/krishitha-k/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-300 transition"
          >
            <FaLinkedin size={32} />
          </a>

        </div>
      </div>

      <div className="py-4 text-center text-xs sm:text-base text-slate-500">
        @ Quest Log {new Date().getFullYear()}
      </div>
    </footer>
  );
}