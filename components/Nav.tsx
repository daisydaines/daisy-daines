"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { social } from "@/lib/data";
import { XIcon } from "./XIcon";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  "x.com": XIcon,
  linkedin: Linkedin,
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-60 h-[2px] pointer-events-none">
        <div
          className="h-full bg-violet-400/50 transition-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

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
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
            className="font-mono text-[10px] text-foreground/20 hover:text-foreground/40 transition-colors border border-border rounded px-1.5 py-0.5 hidden md:block cursor-pointer"
            aria-label="Open command palette"
          >
            ⌘K
          </button>
          <Link
            href="/activity"
            className="font-mono text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            activity
          </Link>
          <div className="w-px h-3 bg-foreground/10" />
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground/40 hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}
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
    </>
  );
}
