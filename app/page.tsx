import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Writing } from "@/components/Writing";
import { Goals } from "@/components/Goals";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <Writing />
      <Goals />
      <Footer />
    </main>
  );
}
