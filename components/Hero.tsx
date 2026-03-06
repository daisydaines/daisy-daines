"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { XIcon } from "./XIcon";
import { Aurora } from "./Aurora";
import { TypewriterTagline } from "./TypewriterTagline";
import { social } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  github: Github,
  "x.com": XIcon,
  linkedin: Linkedin,
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden">
      <Aurora />

      <div className="relative z-10 max-w-3xl">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="font-mono text-5xl md:text-7xl font-semibold tracking-tighter text-foreground">
            daisydaines
          </h1>
        </motion.div>

        {/* Typewriter tagline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mb-5 h-8 md:h-9 flex items-center"
        >
          <TypewriterTagline />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
          className="text-base text-foreground/50 max-w-md leading-relaxed mb-10"
        >
          i build things for the internet, write poems to express myself
          and pursue fitness goals that stretch me.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-6"
        >
          {social.map((s) => {
            const Icon = iconMap[s.label];
            if (!Icon) return null;
            return (
              <Link
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors group"
              >
                <Icon size={16} />
                <span className="font-mono text-xs text-foreground/30 group-hover:text-foreground/60 transition-colors">
                  {s.label}
                </span>
              </Link>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/20"
      >
        <ArrowDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
