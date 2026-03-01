import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllWritings, getWriting } from "@/lib/writing";
import { BackButton } from "@/components/BackButton";

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

      {writing.image ? (
        <div className="relative w-full h-52 mb-14 overflow-hidden rounded-sm">
          <Image
            src={writing.image}
            alt={writing.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-3">
              {writing.type} · {writing.dateDisplay}
            </p>
            <h1
              className="text-3xl text-white/90 leading-snug"
              style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
            >
              {writing.title}
            </h1>
          </div>
        </div>
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
            {para}
          </p>
        ))}
      </div>
    </main>
  );
}
