"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  const linkClass = (href: string) =>
    isActive(href)
      ? "rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-cyan-200 transition hover:bg-cyan-500/15 hover:text-white"
      : "transition hover:text-white";

  return (
    <nav className="border-b border-slate-800 bg-slate-950/95 px-3 sm:px-8 py-4 sm:py-6 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 sm:gap-8">
        <div>
          <Link
            href="/"
            className="text-lg sm:text-3xl font-semibold text-white transition hover:text-cyan-300"
          >
            Quest-Log
          </Link>

          <p className="mt-1 text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-400">
            Personal portfolio
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-xl font-medium text-slate-300">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>
          <Link href="/projects" className={linkClass("/projects")}>
            Projects
          </Link>
          <Link href="/blog" className={linkClass("/blog")}>
            Blog
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}