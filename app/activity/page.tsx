import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { BackButton } from "@/components/BackButton";
import { Footer } from "@/components/Footer";
import { ActivityGrid } from "@/components/ActivityGrid";
import {
  buildGrid,
  fetchGitHubActivity,
  getFitnessActivity,
} from "@/lib/activity";
import { getAllWritings } from "@/lib/writing";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "activity · daisydaines",
  description: "code, fitness, and writing activity.",
};

const WEEKS = 13;

export default async function ActivityPage() {
  const writingData = getAllWritings().map((w) => ({ date: w.date, count: 1 }));
  const [githubData, fitnessData] = await Promise.all([
    fetchGitHubActivity(),
    Promise.resolve(getFitnessActivity()),
  ]);

  const codeGrid = buildGrid(githubData, WEEKS);
  const fitnessGrid = buildGrid(fitnessData, WEEKS);
  const writingGrid = buildGrid(writingData, WEEKS);

  const codeTotal = githubData.reduce((sum, d) => sum + d.count, 0);
  const fitnessTotal = fitnessData.length;
  const writingTotal = writingData.length;

  return (
    <main>
      <Nav />

      <div className="px-6 md:px-12 pt-32 pb-24 max-w-5xl mx-auto">
        <div className="mb-14">
          <BackButton />
        </div>

        {/* Page title */}
        <h1 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-14">
          activity
        </h1>

        {/* Code */}
        <section className="mb-14">
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
              code
            </h2>
            <a
              href="https://github.com/daisydaines"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-foreground/20 hover:text-foreground/50 transition-colors"
            >
              github.com/daisydaines ↗
            </a>
          </div>
          {githubData.length > 0 ? (
            <ActivityGrid
              grid={codeGrid}
              type="code"
              total={codeTotal}
              noun="contribution"
            />
          ) : (
            <div className="font-mono text-[11px] text-foreground/20">
              add GITHUB_TOKEN to env to load real data
            </div>
          )}
        </section>

        {/* Fitness */}
        <section className="mb-14">
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
              fitness
            </h2>
            <span className="font-mono text-[10px] text-foreground/20">
              via fitbod
            </span>
          </div>
          <ActivityGrid
            grid={fitnessGrid}
            type="fitness"
            total={fitnessTotal}
            noun="exercise"
          />
        </section>

        {/* Writing */}
        <section className="mb-14">
          <div className="flex items-baseline gap-3 mb-5">
            <h2 className="font-mono text-xs text-foreground/30 uppercase tracking-widest">
              writing
            </h2>
            <a
              href="https://daisydaines.wordpress.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-foreground/20 hover:text-foreground/50 transition-colors"
            >
              a boy named daisy ↗
            </a>
          </div>
          <ActivityGrid
            grid={writingGrid}
            type="writing"
            total={writingTotal}
            noun="entry"
          />
        </section>
      </div>

      <Footer />
    </main>
  );
}
