import fs from "fs";
import path from "path";

export interface DayData {
  date: string; // YYYY-MM-DD
  count: number; // -1 = future, 0 = no activity, >0 = count
}

export type ActivityType = "code" | "fitness" | "writing";

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

/**
 * Build a numWeeks×7 grid starting from the Sunday `numWeeks` ago.
 * Future cells get count = -1.
 */
export function buildGrid(data: DayData[], numWeeks: number): DayData[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toDateStr(today);

  // Start from Sunday of the week that is (numWeeks-1) weeks ago
  const start = new Date(today);
  start.setDate(start.getDate() - today.getDay() - (numWeeks - 1) * 7);

  const map = new Map(data.map((d) => [d.date, d.count]));
  const grid: DayData[][] = [];

  for (let w = 0; w < numWeeks; w++) {
    const week: DayData[] = [];
    for (let d = 0; d < 7; d++) {
      const cell = new Date(start);
      cell.setDate(cell.getDate() + w * 7 + d);
      const ds = toDateStr(cell);
      week.push({ date: ds, count: ds > todayStr ? -1 : (map.get(ds) ?? 0) });
    }
    grid.push(week);
  }

  return grid;
}

/** Fetch real GitHub contribution data via GraphQL */
export async function fetchGitHubActivity(): Promise<DayData[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  const now = new Date();
  const from = new Date(now);
  from.setMonth(from.getMonth() - 7);

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          user(login: "daisydaines") {
            contributionsCollection(
              from: "${from.toISOString()}"
              to: "${now.toISOString()}"
            ) {
              contributionCalendar {
                weeks {
                  contributionDays { date contributionCount }
                }
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const json = await res.json();
    const weeks =
      json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

    return weeks.flatMap(
      (w: { contributionDays: { date: string; contributionCount: number }[] }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
    );
  } catch {
    return [];
  }
}

/**
 * Real fitness data from Fitbod export (data/WorkoutExport.csv).
 * count = number of unique exercises logged that day (drives shade intensity).
 * Replace the CSV file and redeploy — no code changes needed.
 */
export function getFitnessActivity(): DayData[] {
  try {
    const csvPath = path.join(process.cwd(), "data", "WorkoutExport.csv");
    const csv = fs.readFileSync(csvPath, "utf8");
    const lines = csv.trim().split("\n").slice(1);
    const exercises = new Map<string, Set<string>>();
    for (const line of lines) {
      const cols = line.split(",");
      const rawDate = cols[0]?.trim().replace(/"/g, "");
      const exercise = cols[1]?.trim().replace(/"/g, "");
      const date = rawDate?.split(" ")[0];
      if (date && /^\d{4}-\d{2}-\d{2}$/.test(date) && exercise) {
        if (!exercises.has(date)) exercises.set(date, new Set());
        exercises.get(date)!.add(exercise);
      }
    }
    return Array.from(exercises.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, set]) => ({ date, count: set.size }));
  } catch {
    return [];
  }
}

