import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WRITING_DIR = path.join(process.cwd(), "content/writing");

export interface Writing {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  dateDisplay: string; // "feb 2026"
  type: "poem" | "journal";
  published: "public" | "private";
  image?: string;
  images?: string[];
  content: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toLowerCase();
}

export function getAllWritings({
  includePrivate = false,
} = {}): Omit<Writing, "content">[] {
  if (!fs.existsSync(WRITING_DIR)) return [];

  return fs
    .readdirSync(WRITING_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(WRITING_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        dateDisplay: formatDate(data.date as string),
        type: (data.type ?? "poem") as "poem" | "journal",
        published: (data.published ?? "public") as "public" | "private",
        image: data.image as string | undefined,
        images: data.images
          ? (data.images as string[])
          : data.image
          ? [data.image as string]
          : undefined,
      };
    })
    .filter((w) => includePrivate || w.published !== "private")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAdjacentWritings(slug: string): {
  prev: Omit<Writing, "content"> | null;
  next: Omit<Writing, "content"> | null;
} {
  const all = getAllWritings({ includePrivate: true });
  const index = all.findIndex((w) => w.slug === slug);
  if (index === -1) return { prev: null, next: null };
  // sorted newest-first, so "prev" = older (higher index), "next" = newer (lower index)
  return {
    prev: index < all.length - 1 ? all[index + 1] : null,
    next: index > 0 ? all[index - 1] : null,
  };
}

export function getWriting(slug: string): Writing | null {
  const filePath = path.join(WRITING_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    dateDisplay: formatDate(data.date as string),
    type: (data.type ?? "poem") as "poem" | "journal",
    published: (data.published ?? "public") as "public" | "private",
    image: data.image as string | undefined,
    images: data.images
      ? (data.images as string[])
      : data.image
      ? [data.image as string]
      : undefined,
    content: content.trim(),
  };
}
