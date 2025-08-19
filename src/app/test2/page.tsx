import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0E3A4A] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-teal-600" />
            <span className="text-sm md:text-base font-medium">THE CARBON ECONOMY</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-white/80">
            <a className="hover:text-white" href="#">Home</a>
            <a className="hover:text-white" href="#">About us</a>
            <a className="hover:text-white" href="#">Services</a>
          </nav>
          <a
            href="#contact"
            className="rounded-3xl bg-[#2FB7B1] px-5 py-2 text-sm md:text-base font-medium hover:opacity-90"
          >
            Contact Us
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Concentric rings */}
        <svg
          className="pointer-events-none absolute -left-40 top-28 hidden md:block"
          width="1200" height="1200" viewBox="0 0 1200 1200" fill="none"
        >
          {[250, 380, 520, 660, 800].map((r) => (
            <circle key={r} cx="600" cy="600" r={r}
              stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          ))}
        </svg>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-teal-300 text-3xl md:text-5xl font-light leading-tight">
              The climate system<br />is now searchable.
            </h1>
            <div className="mt-6 h-[2px] w-6 bg-teal-300" />
            <p className="mt-6 text-teal-100/90 text-2xl">Start exploring.</p>
            <a
              href="#discover"
              className="mt-8 inline-flex items-center rounded-2xl border border-white/30 px-5 py-2.5 text-sm font-semibold hover:border-white/60"
            >
              Discover More
            </a>
          </div>

          {/* Exported globe/vector layer as image */}
          <div className="relative">
            <Image
              src="/website-home-v1.png" // <- place your PNG here
              alt="Hero graphic"
              width={900}
              height={900}
              priority
              className="w-full h-auto select-none"
            />
          </div>
        </div>
      </section>

      {/* Discover grid */}
      <section id="discover" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <h2 className="text-teal-300 text-2xl md:text-4xl font-light">
          Discover global activity in real time
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "MONITOR PROJECT LAUNCHES",
              b: "Track where and when new carbon projects are coming online. By region, type, and developer.",
            },
            {
              t: "FOLLOW MARKET SIGNALS",
              b: "Stay updated on credit issuance, retirements, and pricing trends across registries.",
            },
            {
              t: "MAP TECH DEPLOYMENT",
              b: "Visualize where MRV tools, removal tech, and digital infrastructure are being scaled.",
            },
            {
              t: "WATCH POLICY SHIFTS",
              b: "Track climate policy updates, jurisdictional programs, and international agreements.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/15 p-6">
              <div className="mb-4 h-10 w-10 rounded-full bg-white/30" />
              <h3 className="text-sm font-semibold tracking-wide">{x.t}</h3>
              <p className="mt-3 text-white/80 text-sm leading-relaxed">{x.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Archive trio */}
      <section className="bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <h2 className="text-teal-300 text-2xl md:text-4xl font-light">
            Browse a global archive of boundary-pushing projects.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { t: "Filter Projects", b: "Explore by methodology, geography, and project type." },
              { t: "See What Works", b: "Understand real-world implementations and tradeoffs." },
              { t: "Track What’s Next", b: "Follow signals shaping the next generation of projects." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/15 p-6">
                <div className="mb-4 h-12 w-12 rounded-full border border-white/40" />
                <h3 className="text-xl font-semibold">{x.t}</h3>
                <p className="mt-3 text-white/80">{x.b}</p>
                <a className="mt-6 inline-flex rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold hover:border-white/70" href="#">
                  View More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signals (2 cards) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex items-center gap-3">
          <h2 className="text-teal-300 text-2xl md:text-4xl font-light">
            Track the signals driving carbon markets, policy, and project design.
          </h2>
          <div className="hidden md:block h-8 w-8 rounded-full border border-teal-300" />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {[0, 1].map((i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.20)] backdrop-blur-md"
            >
              <div className="text-[10px] uppercase tracking-wide text-white/70">Articles</div>
              <h3 className="mt-1 text-xl font-semibold">
                {i === 0
                  ? "How human-centred cities address multidimensional poverty and build urban resilience in Latin America"
                  : "WTO sounds alarm on trade risks as 2025 outlook weakens, and other international trade stories to know this month"}
              </h3>
              <p className="mt-3 text-white/80 text-sm">
                {/* keep short copy; replace with real content later */}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Ecosystem roles (4 tiles) */}
      <section className="bg-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <h2 className="text-teal-300 text-2xl md:text-4xl font-light">
            Work with the ecosystem shaping carbon’s next chapter.
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", l: "Government / Policymaker" },
              { n: "02", l: "Corporate / Businesses" },
              { n: "03", l: "Carbon Developer" },
              { n: "04", l: "Technology Partner" },
            ].map((x) => (
              <div key={x.n} className="rounded-2xl border border-white/20 p-6">
                <div className="aspect-[4/5] w-full rounded-xl border border-white/30" />
                <div className="mt-3 text-xs text-white/70">{x.n}</div>
                <div className="text-sm font-medium">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-teal-600" />
            <span className="text-sm md:text-base font-medium">THE CARBON ECONOMY</span>
          </div>
          <div />
          <p className="text-white/80 max-w-xl text-sm">
            The carbon economy is a new operating system for climate action — where capital, code,
            and carbon intersect. It’s not just about removal or reduction. It’s about redefining
            value, accountability, and scale.
          </p>
          <div className="md:text-right space-y-2">
            <nav className="flex md:justify-end gap-6 text-white/80 text-sm">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Support</a>
            </nav>
            <div className="text-white/60 text-xs">© 2025 The Carbon Economy. All Rights Reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}