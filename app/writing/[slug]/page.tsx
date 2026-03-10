import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllWritings, getAdjacentWritings, getWriting } from "@/lib/writing";
import { BackButton } from "@/components/BackButton";
import { HeroCarousel } from "@/components/HeroCarousel";

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\{[a-z]+:[^}]+\})/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch)
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="underline">{linkMatch[1]}</a>;
    const colorMatch = part.match(/^\{([a-z]+):([^}]+)\}$/);
    if (colorMatch)
      return <span key={i} style={{ color: colorMatch[1] }}>{colorMatch[2]}</span>;
    return part;
  });
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWritings({ includePrivate: true }).map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const writing = getWriting(slug);
  if (!writing) return {};
  return { title: `${writing.title} · daisydaines` };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const writing = getWriting(slug);
  if (!writing) notFound();

  const { prev, next } = getAdjacentWritings(slug);
  const paragraphs = writing.content.split(/\n\n+/);

  return (
    <main className="min-h-screen px-6 py-24 max-w-lg mx-auto">
      <div className="mb-20">
        <BackButton href="/writing" />
      </div>

      {writing.images ? (
        <HeroCarousel
          images={writing.images}
          title={writing.title}
          type={writing.type}
          dateDisplay={writing.dateDisplay}
        />
      ) : (
        <>
          <p className="font-mono text-[10px] text-foreground/25 uppercase tracking-widest mb-5">
            {writing.type} · {writing.dateDisplay}
          </p>
          <h1
            className="text-3xl text-foreground/90 leading-snug mb-14"
            style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
          >
            {writing.title}
          </h1>
        </>
      )}

      <div className="space-y-7">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-foreground/70 leading-8 whitespace-pre-line"
            style={{ fontFamily: "var(--font-lora)", fontSize: "1.075rem" }}
          >
            {renderInline(para)}
          </p>
        ))}
      </div>

      <div className="mt-20 pt-8 border-t border-foreground/10 flex justify-between gap-6">
        {prev ? (
          <Link href={`/writing/${prev.slug}`} className="group flex flex-col gap-1 max-w-[45%]">
            <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-widest flex items-center gap-1">
              <span>←</span> previous
            </span>
            <span className="text-foreground/60 text-sm group-hover:text-foreground/90 transition-colors" style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
              {prev.title}
            </span>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`/writing/${next.slug}`} className="group flex flex-col gap-1 items-end max-w-[45%]">
            <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-widest flex items-center gap-1">
              next <span>→</span>
            </span>
            <span className="text-foreground/60 text-sm group-hover:text-foreground/90 transition-colors text-right" style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}>
              {next.title}
            </span>
          </Link>
        ) : <div />}
      </div>
    </main>
  );
}
