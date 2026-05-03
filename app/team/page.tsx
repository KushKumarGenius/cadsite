import type { Metadata } from "next";
import { ContentCard } from "@/components/site/ContentCard";
import { TeamContactForm } from "@/components/site/TeamContactForm";

export const metadata: Metadata = {
  description: "Contact CAD Crew.",
};

const team = [
  "Shreyas Doke",
  "Elina Polavarapu",
  "Kushagr Kumar",
  "Krishna Batni",
] as const;

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-2xl border-b border-[color:var(--border)] pb-8">
        <p className="text-sm text-[var(--muted)]">Team</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-4xl">
          People
        </h1>
        <p className="mt-3 text-[var(--muted)]">The folks helping run CAD Crew.</p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((name) => (
          <ContentCard key={name} className="!p-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-coral-soft)] text-sm font-medium text-[var(--brand-burgundy-dark)]">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <p className="mt-4 font-medium text-[var(--brand-burgundy-dark)]">{name}</p>
          </ContentCard>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <ContentCard className="!p-5">
          <h2 className="font-medium text-[var(--brand-burgundy-dark)]">Email</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Questions? Say hi.</p>
          <a
            href="mailto:cadcrew30@gmail.com"
            className="mt-2 inline-block text-sm font-medium text-[var(--brand-coral)] hover:underline"
          >
            cadcrew30@gmail.com
          </a>
        </ContentCard>

        <TeamContactForm />
      </div>
    </div>
  );
}
