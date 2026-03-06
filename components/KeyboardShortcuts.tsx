"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { social } from "@/lib/data";

export function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    let pending: string | null = null;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const clear = () => {
      pending = null;
      if (timeout) clearTimeout(timeout);
    };

    const down = (e: KeyboardEvent) => {
      // Don't fire if user is typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      // g + key combos for social links
      if (pending === "g") {
        clear();
        const map: Record<string, string> = {
          h: social.find((s) => s.label === "github")?.url ?? "",
          x: social.find((s) => s.label === "x.com")?.url ?? "",
          l: social.find((s) => s.label === "linkedin")?.url ?? "",
        };
        if (map[e.key]) {
          window.open(map[e.key], "_blank", "noopener,noreferrer");
        }
        return;
      }

      if (e.key === "g" && !e.metaKey && !e.ctrlKey) {
        pending = "g";
        timeout = setTimeout(clear, 1000);
        return;
      }

      // Number keys to jump to sections
      const sections: Record<string, string> = {
        "1": "projects",
        "2": "writing",
        "3": "goals",
      };
      if (sections[e.key] && !e.metaKey && !e.ctrlKey) {
        const el = document.getElementById(sections[e.key]);
        el?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      // ? to navigate to activity
      if (e.key === "?" && !e.metaKey) {
        router.push("/activity");
      }
    };

    window.addEventListener("keydown", down);
    return () => {
      window.removeEventListener("keydown", down);
      if (timeout) clearTimeout(timeout);
    };
  }, [router]);

  return null;
}
