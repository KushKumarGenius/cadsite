import type { Metadata } from "next";
import { SignUpForm } from "@/components/site/SignUpForm";
import { isSignupClosed } from "@/lib/signup";

export const metadata: Metadata = {
  description: "Sign up for CAD Crew.",
};

export default function SignUpPage() {
  const closed = isSignupClosed();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="border-b border-[color:var(--border)] pb-8">
        <p className="text-sm text-[var(--muted)]">Sign up</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-4xl">
          Join us
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          {closed ? (
            <>
              We&apos;ve reached capacity for{" "}
              <strong className="font-medium text-[var(--brand-burgundy-dark)]">July 13–23, 2026</strong>{" "}
              sessions at the{" "}
              <strong className="font-medium text-[var(--brand-burgundy-dark)]">Cupertino Library</strong>{" "}
              and aren&apos;t accepting new sign-ups.
            </>
          ) : (
            <>
              Program runs <strong className="font-medium text-[var(--brand-burgundy-dark)]">July 13–23, 2026</strong>
              , <strong className="font-medium text-[var(--brand-burgundy-dark)]">Mon–Thu</strong>,{" "}
              <strong className="font-medium text-[var(--brand-burgundy-dark)]">11:30–1:00 PM</strong> at the{" "}
              <strong className="font-medium text-[var(--brand-burgundy-dark)]">Cupertino Library</strong>{" "}
              (90-minute sessions with a break). Fill this out and we&apos;ll follow up by email.
            </>
          )}
        </p>
      </header>

      <div className="mt-10">
        <SignUpForm closed={closed} />
      </div>
    </div>
  );
}
