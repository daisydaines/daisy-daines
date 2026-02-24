"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { poems } from "@/lib/data";

const PREVIEW_COUNT = 3;

export function Writing() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? poems : poems.slice(0, PREVIEW_COUNT);

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
          from{" "}
          <Link
            href="https://daisydaines.wordpress.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/50 hover:text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/50 transition-colors"
          >
            a boy named daisy
          </Link>
          {" "}— dips, dabbles, and dives.
        </p>

        <ul className="border-t border-border">
          {/* Always-visible top 3 */}
          {poems.slice(0, PREVIEW_COUNT).map((poem, i) => (
            <motion.li
              key={poem.url}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="border-b border-border"
            >
              <PoemRow poem={poem} />
            </motion.li>
          ))}

          {/* Expandable remainder */}
          <AnimatePresence initial={false}>
            {showAll &&
              poems.slice(PREVIEW_COUNT).map((poem, i) => (
                <motion.li
                  key={poem.url}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, delay: i * 0.04, ease: "easeOut" }}
                  className="border-b border-border overflow-hidden"
                >
                  <PoemRow poem={poem} />
                </motion.li>
              ))}
          </AnimatePresence>
        </ul>

        {/* Toggle button */}
        <button
          onClick={() => setShowAll((s) => !s)}
          className="mt-5 font-mono text-xs text-foreground/30 hover:text-foreground/60 transition-colors flex items-center gap-1.5 group cursor-pointer"
        >
          <span
            className={`inline-block transition-transform duration-200 ${showAll ? "rotate-90" : ""}`}
          >
            →
          </span>
          {showAll ? "show less" : `see all ${poems.length}`}
        </button>
      </motion.div>
    </section>
  );
}

function PoemRow({ poem }: { poem: { title: string; url: string; date?: string } }) {
  return (
    <Link
      href={poem.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between py-4 hover:pl-1 transition-all duration-150"
    >
      <span
        className="text-foreground/70 group-hover:text-foreground transition-colors leading-snug"
        style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
      >
        {poem.title}
      </span>
      <div className="flex items-center gap-3 shrink-0 ml-4">
        {poem.date && (
          <span className="font-mono text-xs text-foreground/25">{poem.date}</span>
        )}
        <ArrowUpRight
          size={13}
          className="text-foreground/20 group-hover:text-foreground/50 transition-colors"
        />
      </div>
    </Link>
  );
}
