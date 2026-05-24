import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Book } from "@/lib/data";

export function BookRow({ book }: { book: Book }) {
  const isExternal = book.url?.startsWith("http") ?? false;

  const inner = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <span className="min-w-0">
          <span
            className="text-foreground/70 group-hover:text-foreground transition-colors leading-snug"
            style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
          >
            {book.title}
          </span>
          <span className="ml-2 font-mono text-xs text-foreground/30">
            {book.author}
          </span>
        </span>
        <div className="flex items-center gap-3 shrink-0">
          {book.year && (
            <span className="font-mono text-xs text-foreground/25">{book.year}</span>
          )}
          {book.url &&
            (isExternal ? (
              <ArrowUpRight
                size={13}
                className="text-foreground/20 group-hover:text-foreground/50 transition-colors"
              />
            ) : (
              <ArrowRight
                size={13}
                className="text-foreground/20 group-hover:text-foreground/50 transition-colors"
              />
            ))}
        </div>
      </div>
      {book.note && (
        <p
          className="mt-1.5 text-sm text-foreground/35 leading-relaxed"
          style={{ fontFamily: "var(--font-lora)", fontStyle: "italic" }}
        >
          {book.note}
        </p>
      )}
    </>
  );

  if (book.url) {
    return (
      <Link
        href={book.url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group block py-4 hover:pl-1 transition-all duration-150"
      >
        {inner}
      </Link>
    );
  }

  return <div className="group block py-4">{inner}</div>;
}
