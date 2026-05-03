"use client";

import { useState } from "react";
import { ContentCard } from "@/components/site/ContentCard";

export function TeamContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <ContentCard className="!p-5">
      {sent ? (
        <p className="text-sm text-[var(--muted)]">Sent! (Demo — not wired to email yet.)</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <label className="block text-sm">
            <span className="text-[var(--muted)]">Name</span>
            <input
              required
              name="name"
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
          <button
            type="submit"
            className="rounded-full bg-[var(--brand-coral)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--brand-coral-hover)]"
          >
            Send
          </button>
        </form>
      )}
    </ContentCard>
  );
}
