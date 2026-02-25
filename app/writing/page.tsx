import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { getAllWritings } from "@/lib/writing";
import { poems } from "@/lib/data";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "writing · daisydaines",
};

export default function WritingPage() {
  const inHouse = getAllWritings().map((w) => ({
    title: w.title,
    url: `/writing/${w.slug}`,
    date: w.dateDisplay,
  }));

  const inHouseTitles = new Set(getAllWritings({ includePrivate: true }).map((w) => w.title));
  const legacy = poems
    .filter((p) => !inHouseTitles.has(p.title))
    .map((p) => ({ title: p.title, url: p.url, date: p.date }));

  const writings = [...inHouse, ...legacy];

  return (
    <main>
      <Nav />
      <div className="px-6 md:px-12 pt-32 pb-24 max-w-5xl mx-auto">
        <div className="mb-14">
          <BackButton />
        </div>

        <h1 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-10">
          writing
        </h1>

        <ul className="border-t border-border">
          {writings.map((w) => {
            const isExternal = w.url.startsWith("http");
            return (
              <li key={w.url} className="border-b border-border">
                <Link
                  href={w.url}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
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
      </div>
      <Footer />
    </main>
  );
}
