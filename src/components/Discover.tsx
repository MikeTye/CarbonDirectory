import { ArrowRight } from "lucide-react";

export default function Discover() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6">
      <div className="flex items-center justify-between">
        <div className="max-w-2xl">
          <h2 className="text-xl text-tce-mint/90">Discover global activity in real time</h2>
          <p className="mt-2 text-sm text-tce-mist/80">
            Track policies, markets, projects and infrastructure as they evolve.
          </p>
        </div>
        <button className="hidden md:inline-flex items-center gap-2 rounded-full border border-tce-line px-4 py-2 text-sm text-tce-mist hover:bg-white/5">
          Explore <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}