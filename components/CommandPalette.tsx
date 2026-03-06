"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { social } from "@/lib/data";

interface Command {
  id: string;
  label: string;
  group: string;
  href?: string;
  external?: boolean;
}

const navCommands: Command[] = [
  { id: "home", label: "home", group: "navigate", href: "/" },
  { id: "activity", label: "activity", group: "navigate", href: "/activity" },
  { id: "building", label: "building", group: "navigate", href: "/building" },
  { id: "writing", label: "writing", group: "navigate", href: "/writing" },
  { id: "client-work", label: "client work", group: "navigate", href: "/client-work" },
];

const socialCommands: Command[] = social.map((s) => ({
  id: s.label,
  label: s.label,
  group: "social",
  href: s.url,
  external: true,
}));

const allCommands = [...navCommands, ...socialCommands];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = allCommands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback(
    (cmd: Command) => {
      setOpen(false);
      setQuery("");
      if (cmd.external) {
        window.open(cmd.href, "_blank", "noopener,noreferrer");
      } else if (cmd.href) {
        router.push(cmd.href);
      }
    },
    [router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (!open) return;
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        execute(filtered[selected]);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, filtered, selected, execute]);

  useEffect(() => {
    if (open) {
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const groups = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
          />
          <motion.div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-md px-4"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <span className="font-mono text-xs text-foreground/30">⌘</span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="type a command..."
                  className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-foreground/25 outline-none"
                />
                <kbd className="font-mono text-[10px] text-foreground/20 border border-border rounded px-1.5 py-0.5">
                  esc
                </kbd>
              </div>
              <div className="py-2 max-h-72 overflow-y-auto">
                {Object.entries(groups).map(([group, cmds]) => (
                  <div key={group}>
                    <p className="font-mono text-[10px] text-foreground/20 uppercase tracking-widest px-4 py-1.5">
                      {group}
                    </p>
                    {cmds.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => execute(cmd)}
                          onMouseEnter={() => setSelected(globalIdx)}
                          className={`w-full text-left px-4 py-2 font-mono text-sm transition-colors flex items-center justify-between cursor-pointer ${
                            globalIdx === selected
                              ? "bg-foreground/5 text-foreground/80"
                              : "text-foreground/40"
                          }`}
                        >
                          <span>{cmd.label}</span>
                          {cmd.external && (
                            <span className="text-[10px] text-foreground/20">↗</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="font-mono text-xs text-foreground/20 px-4 py-4 text-center">
                    no results
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
