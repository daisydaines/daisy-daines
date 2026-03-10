"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

type WritingItem = {
  title: string;
  url: string;
  date?: string;
  type: "poem" | "journal";
};

type Filter = "all" | "journal" | "poems";

const SCROLL_KEY = "writing-list-scroll";

export function WritingList({ writings }: { writings: WritingItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved) {
      window.scrollTo(0, parseInt(saved, 10));
      sessionStorage.removeItem(SCROLL_KEY);
    }
  }, []);

  const filtered =
    filter === "all"
      ? writings
      : filter === "journal"
      ? writings.filter((w) => w.type === "journal")
      : writings.filter((w) => w.type === "poem");

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
          writing
        </h1>
        <div className="flex gap-4">
          {(["all", "journal", "poems"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs tracking-widest cursor-pointer transition-colors ${
                filter === f
                  ? "text-foreground"
                  : "text-foreground/25 hover:text-foreground/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <ul className="border-t border-border">
        {filtered.map((w) => {
          const isExternal = w.url.startsWith("http");
          return (
            <li key={w.url} className="border-b border-border">
              <Link
                href={w.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onClick={() => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))}
                className="group flex items-center justify-between py-4 hover:pl-1 transition-all duration-150"
              >
                <span
                  className="text-foreground/70 group-hover:text-foreground transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
                >
                  {w.title}
                </span>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {w.date && (
                    <span className="font-mono text-xs text-foreground/25">
                      {w.date}
                    </span>
                  )}
                  {isExternal ? (
                    <ArrowUpRight
                      size={13}
                      className="text-foreground/20 group-hover:text-foreground/50 transition-colors"
                    />
                  ) : (
                    <ArrowRight
                      size={13}
                      className="text-foreground/20 group-hover:text-foreground/50 transition-colors"
                    />
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
