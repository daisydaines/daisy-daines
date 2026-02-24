"use client";

import { useState } from "react";
import type { DayData, ActivityType } from "@/lib/activity";

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

// Full class strings — must be literals so Tailwind doesn't purge them
const palette: Record<ActivityType, string[]> = {
  code: [
    "bg-foreground/[0.06]",
    "bg-emerald-900/70",
    "bg-emerald-700/75",
    "bg-emerald-500/75",
    "bg-emerald-400/90",
  ],
  fitness: [
    "bg-foreground/[0.06]",
    "bg-amber-900/70",
    "bg-amber-700/75",
    "bg-amber-500/70",
    "bg-amber-400/85",
  ],
  writing: [
    "bg-foreground/[0.06]",
    "bg-violet-900/70",
    "bg-violet-700/75",
    "bg-violet-500/70",
    "bg-violet-400/85",
  ],
};

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

interface TooltipState {
  date: string;
  count: number;
  x: number;
  y: number;
}

interface Props {
  grid: DayData[][];
  type: ActivityType;
  total: number;
  noun: string; // "contribution" | "workout" | "entry"
}

export function ActivityGrid({ grid, type, total, noun }: Props) {
  const [tip, setTip] = useState<TooltipState | null>(null);
  const colors = palette[type];

  // Compute month labels — show on first week that contains the 1st of a month
  const monthLabels: { week: number; text: string }[] = [];
  let lastMonth = -1;
  grid.forEach((week, wi) => {
    for (const day of week) {
      if (day.count >= 0) {
        const d = new Date(day.date + "T12:00:00");
        if (d.getDate() <= 7 && d.getMonth() !== lastMonth) {
          monthLabels.push({ week: wi, text: MONTHS[d.getMonth()] });
          lastMonth = d.getMonth();
          break;
        }
      }
    }
  });

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {/* Day-of-week labels */}
        <div
          className="flex flex-col gap-[3px] shrink-0"
          style={{ paddingTop: 18 + GAP }}
        >
          {DAY_LABELS.map((label, i) => (
            <div
              key={i}
              className="flex items-center justify-end font-mono text-[9px] text-foreground/20 pr-1"
              style={{ width: 10, height: CELL }}
            >
              {i % 2 === 1 ? label : ""}
            </div>
          ))}
        </div>

        {/* Grid + month labels */}
        <div className="relative shrink-0">
          {/* Month label row */}
          <div className="relative h-[18px]">
            {monthLabels.map(({ week, text }) => (
              <span
                key={text}
                className="absolute bottom-0 font-mono text-[9px] text-foreground/25"
                style={{ left: week * STEP }}
              >
                {text}
              </span>
            ))}
          </div>

          {/* Cell columns */}
          <div className="flex gap-[3px]">
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => {
                  const future = day.count === -1;
                  const level = future ? 0 : getLevel(day.count);
                  return (
                    <div
                      key={di}
                      className={`rounded-[2px] ${colors[level]} ${future ? "opacity-0" : "cursor-default"}`}
                      style={{ width: CELL, height: CELL }}
                      onMouseEnter={(e) => {
                        if (!future)
                          setTip({ date: day.date, count: day.count, x: e.clientX, y: e.clientY });
                      }}
                      onMouseMove={(e) => {
                        if (tip) setTip((t) => t && { ...t, x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => setTip(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats line */}
      <p className="font-mono text-[11px] text-foreground/25 mt-3">
        {total} {total === 1 ? noun : `${noun}s`} in the last 91 days
      </p>

      {/* Floating tooltip */}
      {tip && (
        <div
          className="fixed z-50 pointer-events-none bg-card border border-border rounded-lg px-2.5 py-1.5 font-mono text-[10px] text-foreground/70 shadow-lg"
          style={{ left: tip.x + 14, top: tip.y - 36 }}
        >
          <span className="text-foreground/40">{tip.date}</span>
          {" · "}
          {tip.count === 0
            ? `no ${noun}s`
            : `${tip.count} ${tip.count === 1 ? noun : `${noun}s`}`}
        </div>
      )}
    </div>
  );
}
