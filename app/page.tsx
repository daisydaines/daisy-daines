import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Writing } from "@/components/Writing";
import { Reading } from "@/components/Reading";
import { Goals } from "@/components/Goals";
import { Footer } from "@/components/Footer";
import { getAllWritings } from "@/lib/writing";
import { poems } from "@/lib/data";

export default async function Home() {
  const inHouse = getAllWritings().map((w) => ({
    title: w.title,
    url: `/writing/${w.slug}`,
    date: w.dateDisplay,
  }));

  // WordPress poems that haven't been migrated in-house yet (include private to suppress their legacy entries)
  const inHouseTitles = new Set(getAllWritings({ includePrivate: true }).map((w) => w.title));
  const legacy = poems
    .filter((p) => !inHouseTitles.has(p.title))
    .map((p) => ({ title: p.title, url: p.url, date: p.date }));

  const writings = [...inHouse, ...legacy];

  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <Writing writings={writings} />
      <Reading />
      <Goals />
      <Footer />
    </main>
  );
}
