export interface DayData {
  date: string; // YYYY-MM-DD
  count: number; // -1 = future, 0 = no activity, >0 = count
}

export type ActivityType = "code" | "fitness" | "writing";

function toDateStr(d: Date): string {
  return d.toISOString().split("T")[0];
}

/** Deterministic hash for a date string — used for stable placeholder data */
function hashDate(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
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
 * Placeholder fitness data — deterministic based on date hash.
 * Replace with parseFitbodCSV() when you drop in a real export.
 * Workout days: Mon, Tue, Thu, Fri, Sat (~82% hit rate per day)
 */
export function getFitnessActivity(): DayData[] {
  const data: DayData[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setMonth(start.getMonth() - 7);

  const workoutDays = new Set([1, 2, 4, 5, 6]); // Mon Tue Thu Fri Sat
  const cur = new Date(start);
  while (cur <= today) {
    const ds = toDateStr(cur);
    if (workoutDays.has(cur.getDay())) {
      const h = hashDate(ds);
      if (h % 100 > 18) {
        data.push({ date: ds, count: (h % 4) + 1 });
      }
    }
    cur.setDate(cur.getDate() + 1);
  }
  return data;
}

/**
 * Parse a Fitbod CSV export into DayData[].
 * Drop your export in public/fitbod.csv — import and pass the string here.
 * Expected columns: Date,Exercise Name,Reps,Sets,...
 */
export function parseFitbodCSV(csv: string): DayData[] {
  const lines = csv.trim().split("\n").slice(1); // skip header
  const counts = new Map<string, number>();
  for (const line of lines) {
    const date = line.split(",")[0]?.trim().replace(/"/g, "");
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      counts.set(date, (counts.get(date) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries()).map(([date, count]) => ({ date, count }));
}

/**
 * Placeholder writing data — sparse, deterministic.
 * ~18% of days show activity.
 */
export function getWritingActivity(): DayData[] {
  const data: DayData[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setMonth(start.getMonth() - 7);

  const cur = new Date(start);
  while (cur <= today) {
    const ds = toDateStr(cur);
    if (hashDate(ds) % 100 > 82) {
      data.push({ date: ds, count: 1 });
    }
    cur.setDate(cur.getDate() + 1);
  }
  return data;
}
