"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="animate-fade-in motion-reduce:animate-none sticky top-0 z-50 border-b border-[color:var(--border)] bg-white/90 backdrop-blur-md transition-[box-shadow,background-color] duration-500 supports-[backdrop-filter]:bg-white/75 hover:shadow-[0_8px_30px_rgb(74_21_21/0.06)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-xl py-0.5 pr-2 transition-transform duration-300 active:scale-[0.98]"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/cadcrew-logo.png"
            alt="CAD Crew"
            width={200}
            height={64}
            className="h-9 max-h-10 w-auto max-w-[min(200px,58vw)] origin-left object-contain object-left transition-transform duration-300 ease-out group-hover:scale-[1.04] sm:h-11 sm:max-w-[200px]"
            priority
            sizes="(max-width: 640px) 58vw, 200px"
          />
          <span className="hidden flex-col items-start text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--brand-burgundy-dark)] sm:flex">
            <span className="text-base font-medium text-[var(--brand-burgundy-dark)]">CAD Crew</span>
            <span className="text-xs font-normal">Jul 13–23 · Mon–Thu</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-11 min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl border border-[color:var(--border)] text-[var(--brand-burgundy-dark)] transition-all duration-200 hover:border-[var(--brand-coral-muted)] hover:bg-[var(--brand-coral-soft)] active:scale-95 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            href="/signup"
            className="hidden rounded-full bg-[var(--brand-coral)] px-5 py-2.5 text-base font-semibold text-white shadow-[0_4px_14px_rgb(255_94_94/0.35)] transition-all duration-200 hover:scale-[1.04] hover:bg-[var(--brand-coral-hover)] hover:shadow-[0_6px_20px_rgb(255_94_94/0.4)] active:scale-[0.98] md:inline-flex"
            onClick={() => setOpen(false)}
          >
            Sign up
          </Link>
        </div>

        <nav
          className={cn(
            "order-3 flex w-full basis-full flex-col gap-1 border-t border-[color:var(--border)] pt-3 md:order-none md:flex md:w-auto md:basis-auto md:flex-row md:items-center md:gap-1 md:border-0 md:pt-0",
            open ? "animate-fade-in-up motion-reduce:animate-none flex" : "hidden md:flex",
          )}
        >
          {links.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "relative rounded-xl px-3 py-2.5 text-base transition-colors duration-200 md:py-2",
                  "after:pointer-events-none after:absolute after:bottom-1.5 after:left-3 after:right-3 after:h-0.5 after:origin-left after:rounded-full after:bg-[var(--brand-coral)] after:transition-transform after:duration-300 after:ease-out md:after:bottom-1",
                  active
                    ? "font-semibold text-[var(--brand-burgundy-dark)] after:scale-x-100"
                    : "text-[var(--muted)] after:scale-x-0 hover:text-[var(--brand-burgundy-dark)] hover:after:scale-x-100",
                )}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/signup"
            className="rounded-xl px-3 py-2.5 text-base font-semibold text-[var(--brand-coral)] transition-colors duration-200 hover:bg-[var(--brand-coral-soft)] md:hidden"
            onClick={() => setOpen(false)}
          >
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
