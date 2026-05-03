"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/cn";

/** Program days (Mon–Thu only), Jul 13–23, 2026 — copy is editable anytime */
const sessions = [
  {
    key: "2026-07-13",
    headline: "Mon · Jul 13",
    body: "Kickoff — pick a real problem, brainstorm, and say who it helps.",
  },
  {
    key: "2026-07-14",
    headline: "Tue · Jul 14",
    body: "Sketch ideas and messy first drafts. Nothing polished yet.",
  },
  {
    key: "2026-07-15",
    headline: "Wed · Jul 15",
    body: "CAD warm-up: tools, basics, and trying stuff without worrying.",
  },
  {
    key: "2026-07-16",
    headline: "Thu · Jul 16",
    body: "Turn sketches toward something buildable — tiny milestones.",
  },
  {
    key: "2026-07-20",
    headline: "Mon · Jul 20",
    body: "Mid-program check-in: what’s working, what to change.",
  },
  {
    key: "2026-07-21",
    headline: "Tue · Jul 21",
    body: "Iterate on your project — ask questions, fix snags.",
  },
  {
    key: "2026-07-22",
    headline: "Wed · Jul 22",
    body: "Polish for show-and-tell — prep how you’ll explain it.",
  },
  {
    key: "2026-07-23",
    headline: "Thu · Jul 23",
    body: "Share what you made — celebrate and swap feedback.",
  },
] as const;

const SLIDE_COUNT = sessions.length;
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

export function DayCarousel() {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const touchY = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const onChange = () => {
      reducedMotion.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => (i + dir + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    if (hover) return;
    const id = window.setInterval(() => {
      if (reducedMotion.current) return;
      setIndex((i) => (i + 1) % SLIDE_COUNT);
    }, 5500);
    return () => window.clearInterval(id);
  }, [hover]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const pct = (100 / SLIDE_COUNT) * index;

  return (
    <div
      className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-5"
      role="region"
      aria-label="Day by day schedule"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative h-[18rem] flex-1 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgb(74_21_21/0.04)] sm:h-[19rem]">
        <div
          className="flex flex-col transition-transform duration-500 will-change-transform motion-reduce:transition-none"
          style={{
            transform: `translateY(-${pct}%)`,
            transitionTimingFunction: ease,
          }}
          onTouchStart={(e) => {
            touchY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touchY.current == null) return;
            const y = e.changedTouches[0].clientY;
            const d = touchY.current - y;
            touchY.current = null;
            if (d > 48) go(1);
            else if (d < -48) go(-1);
          }}
        >
          {sessions.map((s, i) => (
            <div
              key={s.key}
              className="flex h-[18rem] shrink-0 flex-col justify-center px-6 py-7 sm:h-[19rem] sm:px-8"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--brand-coral)]">
                Day {i + 1} of {SLIDE_COUNT}
              </p>
              <p className="mt-2 text-xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-2xl">
                {s.headline}
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--muted)] sm:text-lg">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[var(--card)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[var(--card)] to-transparent" />
      </div>

      <div className="flex flex-row items-center justify-center gap-2 sm:flex-col sm:justify-between sm:py-1">
        <button
          type="button"
          aria-label="Previous day"
          onClick={() => go(-1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[color:var(--border)] bg-white text-[var(--brand-burgundy-dark)] shadow-sm transition-all duration-200 hover:border-[var(--brand-coral-muted)] hover:bg-[var(--brand-coral-soft)] active:scale-95 sm:h-10 sm:w-10"
        >
          <ChevronUp className="h-5 w-5" />
        </button>

        <div className="flex max-h-[11rem] flex-row flex-wrap justify-center gap-1.5 overflow-y-auto py-1 sm:max-h-none sm:flex-col sm:gap-2 sm:overflow-visible">
          {sessions.map((s, i) => (
            <button
              key={s.key}
              type="button"
              aria-label={`Go to ${s.headline}`}
              aria-current={i === index || undefined}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 shrink-0 rounded-full transition-all duration-300 ease-out sm:h-2 sm:w-2",
                i === index
                  ? "w-8 bg-[var(--brand-coral)] sm:h-8 sm:w-2"
                  : "w-2 bg-[color:var(--border)] hover:bg-[var(--brand-coral-muted)] sm:w-2",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next day"
          onClick={() => go(1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[color:var(--border)] bg-white text-[var(--brand-burgundy-dark)] shadow-sm transition-all duration-200 hover:border-[var(--brand-coral-muted)] hover:bg-[var(--brand-coral-soft)] active:scale-95 sm:h-10 sm:w-10"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
