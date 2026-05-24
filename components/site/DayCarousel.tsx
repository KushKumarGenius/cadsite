"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const swiped = useRef(false);
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
    if (paused) return;
    const id = window.setInterval(() => {
      if (reducedMotion.current) return;
      setIndex((i) => (i + 1) % SLIDE_COUNT);
    }, 5500);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const active = sessions[index];

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <div
      className="mt-6 space-y-4"
      role="region"
      aria-label="Day by day schedule"
      aria-roledescription="carousel"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) resume();
      }}
      onTouchStart={pause}
      onTouchEnd={resume}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[var(--card)] shadow-[0_1px_2px_rgb(74_21_21/0.04)]">
        <div
          className="flex touch-pan-y transition-transform duration-500 will-change-transform motion-reduce:transition-none"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transitionTimingFunction: ease,
          }}
          onTouchStart={(e) => {
            swiped.current = false;
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const x = e.changedTouches[0].clientX;
            const d = touchX.current - x;
            touchX.current = null;
            if (d > 40) {
              swiped.current = true;
              go(1);
            } else if (d < -40) {
              swiped.current = true;
              go(-1);
            }
          }}
        >
          {sessions.map((s, i) => (
            <button
              key={s.key}
              type="button"
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
              onClick={() => {
                if (swiped.current) {
                  swiped.current = false;
                  return;
                }
                go(1);
              }}
              className="flex w-full shrink-0 cursor-pointer flex-col justify-center px-5 py-6 text-left touch-manipulation sm:px-8 sm:py-8"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--brand-coral)]">
                Day {i + 1} of {SLIDE_COUNT}
              </p>
              <p className="mt-2 text-xl font-semibold text-[var(--brand-burgundy-dark)] sm:text-2xl">
                {s.headline}
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--muted)] sm:text-lg">{s.body}</p>
              <p className="mt-4 text-xs text-[var(--muted)] sm:hidden">Tap card or swipe for next day</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous day"
          onClick={() => go(-1)}
          className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl border border-[color:var(--border)] bg-white text-[var(--brand-burgundy-dark)] shadow-sm transition-all duration-200 hover:border-[var(--brand-coral-muted)] hover:bg-[var(--brand-coral-soft)] active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-center text-sm font-medium tabular-nums text-[var(--brand-burgundy-dark)]">
            Day {index + 1} of {SLIDE_COUNT}
          </p>
          <div className="mt-2 flex justify-center gap-1.5 overflow-x-auto px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {sessions.map((s, i) => (
              <button
                key={s.key}
                type="button"
                aria-label={`Go to ${s.headline}`}
                aria-current={i === index || undefined}
                onClick={() => setIndex(i)}
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out",
                  i === index
                    ? "bg-[var(--brand-coral-soft)]"
                    : "hover:bg-[var(--brand-coral-soft)]/60",
                )}
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-300 ease-out",
                    i === index
                      ? "h-2.5 w-7 bg-[var(--brand-coral)]"
                      : "h-2 w-2 bg-[color:var(--border)]",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next day"
          onClick={() => go(1)}
          className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl border border-[color:var(--border)] bg-white text-[var(--brand-burgundy-dark)] shadow-sm transition-all duration-200 hover:border-[var(--brand-coral-muted)] hover:bg-[var(--brand-coral-soft)] active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {active.headline}: {active.body}
      </p>
    </div>
  );
}
