import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-3.5 lg:px-8">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-xs leading-snug text-[var(--muted)] sm:max-w-md sm:text-[13px]">
            <span className="font-semibold text-[var(--brand-burgundy-dark)]">CAD Crew</span> — Jul 13–23,
            2026 · Mon–Thu · 12–1:30 PM · Cupertino Library.
          </p>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-[var(--muted)] sm:gap-x-3 sm:text-[13px]">
            <Link
              href="/"
              className="inline-flex min-h-10 items-center rounded-lg px-2 transition-colors duration-200 hover:text-[var(--brand-burgundy-dark)]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-10 items-center rounded-lg px-2 transition-colors duration-200 hover:text-[var(--brand-burgundy-dark)]"
            >
              About
            </Link>
            <Link
              href="/team"
              className="inline-flex min-h-10 items-center rounded-lg px-2 transition-colors duration-200 hover:text-[var(--brand-burgundy-dark)]"
            >
              Team
            </Link>
            <Link
              href="/signup"
              className="inline-flex min-h-10 items-center rounded-lg px-2 transition-colors duration-200 hover:text-[var(--brand-burgundy-dark)]"
            >
              Sign up
            </Link>
            <a
              href="mailto:cadcrew30@gmail.com"
              className="inline-flex min-h-10 items-center rounded-lg px-2 font-medium text-[var(--brand-coral)] transition-colors duration-200 hover:text-[var(--brand-coral-hover)] hover:underline"
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
