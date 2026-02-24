import Link from "next/link";
import { social } from "@/lib/data";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 border-t border-border max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-foreground/25">
        daisydaines © {new Date().getFullYear()}
      </p>

      <div className="flex items-center gap-5">
        {social.map((s) => (
          <Link
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-foreground/25 hover:text-foreground/60 transition-colors"
          >
            {s.label}
          </Link>
        ))}
      </div>

      <p className="font-mono text-xs text-foreground/15">
        built with next.js
      </p>
    </footer>
  );
}
