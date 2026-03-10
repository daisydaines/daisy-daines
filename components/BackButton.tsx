"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({ label = "home", href }: { label?: string; href?: string }) {
  const router = useRouter();

  const className = "inline-flex items-center gap-1.5 font-mono text-xs text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer";

  if (href) {
    return (
      <Link href={href} className={className}>
        <ArrowLeft size={11} />
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className={className}
    >
      <ArrowLeft size={11} />
      {label}
    </button>
  );
}
