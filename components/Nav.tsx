"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { social } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors tracking-tight"
      >
        daisydaines
      </Link>

      <div className="flex items-center gap-5">
        {social.map((s) => {
          const Icon = iconMap[s.label];
          if (!Icon) return null;
          return (
            <Link
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/40 hover:text-foreground transition-colors"
              aria-label={s.label}
            >
              <Icon size={15} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
