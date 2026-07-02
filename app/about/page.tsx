import type { Metadata } from "next";
import { ContentCard } from "@/components/site/ContentCard";

export const metadata: Metadata = {
  description: "What CAD Crew is.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-2xl border-b border-[color:var(--border)] pb-8">
        <p className="text-sm text-[var(--muted)]">About</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-4xl">
          CAD Crew
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Design and making for kids — summer{" "}
          <strong className="text-[var(--brand-burgundy-dark)]">July 13–23, 2026</strong>, meeting{" "}
          <strong className="text-[var(--brand-burgundy-dark)]">Monday through Thursday</strong>,{" "}
          <strong className="text-[var(--brand-burgundy-dark)]">12–1:30 PM</strong> at the{" "}
          <strong className="text-[var(--brand-burgundy-dark)]">Cupertino Library</strong>. Sessions are{" "}
          <strong className="text-[var(--brand-burgundy-dark)]">90 minutes</strong> with a break in the middle.
        </p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <ContentCard className="!p-5 lg:h-full">
          <h2 className="font-medium text-[var(--brand-burgundy-dark)]">What it is</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            A chill intro to CAD and product design for elementary and middle schoolers. We talk,
            sketch, and build a little — no experience needed.
          </p>
        </ContentCard>
        <ContentCard className="!p-5 lg:h-full">
          <h2 className="font-medium text-[var(--brand-burgundy-dark)]">What we care about</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Being creative, figuring stuff out, and feeling okay sharing rough ideas. Mistakes are
            normal.
          </p>
        </ContentCard>
        <ContentCard className="!p-5 lg:h-full">
          <h2 className="font-medium text-[var(--brand-burgundy-dark)]">Who can join</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            <strong className="text-[var(--brand-burgundy-dark)]">3rd–8th graders</strong>. If you
            like drawing or building things, you&apos;ll probably fit right in.
          </p>
        </ContentCard>
      </div>

      <ContentCard className="mt-8 !p-5">
        <h2 className="font-medium text-[var(--brand-burgundy-dark)]">Why bother</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Getting a taste of design early helps kids notice problems around them and think “I could
          try to fix that.” We keep it concrete and fun.
        </p>
      </ContentCard>
    </div>
  );
}
