import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWritings, getWriting } from "@/lib/writing";
import { BackButton } from "@/components/BackButton";
import { HeroCarousel } from "@/components/HeroCarousel";

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch)
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="underline">{linkMatch[1]}</a>;
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

  const paragraphs = writing.content.split(/\n\n+/);

  return (
    <main className="min-h-screen px-6 py-24 max-w-lg mx-auto">
      <div className="mb-20">
        <BackButton />
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
    </main>
  );
}
