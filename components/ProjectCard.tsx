"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

export const tagStyles: Record<string, string> = {
  building: "bg-amber-500/10 text-amber-400/80 border border-amber-500/20",
  shipped: "bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/20",
  client: "bg-sky-500/10 text-sky-400/80 border border-sky-500/20",
  writing: "bg-violet-500/10 text-violet-400/80 border border-violet-500/20",
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isLinked = project.url !== "#";

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      whileHover={isLinked ? { y: -3 } : {}}
      className={`group relative h-full flex flex-col p-5 rounded-xl border border-border bg-card transition-all duration-200 ${
        isLinked ? "hover:border-border/80 cursor-pointer" : "opacity-70"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-mono text-sm font-medium text-foreground tracking-tight">
          {project.name}
        </span>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${tagStyles[project.tag]}`}
          >
            {project.tag}
          </span>
          {isLinked && (
            <ArrowUpRight
              size={13}
              className="text-foreground/20 group-hover:text-foreground/60 transition-colors"
            />
          )}
        </div>
      </div>
      <p className="flex-1 text-sm text-foreground/40 leading-relaxed">
        {project.description}
      </p>
    </motion.div>
  );

  if (isLinked) {
    return (
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {cardContent}
      </Link>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}
