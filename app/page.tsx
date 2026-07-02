import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentCard } from "@/components/site/ContentCard";
import { QuickFactsStrip } from "@/components/site/QuickFactsStrip";
import { DayCarousel } from "@/components/site/DayCarousel";

const explore = [
  {
    href: "/about",
    title: "About",
    desc: "What CAD Crew is and who it is for.",
  },
  {
    href: "/team",
    title: "Team",
    desc: "Who runs things and how to say hi.",
  },
  {
    href: "/signup",
    title: "Sign up",
    desc: "Save a spot for your student.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="border-b border-[color:var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="animate-fade-in-up motion-reduce:animate-none">
            <p className="text-base font-medium text-[var(--muted)]">
              Grades 3–8 · Cupertino Library · Jul 13–23, 2026
            </p>
            <h1 className="font-display mt-4 break-words text-4xl font-semibold tracking-tight text-[var(--brand-burgundy-dark)] min-[420px]:text-5xl sm:text-6xl lg:text-7xl">
              CAD Crew
            </h1>
            <p className="mt-5 max-w-2xl break-words text-lg leading-relaxed text-[var(--muted)] min-[420px]:text-xl sm:text-2xl sm:leading-relaxed">
              A relaxed, hands-on CAD and design class — draw, build a little, and present something
              you care about. Summer{" "}
              <strong className="font-semibold text-[var(--brand-burgundy-dark)]">July 13–23, 2026</strong>
              , meeting <strong className="font-semibold text-[var(--brand-burgundy-dark)]">Mon–Thu</strong>{" "}
              — each session is{" "}
              <strong className="font-semibold text-[var(--brand-burgundy-dark)]">12–1:30 PM</strong>{" "}
              at the <strong className="font-semibold text-[var(--brand-burgundy-dark)]">Cupertino Library</strong>{" "}
              (90 minutes with a break in the middle).
            </p>
            <div className="mt-10 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:gap-4">
              <Link
                href="/signup"
                className="inline-flex h-12 w-full touch-manipulation items-center justify-center rounded-full bg-[var(--brand-coral)] px-8 text-base font-semibold text-white shadow-[0_6px_20px_rgb(255_94_94/0.35)] transition-all duration-200 hover:scale-[1.03] hover:bg-[var(--brand-coral-hover)] hover:shadow-[0_10px_28px_rgb(255_94_94/0.42)] active:scale-[0.98] min-[420px]:w-auto"
              >
                Sign up
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 w-full touch-manipulation items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-8 text-base font-semibold text-[var(--brand-burgundy-dark)] transition-all duration-200 hover:scale-[1.03] hover:border-[var(--brand-coral-muted)] hover:bg-[var(--brand-coral-soft)] active:scale-[0.98] min-[420px]:w-auto"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuickFactsStrip />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6 sm:py-16 lg:space-y-20 lg:px-8 lg:py-20">
        <section className="animate-fade-in-up motion-reduce:animate-none grid gap-8 [animation-delay:120ms] lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-base font-medium text-[var(--muted)]">Overview</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-4xl">
              What we do
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ContentCard>
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                We get together, pick a problem that matters to kids, sketch ideas, and work toward a
                simple project you can show at the end. No fancy gear required — just curiosity and a
                willingness to try.
              </p>
            </ContentCard>
          </div>
        </section>

        <section className="animate-fade-in-up motion-reduce:animate-none grid gap-6 [animation-delay:180ms] lg:grid-cols-2">
          <ContentCard>
            <p className="text-base font-medium text-[var(--muted)]">Goals</p>
            <p className="mt-3 text-lg leading-relaxed text-[var(--brand-burgundy-dark)]">
              Hands-on CAD and product design for 3rd–8th graders at the Cupertino Library — July 13–23, 2026,
              Mon–Thu, 12–1:30 PM. Big on creativity and keeping things understandable.
            </p>
          </ContentCard>
          <ContentCard>
            <p className="text-base font-medium text-[var(--muted)]">Schedule</p>
            <dl className="mt-3 space-y-3 text-base">
              <div className="flex flex-col gap-1 border-b border-[color:var(--border)] pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-[var(--muted)]">Dates</dt>
                <dd className="font-medium text-[var(--brand-burgundy-dark)] sm:text-right">Jul 13–23, 2026</dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-[color:var(--border)] pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-[var(--muted)]">Time</dt>
                <dd className="font-medium text-[var(--brand-burgundy-dark)] sm:text-right">12–1:30 PM</dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-[color:var(--border)] pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-[var(--muted)]">Where</dt>
                <dd className="font-medium text-[var(--brand-burgundy-dark)] sm:text-right">Cupertino Library</dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-[color:var(--border)] pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-[var(--muted)]">Sessions</dt>
                <dd className="font-medium text-[var(--brand-burgundy-dark)] sm:text-right">
                  90 min + break
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <dt className="text-[var(--muted)]">Days</dt>
                <dd className="font-medium text-[var(--brand-burgundy-dark)] sm:text-right">Mon–Thu</dd>
              </div>
            </dl>
          </ContentCard>
        </section>

        <section className="animate-fade-in-up motion-reduce:animate-none [animation-delay:220ms]">
          <p className="text-base font-medium text-[var(--muted)]">Day by day</p>
          <h2 className="font-display mt-2 text-3xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-4xl">
            What each session might look like
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[var(--muted)]">
            Eight meeting days — Monday through Thursday, July 13–23, 2026 (weekends off). Swipe or tap
            to flip through, or let it autoplay.
          </p>
          <DayCarousel />
        </section>

        <section className="animate-fade-in-up motion-reduce:animate-none border-t border-[color:var(--border)] pt-12 [animation-delay:300ms]">
          <p className="text-base font-medium text-[var(--muted)]">More</p>
          <h2 className="font-display mt-2 text-3xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-4xl">
            Other pages
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {explore.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group animate-scale-in motion-reduce:animate-none flex flex-col justify-between rounded-2xl border border-[color:var(--border)] bg-white p-6 shadow-[0_2px_8px_rgb(74_21_21/0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--brand-coral-muted)] hover:shadow-[0_12px_32px_rgb(143_45_45/0.12)] motion-reduce:hover:translate-y-0"
                style={{ animationDelay: `${340 + i * 80}ms` }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-[var(--brand-burgundy-dark)]">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">{item.desc}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-base font-semibold text-[var(--brand-coral)] transition-transform duration-200 group-hover:translate-x-1">
                  Go
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
