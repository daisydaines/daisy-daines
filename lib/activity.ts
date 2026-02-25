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
 * Real fitness data from Fitbod export (WorkoutExport.csv).
 * count = number of unique exercises logged that day (drives shade intensity).
 */
export function getFitnessActivity(): DayData[] {
  return [
  { date: "2024-03-15", count: 5 },
  { date: "2024-03-18", count: 5 },
  { date: "2024-03-19", count: 4 },
  { date: "2024-03-20", count: 6 },
  { date: "2024-03-23", count: 7 },
  { date: "2024-03-25", count: 6 },
  { date: "2024-03-26", count: 5 },
  { date: "2024-03-27", count: 4 },
  { date: "2024-03-28", count: 4 },
  { date: "2024-03-29", count: 6 },
  { date: "2024-03-30", count: 7 },
  { date: "2024-04-01", count: 5 },
  { date: "2024-04-02", count: 6 },
  { date: "2024-04-03", count: 7 },
  { date: "2024-04-04", count: 5 },
  { date: "2024-04-05", count: 6 },
  { date: "2024-04-06", count: 7 },
  { date: "2024-04-08", count: 5 },
  { date: "2024-04-09", count: 4 },
  { date: "2024-04-10", count: 6 },
  { date: "2024-04-11", count: 6 },
  { date: "2024-04-12", count: 5 },
  { date: "2024-04-13", count: 6 },
  { date: "2024-04-15", count: 5 },
  { date: "2024-04-16", count: 6 },
  { date: "2024-04-17", count: 5 },
  { date: "2024-04-18", count: 6 },
  { date: "2024-04-19", count: 7 },
  { date: "2024-04-20", count: 4 },
  { date: "2024-04-22", count: 4 },
  { date: "2024-04-23", count: 5 },
  { date: "2024-04-24", count: 5 },
  { date: "2024-04-25", count: 5 },
  { date: "2024-04-30", count: 5 },
  { date: "2024-05-01", count: 5 },
  { date: "2024-05-02", count: 4 },
  { date: "2024-05-03", count: 5 },
  { date: "2024-05-06", count: 6 },
  { date: "2024-05-07", count: 5 },
  { date: "2024-05-08", count: 6 },
  { date: "2024-05-09", count: 7 },
  { date: "2024-05-10", count: 8 },
  { date: "2024-05-11", count: 8 },
  { date: "2024-05-13", count: 5 },
  { date: "2024-05-14", count: 7 },
  { date: "2024-05-15", count: 6 },
  { date: "2024-05-16", count: 8 },
  { date: "2024-05-17", count: 6 },
  { date: "2024-05-18", count: 7 },
  { date: "2024-05-21", count: 6 },
  { date: "2024-05-22", count: 6 },
  { date: "2024-05-23", count: 6 },
  { date: "2024-05-24", count: 6 },
  { date: "2024-05-25", count: 7 },
  { date: "2024-05-27", count: 4 },
  { date: "2024-05-28", count: 5 },
  { date: "2024-05-29", count: 8 },
  { date: "2024-05-30", count: 5 },
  { date: "2024-05-31", count: 7 },
  { date: "2024-06-01", count: 6 },
  { date: "2024-06-03", count: 3 },
  { date: "2024-06-04", count: 6 },
  { date: "2024-06-05", count: 6 },
  { date: "2024-06-06", count: 7 },
  { date: "2024-06-07", count: 5 },
  { date: "2024-06-08", count: 6 },
  { date: "2024-06-10", count: 7 },
  { date: "2024-06-11", count: 7 },
  { date: "2024-06-12", count: 6 },
  { date: "2024-06-13", count: 7 },
  { date: "2024-06-14", count: 7 },
  { date: "2024-06-15", count: 5 },
  { date: "2024-06-17", count: 8 },
  { date: "2024-06-18", count: 7 },
  { date: "2024-06-19", count: 7 },
  { date: "2024-06-20", count: 7 },
  { date: "2024-06-21", count: 8 },
  { date: "2024-06-22", count: 6 },
  { date: "2024-06-24", count: 7 },
  { date: "2024-06-25", count: 5 },
  { date: "2024-06-26", count: 8 },
  { date: "2024-06-27", count: 6 },
  { date: "2024-06-28", count: 7 },
  { date: "2024-06-30", count: 7 },
  { date: "2024-07-01", count: 6 },
  { date: "2024-07-02", count: 7 },
  { date: "2024-07-03", count: 7 },
  { date: "2024-07-04", count: 7 },
  { date: "2024-07-05", count: 7 },
  { date: "2024-07-06", count: 7 },
  { date: "2024-07-08", count: 7 },
  { date: "2024-07-09", count: 6 },
  { date: "2024-07-10", count: 5 },
  { date: "2024-07-11", count: 8 },
  { date: "2024-07-12", count: 7 },
  { date: "2024-07-13", count: 8 },
  { date: "2024-07-14", count: 7 },
  { date: "2024-07-15", count: 7 },
  { date: "2024-07-16", count: 6 },
  { date: "2024-07-17", count: 5 },
  { date: "2024-07-18", count: 7 },
  { date: "2024-07-19", count: 7 },
  { date: "2024-07-20", count: 6 },
  { date: "2024-07-22", count: 7 },
  { date: "2024-07-23", count: 6 },
  { date: "2024-07-24", count: 6 },
  { date: "2024-07-25", count: 7 },
  { date: "2024-07-26", count: 8 },
  { date: "2024-07-27", count: 7 },
  { date: "2024-07-29", count: 8 },
  { date: "2024-07-30", count: 7 },
  { date: "2024-07-31", count: 7 },
  { date: "2024-08-01", count: 7 },
  { date: "2024-08-02", count: 7 },
  { date: "2024-08-03", count: 5 },
  { date: "2024-08-05", count: 7 },
  { date: "2024-08-07", count: 8 },
  { date: "2024-08-08", count: 6 },
  { date: "2024-08-09", count: 7 },
  { date: "2024-08-11", count: 8 },
  { date: "2024-08-12", count: 6 },
  { date: "2024-08-13", count: 8 },
  { date: "2024-08-14", count: 6 },
  { date: "2024-08-15", count: 6 },
  { date: "2024-08-16", count: 7 },
  { date: "2024-08-17", count: 7 },
  { date: "2024-08-19", count: 7 },
  { date: "2024-08-20", count: 8 },
  { date: "2024-08-21", count: 7 },
  { date: "2024-08-22", count: 6 },
  { date: "2024-08-23", count: 7 },
  { date: "2024-08-25", count: 7 },
  { date: "2024-08-26", count: 6 },
  { date: "2024-08-27", count: 6 },
  { date: "2024-08-28", count: 7 },
  { date: "2024-08-29", count: 11 },
  { date: "2024-08-30", count: 7 },
  { date: "2024-08-31", count: 7 },
  { date: "2024-09-03", count: 7 },
  { date: "2024-09-11", count: 5 },
  { date: "2024-09-12", count: 7 },
  { date: "2024-09-13", count: 4 },
  { date: "2024-09-14", count: 7 },
  { date: "2024-09-16", count: 3 },
  { date: "2024-09-17", count: 6 },
  { date: "2024-09-18", count: 6 },
  { date: "2024-09-19", count: 7 },
  { date: "2024-09-21", count: 15 },
  { date: "2024-09-23", count: 7 },
  { date: "2024-09-24", count: 7 },
  { date: "2024-09-25", count: 7 },
  { date: "2024-09-26", count: 6 },
  { date: "2024-09-27", count: 6 },
  { date: "2024-09-30", count: 6 },
  { date: "2024-10-02", count: 6 },
  { date: "2024-10-03", count: 6 },
  { date: "2024-10-04", count: 6 },
  { date: "2024-10-07", count: 5 },
  { date: "2024-10-08", count: 7 },
  { date: "2024-10-09", count: 6 },
  { date: "2024-10-10", count: 7 },
  { date: "2024-10-11", count: 6 },
  { date: "2024-10-14", count: 7 },
  { date: "2024-10-15", count: 8 },
  { date: "2024-10-16", count: 7 },
  { date: "2024-10-17", count: 7 },
  { date: "2024-10-18", count: 7 },
  { date: "2024-10-21", count: 8 },
  { date: "2024-10-22", count: 7 },
  { date: "2024-10-23", count: 7 },
  { date: "2024-10-24", count: 5 },
  { date: "2024-10-25", count: 4 },
  { date: "2024-10-28", count: 8 },
  { date: "2024-10-29", count: 7 },
  { date: "2024-10-30", count: 6 },
  { date: "2024-11-04", count: 7 },
  { date: "2024-11-05", count: 6 },
  { date: "2024-11-06", count: 5 },
  { date: "2024-11-07", count: 7 },
  { date: "2024-11-08", count: 7 },
  { date: "2024-11-11", count: 6 },
  { date: "2024-11-13", count: 7 },
  { date: "2024-11-14", count: 7 },
  { date: "2024-11-15", count: 7 },
  { date: "2024-11-25", count: 6 },
  { date: "2024-12-11", count: 5 },
  { date: "2024-12-26", count: 6 },
  { date: "2024-12-27", count: 4 },
  { date: "2024-12-30", count: 4 },
  { date: "2024-12-31", count: 4 },
  { date: "2025-01-02", count: 2 },
  { date: "2025-01-03", count: 4 },
  { date: "2025-01-07", count: 5 },
  { date: "2025-01-08", count: 3 },
  { date: "2025-01-09", count: 4 },
  { date: "2025-01-10", count: 5 },
  { date: "2025-01-13", count: 4 },
  { date: "2025-01-14", count: 4 },
  { date: "2025-01-15", count: 5 },
  { date: "2025-01-16", count: 4 },
  { date: "2025-01-17", count: 4 },
  { date: "2025-01-22", count: 6 },
  { date: "2025-01-23", count: 4 },
  { date: "2025-01-24", count: 4 },
  { date: "2025-01-28", count: 5 },
  { date: "2025-01-29", count: 4 },
  { date: "2025-01-30", count: 6 },
  { date: "2025-01-31", count: 7 },
  { date: "2025-02-03", count: 2 },
  { date: "2025-02-04", count: 5 },
  { date: "2025-02-05", count: 5 },
  { date: "2025-02-06", count: 5 },
  { date: "2025-02-07", count: 5 },
  { date: "2025-02-08", count: 2 },
  { date: "2025-02-17", count: 5 },
  { date: "2025-02-18", count: 6 },
  { date: "2025-02-19", count: 5 },
  { date: "2025-02-20", count: 5 },
  { date: "2025-02-21", count: 6 },
  { date: "2025-02-24", count: 2 },
  { date: "2025-02-25", count: 5 },
  { date: "2025-02-26", count: 5 },
  { date: "2025-02-27", count: 5 },
  { date: "2025-03-03", count: 6 },
  { date: "2025-03-04", count: 4 },
  { date: "2025-03-05", count: 4 },
  { date: "2025-03-06", count: 6 },
  { date: "2025-03-07", count: 3 },
  { date: "2025-03-10", count: 6 },
  { date: "2025-03-11", count: 3 },
  { date: "2025-03-12", count: 6 },
  { date: "2025-03-13", count: 4 },
  { date: "2025-03-14", count: 5 },
  { date: "2025-03-15", count: 6 },
  { date: "2025-03-17", count: 5 },
  { date: "2025-03-18", count: 4 },
  { date: "2025-03-21", count: 6 },
  { date: "2025-03-22", count: 6 },
  { date: "2025-03-23", count: 5 },
  { date: "2025-03-24", count: 6 },
  { date: "2025-03-25", count: 6 },
  { date: "2025-03-26", count: 8 },
  { date: "2025-03-27", count: 7 },
  { date: "2025-03-28", count: 7 },
  { date: "2025-03-29", count: 6 },
  { date: "2025-03-31", count: 6 },
  { date: "2025-04-01", count: 7 },
  { date: "2025-04-02", count: 7 },
  { date: "2025-04-03", count: 5 },
  { date: "2025-04-04", count: 6 },
  { date: "2025-04-05", count: 6 },
  { date: "2025-04-07", count: 6 },
  { date: "2025-04-08", count: 5 },
  { date: "2025-04-09", count: 5 },
  { date: "2025-04-10", count: 6 },
  { date: "2025-04-12", count: 6 },
  { date: "2025-04-14", count: 6 },
  { date: "2025-04-15", count: 7 },
  { date: "2025-04-16", count: 6 },
  { date: "2025-04-18", count: 6 },
  { date: "2025-04-19", count: 6 },
  { date: "2025-04-21", count: 7 },
  { date: "2025-04-22", count: 6 },
  { date: "2025-04-23", count: 6 },
  { date: "2025-04-24", count: 6 },
  { date: "2025-04-26", count: 5 },
  { date: "2025-04-28", count: 6 },
  { date: "2025-04-29", count: 6 },
  { date: "2025-04-30", count: 6 },
  { date: "2025-05-01", count: 6 },
  { date: "2025-05-02", count: 6 },
  { date: "2025-05-03", count: 8 },
  { date: "2025-05-05", count: 7 },
  { date: "2025-05-06", count: 5 },
  { date: "2025-05-07", count: 4 },
  { date: "2025-05-08", count: 7 },
  { date: "2025-05-09", count: 2 },
  { date: "2025-05-12", count: 6 },
  { date: "2025-05-13", count: 7 },
  { date: "2025-05-14", count: 7 },
  { date: "2025-05-15", count: 5 },
  { date: "2025-05-16", count: 8 },
  { date: "2025-05-17", count: 8 },
  { date: "2025-05-19", count: 6 },
  { date: "2025-05-20", count: 7 },
  { date: "2025-05-21", count: 7 },
  { date: "2025-05-22", count: 6 },
  { date: "2025-05-23", count: 6 },
  { date: "2025-05-26", count: 1 },
  { date: "2025-05-27", count: 4 },
  { date: "2025-05-28", count: 6 },
  { date: "2025-05-29", count: 5 },
  { date: "2025-05-30", count: 7 },
  { date: "2025-05-31", count: 6 },
  { date: "2025-06-02", count: 9 },
  { date: "2025-06-03", count: 6 },
  { date: "2025-06-04", count: 2 },
  { date: "2025-06-05", count: 5 },
  { date: "2025-06-06", count: 8 },
  { date: "2025-06-07", count: 6 },
  { date: "2025-06-09", count: 3 },
  { date: "2025-06-10", count: 7 },
  { date: "2025-06-11", count: 7 },
  { date: "2025-06-12", count: 5 },
  { date: "2025-06-14", count: 3 },
  { date: "2025-06-16", count: 6 },
  { date: "2025-06-17", count: 5 },
  { date: "2025-06-18", count: 6 },
  { date: "2025-06-19", count: 7 },
  { date: "2025-06-20", count: 1 },
  { date: "2025-06-23", count: 6 },
  { date: "2025-06-24", count: 8 },
  { date: "2025-06-26", count: 1 },
  { date: "2025-06-27", count: 4 },
  { date: "2025-06-30", count: 1 },
  { date: "2025-07-01", count: 7 },
  { date: "2025-07-02", count: 5 },
  { date: "2025-07-03", count: 5 },
  { date: "2025-07-05", count: 2 },
  { date: "2025-07-07", count: 6 },
  { date: "2025-07-08", count: 7 },
  { date: "2025-07-10", count: 4 },
  { date: "2025-07-11", count: 6 },
  { date: "2025-07-12", count: 6 },
  { date: "2025-07-15", count: 6 },
  { date: "2025-07-16", count: 7 },
  { date: "2025-07-17", count: 5 },
  { date: "2025-07-18", count: 6 },
  { date: "2025-07-22", count: 8 },
  { date: "2025-07-23", count: 6 },
  { date: "2025-07-25", count: 2 },
  { date: "2025-07-28", count: 8 },
  { date: "2025-07-29", count: 5 },
  { date: "2025-07-30", count: 5 },
  { date: "2025-07-31", count: 1 },
  { date: "2025-08-01", count: 4 },
  { date: "2025-08-19", count: 4 },
  { date: "2025-08-25", count: 5 },
  { date: "2025-08-26", count: 4 },
  { date: "2025-09-15", count: 5 },
  { date: "2025-09-29", count: 4 },
  { date: "2025-09-30", count: 6 },
  { date: "2025-10-01", count: 2 },
  { date: "2025-10-06", count: 5 },
  { date: "2025-10-08", count: 5 },
  { date: "2025-10-14", count: 4 },
  { date: "2025-10-20", count: 5 },
  { date: "2025-10-27", count: 3 },
  { date: "2025-11-03", count: 4 },
  { date: "2025-11-04", count: 7 },
  { date: "2025-11-05", count: 6 },
  { date: "2025-11-06", count: 5 },
  { date: "2025-11-17", count: 5 },
  { date: "2025-11-18", count: 5 },
  { date: "2025-12-01", count: 7 },
  { date: "2025-12-03", count: 5 },
  { date: "2025-12-05", count: 6 },
  { date: "2026-01-06", count: 2 },
  { date: "2026-01-07", count: 2 },
  { date: "2026-01-08", count: 2 },
  { date: "2026-01-09", count: 3 },
  { date: "2026-01-12", count: 5 },
  { date: "2026-01-13", count: 4 },
  { date: "2026-01-14", count: 3 },
  { date: "2026-01-16", count: 4 },
  { date: "2026-01-17", count: 3 },
  { date: "2026-01-19", count: 8 },
  { date: "2026-01-20", count: 5 },
  { date: "2026-01-21", count: 8 },
  { date: "2026-01-22", count: 7 },
  { date: "2026-01-24", count: 7 },
  { date: "2026-01-26", count: 4 },
  { date: "2026-01-27", count: 7 },
  { date: "2026-01-28", count: 7 },
  { date: "2026-02-03", count: 7 },
  { date: "2026-02-04", count: 5 },
  { date: "2026-02-05", count: 4 },
  { date: "2026-02-06", count: 4 },
  { date: "2026-02-10", count: 7 },
  { date: "2026-02-11", count: 5 },
  { date: "2026-02-12", count: 4 },
  { date: "2026-02-13", count: 6 },
  { date: "2026-02-14", count: 4 },
  { date: "2026-02-16", count: 4 },
  { date: "2026-02-17", count: 4 },
  { date: "2026-02-18", count: 4 },
  { date: "2026-02-20", count: 4 },
  { date: "2026-02-24", count: 3 },
  ];
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

