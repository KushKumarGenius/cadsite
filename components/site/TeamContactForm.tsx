"use client";

import { useState } from "react";
import { ContentCard } from "@/components/site/ContentCard";

export function TeamContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <ContentCard className="!p-5">
        <p className="text-sm text-[var(--muted)]">Thanks — we got your message.</p>
      </ContentCard>
    );
  }

  return (
    <ContentCard className="!p-5">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          const form = e.currentTarget;
          const fd = new FormData(form);
          const payload = {
            name: String(fd.get("name") ?? "").trim(),
            message: String(fd.get("message") ?? "").trim(),
          };

          setSubmitting(true);
          try {
            const res = await fetch("/api/team-contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const data = (await res.json()) as { ok?: boolean; error?: string };
            if (!res.ok || !data.ok) {
              setError(data.error ?? "Something went wrong. Try again.");
              return;
            }
            setSent(true);
            form.reset();
          } catch {
            setError("Could not send. Check your connection and try again.");
          } finally {
            setSubmitting(false);
          }
        }}
        className="space-y-3"
      >
        <label className="block text-sm">
          <span className="text-[var(--muted)]">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-[color:var(--border)] px-3 py-2 text-[var(--foreground)] outline-none transition focus:border-[var(--brand-coral-muted)] focus:ring-2 focus:ring-[color:rgba(255,94,94,0.2)]"
          />
        </label>
        <label className="block text-sm">
          <span className="text-[var(--muted)]">Message</span>
          <textarea
            required
            name="message"
            rows={3}
            className="mt-1 w-full resize-y rounded-lg border border-[color:var(--border)] px-3 py-2 text-[var(--foreground)] outline-none transition focus:border-[var(--brand-coral-muted)] focus:ring-2 focus:ring-[color:rgba(255,94,94,0.2)]"
          />
        </label>

        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-[var(--brand-coral)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--brand-coral-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send"}
        </button>
      </form>
    </ContentCard>
  );
}
