import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Pipeline from "@/components/Pipeline";
import Visualisation from "@/components/Visualisation";
import Results from "@/components/Results";
import TechStack from "@/components/TechStack";
import Organisation from "@/components/Organisation";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Pipeline />
      <Visualisation />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/results/coleus-109/`} className="block rounded-xl border border-lime-400/30 bg-green-950/40 p-6 transition hover:bg-green-900/40">
          <p className="text-xs font-semibold uppercase tracking-widest text-lime-400">New reconstruction study</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Explore the recovered Coleus 109 →</h2>
          <p className="mt-3 text-green-100/65">The complete interactive comparison, downloadable model, remaining gaps and a practical plan for better capture.</p>
        </a>
      </section>
      <Results />
      <TechStack />
      <Organisation />
      <Team />
      <Contact />
    </main>
  );
}
