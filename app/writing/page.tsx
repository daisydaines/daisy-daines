import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BackButton } from "@/components/BackButton";
import { getAllWritings } from "@/lib/writing";
import { poems } from "@/lib/data";
import { WritingList } from "@/components/WritingList";

export const metadata: Metadata = {
  title: "writing · daisydaines",
};

export default function WritingPage() {
  const inHouse = getAllWritings().map((w) => ({
    title: w.title,
    url: `/writing/${w.slug}`,
    date: w.dateDisplay,
    type: w.type,
  }));

  const inHouseTitles = new Set(getAllWritings({ includePrivate: true }).map((w) => w.title));
  const legacy = poems
    .filter((p) => !inHouseTitles.has(p.title))
    .map((p) => ({ title: p.title, url: p.url, date: p.date, type: "poem" as const }));

  const writings = [...inHouse, ...legacy];

  return (
    <main>
      <Nav />
      <div className="px-6 md:px-12 pt-32 pb-24 max-w-5xl mx-auto">
        <div className="mb-14">
          <BackButton href="/" />
        </div>

        <WritingList writings={writings} />
      </div>
      <Footer />
    </main>
  );
}
