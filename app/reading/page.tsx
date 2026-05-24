import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { BookRow } from "@/components/BookRow";
import { books } from "@/lib/data";

export const metadata: Metadata = {
  title: "reading · daisydaines",
};

export default function ReadingPage() {
  return (
    <main>
      <Nav />
      <div className="px-6 md:px-12 pt-32 pb-24 max-w-5xl mx-auto">
        <div className="mb-14">
          <BackButton />
        </div>

        <h1 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-2">
          reading
        </h1>
        <p className="text-sm text-foreground/30 mb-10">
          books that shaped how i think.
        </p>

        {books.length === 0 ? (
          <p className="font-mono text-xs text-foreground/25">coming soon.</p>
        ) : (
          <ul className="border-t border-border">
            {books.map((b) => (
              <li key={b.title} className="border-b border-border">
                <BookRow book={b} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </main>
  );
}
