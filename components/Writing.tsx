"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export interface WritingEntry {
  title: string;
  url: string;
  date?: string;
}

const PREVIEW_COUNT = 3;

export function Writing({ writings }: { writings: WritingEntry[] }) {
  return (
    <section id="writing" className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-2">
          writing
        </h2>
        <p className="text-sm text-foreground/30 mb-10">
          <Link href="/writing" className="underline underline-offset-2 hover:text-foreground/60 transition-colors">a boy named daisy</Link>
          {" "}| dips, dabbles and dives.
        </p>

        <ul className="border-t border-border">
          {writings.slice(0, PREVIEW_COUNT).map((w, i) => (
            <motion.li
              key={w.url}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="border-b border-border"
            >
              <WritingRow entry={w} />
            </motion.li>
          ))}
        </ul>

        {writings.length > PREVIEW_COUNT && (
          <Link
            href="/writing"
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            <span>→</span> see all {writings.length}
          </Link>
        )}
      </motion.div>
    </section>
  );
}

function WritingRow({ entry }: { entry: WritingEntry }) {
  const isExternal = entry.url.startsWith("http");

  return (
    <Link
      href={entry.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-between py-4 hover:pl-1 transition-all duration-150"
    >
      <span
        className="text-foreground/70 group-hover:text-foreground transition-colors leading-snug"
        style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
      >
        {entry.title}
      </span>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        {entry.date && (
          <span className="font-mono text-xs text-foreground/25">{entry.date}</span>
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
  );
}
