import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-xs leading-snug text-[var(--muted)] sm:max-w-md sm:text-[13px]">
            <span className="font-semibold text-[var(--brand-burgundy-dark)]">CAD Crew</span> — Jul 13–23,
            2026 · Mon–Thu · library.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)] sm:text-[13px]">
            <Link
              href="/"
              className="rounded-lg px-1 transition-colors duration-200 hover:text-[var(--brand-burgundy-dark)]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-1 transition-colors duration-200 hover:text-[var(--brand-burgundy-dark)]"
            >
              About
            </Link>
            <Link
              href="/team"
              className="rounded-lg px-1 transition-colors duration-200 hover:text-[var(--brand-burgundy-dark)]"
            >
              Team
            </Link>
            <Link
              href="/signup"
              className="rounded-lg px-1 transition-colors duration-200 hover:text-[var(--brand-burgundy-dark)]"
            >
              Sign up
            </Link>
            <a
              href="mailto:cadcrew30@gmail.com"
              className="font-medium text-[var(--brand-coral)] transition-colors duration-200 hover:text-[var(--brand-coral-hover)] hover:underline"
            >
              cadcrew30@gmail.com
            </a>
          </div>
        </div>
        <p className="mt-1.5 text-[11px] leading-none text-[var(--muted)]">
          © {new Date().getFullYear()} CAD Crew
        </p>
      </div>
    </footer>
  );
}
