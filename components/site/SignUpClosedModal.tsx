"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export function SignUpClosedModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <button
        type="button"
        className="absolute inset-0 bg-[rgb(74_21_21/0.45)] backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-closed-title"
        className="animate-scale-in motion-reduce:animate-none relative max-h-[min(90dvh,100%)] w-full max-w-md overflow-y-auto overscroll-contain rounded-2xl border border-[color:var(--border)] bg-[var(--card)] p-6 shadow-[0_16px_48px_rgb(74_21_21/0.18)] sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--brand-coral-soft)] hover:text-[var(--brand-burgundy-dark)]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="text-sm font-medium text-[var(--muted)]">Sign-ups</p>
        <h2
          id="signup-closed-title"
          className="font-display mt-1 pr-8 text-2xl font-semibold text-[var(--brand-burgundy-dark)]"
        >
          Thanks for your consideration
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          We&apos;ve reached our capacity for this session and aren&apos;t able to accept more
          sign-ups right now. We&apos;re sorry — we wish we could take everyone!
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Questions?{" "}
          <Link
            href="/team"
            className="font-medium text-[var(--brand-coral)] underline-offset-2 hover:underline"
            onClick={onClose}
          >
            Reach out to our team
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex min-h-11 w-full touch-manipulation items-center justify-center rounded-full bg-[var(--brand-coral)] px-6 text-base font-medium text-white transition hover:bg-[var(--brand-coral-hover)]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
