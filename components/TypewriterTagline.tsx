"use client";

import { useState, useEffect } from "react";

const words = [
  "builder.",
  "poet.",
  "future dunker.",
  "developer.",
  "hyrox racer.",
  "writer.",
  "data enthusiast.",
];

const TYPING_MS = 75;
const DELETING_MS = 38;
const PAUSE_FULL = 1600;
const PAUSE_EMPTY = 180;

export function TypewriterTagline() {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

  useEffect(() => {
    const word = words[wordIdx];

    if (phase === "typing") {
      if (displayed.length < word.length) {
        const t = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          TYPING_MS
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), PAUSE_FULL);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), 80);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed((d) => d.slice(0, -1)),
          DELETING_MS
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("waiting");
      }, PAUSE_EMPTY);
      return () => clearTimeout(t);
    }

    if (phase === "waiting") {
      const t = setTimeout(() => setPhase("typing"), 80);
      return () => clearTimeout(t);
    }
  }, [displayed, wordIdx, phase]);

  return (
    <span className="font-mono text-lg md:text-xl text-foreground/50 tracking-tight">
      {displayed}
      <span
        className="inline-block w-[2px] h-[1.1em] bg-foreground/40 ml-0.5 align-middle"
        style={{ animation: "blink 1.1s step-end infinite" }}
      />
    </span>
  );
}
