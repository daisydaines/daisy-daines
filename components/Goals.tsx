"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { goals, lifts, liftsMetadata } from "@/lib/data";

function useHyroxCountdown(raceDate: string, trainingStart: string) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const race = new Date(raceDate).getTime();
    const start = new Date(trainingStart).getTime();
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const nowMs = now.getTime();

    const totalSpan = race - start;
    const elapsed = nowMs - start;
    const remaining = Math.max(0, Math.ceil((race - nowMs) / (1000 * 60 * 60 * 24)));

    setDaysLeft(remaining);
    setProgress(Math.min(100, Math.max(0, (elapsed / totalSpan) * 100)));
  }, [raceDate, trainingStart]);

  return { daysLeft, progress };
}

function ProgressBar({
  current,
  target,
  color = "bg-foreground/25",
}: {
  current: number;
  target: number;
  color?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const pct = Math.min(100, (current / target) * 100);

  return (
    <div ref={ref} className="w-full h-1 bg-foreground/8 rounded-full overflow-hidden mt-3">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}

export function Goals() {
  const { daysLeft, progress } = useHyroxCountdown(
    goals.hyrox.raceDate,
    goals.hyrox.trainingStart
  );

  return (
    <section id="goals" className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-8">
          fitness
        </h2>

        {/* Three main goal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {/* Hyrox */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
            className="p-5 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
                hyrox
              </span>
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-amber-400"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                <span className="font-mono text-[10px] text-amber-400/70">
                  training
                </span>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-mono text-2xl font-semibold text-foreground/80">
                {daysLeft ?? "—"}
              </span>
              <span className="font-mono text-sm text-foreground/40">days</span>
              <span className="font-mono text-xs text-foreground/25 ml-1">
                until race day
              </span>
            </div>
            <p className="font-mono text-[11px] text-foreground/25">
              {goals.hyrox.raceDateDisplay} · {goals.hyrox.raceLocation}
            </p>
            <div className="w-full h-1 bg-foreground/8 rounded-full overflow-hidden mt-3">
              <motion.div
                className="h-full rounded-full bg-amber-400/50"
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Body fat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="p-5 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
                body fat
              </span>
              <span className="font-mono text-[10px] text-emerald-400/70 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                on track
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-mono text-2xl font-semibold text-foreground/80">
                {goals.bodyFat.current}
              </span>
              <span className="font-mono text-sm text-foreground/40">%</span>
              <span className="font-mono text-xs text-foreground/25 ml-1">
                / &lt;{goals.bodyFat.target}% target
              </span>
            </div>
            <p className="font-mono text-[11px] text-foreground/25">
              last dexa: {goals.bodyFat.lastMeasured} · next:{" "}
              {goals.bodyFat.nextScan}
            </p>
            {/* bar: 13.3% on a 0-20% scale */}
            <div className="w-full h-1 bg-foreground/8 rounded-full overflow-hidden mt-3 relative">
              {/* target line at 15/20 = 75% */}
              <div
                className="absolute top-0 bottom-0 w-px bg-emerald-400/40 z-10"
                style={{ left: "75%" }}
              />
              <motion.div
                className="h-full rounded-full bg-emerald-400/40"
                initial={{ width: 0 }}
                whileInView={{ width: `${(13.3 / 20) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Dunk */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="p-5 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
                dunk
              </span>
              <span className="font-mono text-[10px] text-violet-400/70 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                in progress
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-mono text-2xl font-semibold text-foreground/80">
                {goals.dunk.current}
              </span>
              <span className="font-mono text-sm text-foreground/40">&quot;</span>
              <span className="font-mono text-xs text-foreground/25 ml-1">
                / {goals.dunk.target}" needed
              </span>
            </div>
            <p className="font-mono text-[11px] text-foreground/25">
              need +{goals.dunk.target - goals.dunk.current} inches · vertical jump
            </p>
            <ProgressBar
              current={goals.dunk.current}
              target={goals.dunk.target}
              color="bg-violet-400/50"
            />
          </motion.div>
        </div>

        {/* Lifts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-5 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
              lifts
            </h3>
            <span className="font-mono text-[10px] text-foreground/20">
              {liftsMetadata.currentDate}{" "}
              <span className="text-foreground/15">vs</span>{" "}
              {liftsMetadata.previousDate}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lifts.map((lift) => {
              const delta =
                lift.value !== null && lift.previous !== null
                  ? lift.value - lift.previous
                  : null;
              return (
                <div key={lift.label}>
                  <p className="font-mono text-[10px] text-foreground/25 uppercase tracking-wider mb-1">
                    {lift.label}
                  </p>
                  {lift.value !== null ? (
                    <>
                      <p className="font-mono text-lg font-medium text-foreground/70">
                        {lift.value}
                        <span className="text-xs text-foreground/30 ml-0.5">
                          {lift.unit}
                        </span>
                      </p>
                      {delta !== null && (
                        <p
                          className={`font-mono text-[11px] mt-0.5 ${
                            delta > 0
                              ? "text-emerald-400/70"
                              : delta < 0
                              ? "text-red-400/70"
                              : "text-foreground/25"
                          }`}
                        >
                          {delta > 0 ? `+${delta}` : delta === 0 ? "—" : delta}
                          {delta !== 0 && (
                            <span className="text-foreground/20 ml-0.5">
                              {lift.unit}
                            </span>
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="font-mono text-lg font-medium text-foreground/20">
                      —
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
