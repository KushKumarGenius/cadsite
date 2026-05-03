"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function QuickFactsStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [minutes, setMinutes] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const id = requestAnimationFrame(() => {
        setMinutes(90);
      });
      return () => cancelAnimationFrame(id);
    }

    const targetMin = 90;
    const duration = 1600;

    const run = (nowStart: number) => {
      const tick = (now: number) => {
        const p = Math.min(1, (now - nowStart) / duration);
        const e = easeOutCubic(p);
        setMinutes(Math.round(e * targetMin));
        if (p < 1) requestAnimationFrame(tick);
        else {
          setMinutes(targetMin);
        }
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((en) => en.isIntersecting) || started.current) return;
        started.current = true;
        run(performance.now());
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-b border-[color:var(--border)] bg-[var(--brand-coral-soft)] py-12 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up motion-reduce:animate-none motion-reduce:delay-0 [animation-delay:90ms]">
          <p className="text-base font-semibold text-[var(--brand-burgundy)]">Quick facts</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            <div
              className="animate-scale-in motion-reduce:animate-none rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur-sm"
              style={{ animationDelay: "140ms" }}
            >
              <p className="text-base text-[var(--muted)]">Program dates</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-3xl">
                Jul 13–23
                <span className="text-lg font-medium text-[var(--muted)] sm:text-xl">, 2026</span>
              </p>
            </div>
            <div
              className="animate-scale-in motion-reduce:animate-none rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur-sm"
              style={{ animationDelay: "210ms" }}
            >
              <p className="text-base text-[var(--muted)]">Each session</p>
              <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-[var(--brand-burgundy-dark)] sm:text-3xl">
                {minutes}
                <span className="text-[var(--muted)]"> minutes</span>
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">Includes a break in the middle.</p>
            </div>
            <div
              className="animate-scale-in motion-reduce:animate-none rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur-sm"
              style={{ animationDelay: "280ms" }}
            >
              <p className="text-base text-[var(--muted)]">Meets</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-3xl">
                Mon–Thu
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
