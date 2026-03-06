import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <p className="font-mono text-xs text-foreground/20 uppercase tracking-widest mb-4">
        404
      </p>
      <h1 className="font-serif text-3xl italic text-foreground/60 mb-2">
        lost the path
      </h1>
      <p className="font-mono text-sm text-foreground/25 mb-10">
        this page doesn&apos;t exist. yet.
      </p>
      <Link
        href="/"
        className="font-mono text-xs text-foreground/40 hover:text-foreground/70 transition-colors underline underline-offset-4"
      >
        go home
      </Link>
    </main>
  );
}
