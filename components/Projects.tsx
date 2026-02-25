"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { personalProjects, clientProjects } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";

const PREVIEW = 3;

export function Projects() {
  return (
    <section id="building" className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
      {/* Personal projects */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <h2 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-6">
          building
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {personalProjects.slice(0, PREVIEW).map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
        {personalProjects.length > PREVIEW && (
          <Link
            href="/building"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            <span>→</span> see all {personalProjects.length}
          </Link>
        )}
      </motion.div>

      {/* Client work */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h2 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-6">
          client work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {clientProjects.slice(0, PREVIEW).map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
        {clientProjects.length > PREVIEW && (
          <Link
            href="/client-work"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
          >
            <span>→</span> see all {clientProjects.length}
          </Link>
        )}
      </motion.div>
    </section>
  );
}
