import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { BackButton } from "@/components/BackButton";
import { personalProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "building · daisydaines",
};

export default function BuildingPage() {
  return (
    <main>
      <Nav />
      <div className="px-6 md:px-12 pt-32 pb-24 max-w-5xl mx-auto">
        <div className="mb-14">
          <BackButton />
        </div>

        <h1 className="font-mono text-xs text-foreground/30 uppercase tracking-widest mb-10">
          building
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {personalProjects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
