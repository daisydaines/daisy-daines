"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { books } from "@/lib/data";
import { BookRow } from "@/components/BookRow";

const PREVIEW_COUNT = 3;

export function Reading() {
  if (books.length === 0) return null;

  return (
    <section id="reading" className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-2">
          reading
        </h2>
        <p className="text-sm text-foreground/30 mb-10">
          books that shaped how i think.
        </p>

        <ul className="border-t border-border">
          {books.slice(0, PREVIEW_COUNT).map((b, i) => (
            <motion.li
              key={b.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="border-b border-border"
            >
              <BookRow book={b} />
            </motion.li>
          ))}
        </ul>

        {books.length > PREVIEW_COUNT && (
          <Link
            href="/reading"
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            <span>→</span> see all {books.length}
          </Link>
        )}
      </motion.div>
    </section>
  );
}
