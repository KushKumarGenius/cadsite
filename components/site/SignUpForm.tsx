"use client";

import Link from "next/link";
import { useState } from "react";
import { ContentCard } from "@/components/site/ContentCard";
import { SignUpClosedModal } from "@/components/site/SignUpClosedModal";

const fieldClass =
  "mt-1.5 w-full min-h-11 rounded-md border border-[color:var(--border)] px-3 py-2.5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--brand-coral-muted)] focus:ring-2 focus:ring-[color:rgba(255,94,94,0.25)]";

const textareaClass =
  "mt-1.5 w-full resize-y rounded-md border border-[color:var(--border)] px-3 py-2.5 text-base text-[var(--foreground)] outline-none transition focus:border-[var(--brand-coral-muted)] focus:ring-2 focus:ring-[color:rgba(255,94,94,0.25)]";

export function SignUpForm({ closed = false }: { closed?: boolean }) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(closed);
  const [showClosedModal, setShowClosedModal] = useState(closed);

  if (limitReached) {
    return (
      <>
        {showClosedModal ? (
          <SignUpClosedModal onClose={() => setShowClosedModal(false)} />
        ) : null}
        <ContentCard>
          <h2 className="text-lg font-medium text-[var(--brand-burgundy-dark)]">
            Sign-ups are full
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Thanks for your consideration — we&apos;ve reached our capacity for this session and
            aren&apos;t accepting more sign-ups. We&apos;re sorry we can&apos;t take everyone this
            time.
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Questions?{" "}
            <Link
              href="/team"
              className="font-medium text-[var(--brand-coral)] underline-offset-2 hover:underline"
            >
              Contact our team
            </Link>
            .
          </p>
        </ContentCard>
      </>
    );
  }

  if (done) {
    return (
      <ContentCard>
        <h2 className="text-lg font-medium text-[var(--brand-burgundy-dark)]">You&apos;re on the list</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Thanks — we got your sign-up and we&apos;ll follow up by email.
        </p>
      </ContentCard>
    );
  }

  return (
    <ContentCard>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const form = e.currentTarget;
          const fd = new FormData(form);
          const payload = {
            studentName: String(fd.get("studentName") ?? "").trim(),
            parentName: String(fd.get("parentName") ?? "").trim(),
            grade: String(fd.get("grade") ?? "").trim(),
            email: String(fd.get("email") ?? "").trim(),
            priorCadKnowledge: String(fd.get("priorCadKnowledge") ?? "").trim(),
            why: String(fd.get("why") ?? "").trim(),
          };

          setSubmitting(true);
          try {
            const res = await fetch("/api/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { ok?: boolean; error?: string; closed?: boolean };
            if (res.status === 403 && data.closed) {
              setLimitReached(true);
              setShowClosedModal(true);
              return;
            }
            if (!res.ok || !data.ok) {
              setError(data.error ?? "Something went wrong. Try again.");
              return;
            }
            setDone(true);
            form.reset();
          } catch {
            setError("Could not send. Check your connection and try again.");
          } finally {
            setSubmitting(false);
          }
        }}
        className="grid gap-6 sm:grid-cols-2"
      >
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-[var(--brand-burgundy-dark)]">Student name</span>
          <input
            required
            name="studentName"
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-[var(--brand-burgundy-dark)]">Parent / guardian name</span>
          <input
            required
            name="parentName"
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-[var(--brand-burgundy-dark)]">Grade</span>
          <select
            required
            name="grade"
            className={`${fieldClass} bg-white`}
          >
            <option value="">Select grade</option>
            <option>3rd</option>
            <option>4th</option>
            <option>5th</option>
            <option>6th</option>
            <option>7th</option>
            <option>8th</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-[var(--brand-burgundy-dark)]">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-[var(--brand-burgundy-dark)]">
            Any prior experience with CAD?
          </span>
          <span className="mt-0.5 block text-xs text-[var(--muted)]">
            Totally fine if none — we just want to know where everyone&apos;s starting from.
          </span>
          <textarea
            name="priorCadKnowledge"
            rows={3}
            placeholder="e.g. Tinkercad at school, none yet, etc."
            className={textareaClass}
          />
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-[var(--brand-burgundy-dark)]">Why join? (a sentence is fine)</span>
          <textarea
            required
            name="why"
            rows={4}
            className={textareaClass}
          />
        </label>

        {error ? (
          <p className="sm:col-span-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-11 touch-manipulation items-center justify-center rounded-full bg-[var(--brand-coral)] px-8 py-2.5 text-base font-medium text-white transition hover:bg-[var(--brand-coral-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Submit"}
          </button>
        </div>
      </form>
    </ContentCard>
  );
}
