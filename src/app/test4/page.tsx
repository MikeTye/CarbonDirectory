"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

/**
 * Replace the placeholder arrays below with your existing data constants
 * from your original file (navigationItems, realTimeFeatures, projectFeatures,
 * articlesData, ecosystemData) or import them from a separate module.
 */

type NavItem = { label: string; href: string };
// const navigationItems: NavItem[] = [...];

type RealTimeFeature = {
  title: string;
  description: string;
  /** Responsive polar positioning (percentage of container radius). */
  angleDeg?: number; // 0 = right, 90 = up
  radiusPct?: number; // 0..100 of half-size
};
// const realTimeFeatures: RealTimeFeature[] = [...];

type ProjectFeature = {
  title: string;
  description: string;
  icon: string;          // e.g. "/icons/filter.svg" (under /public)
};
// const projectFeatures: ProjectFeature[] = [...];

type ArticleSection = {
  category: string;
  mainTitle: string;
  articles: string[];
};
// const articlesData: ArticleSection[] = [...];

type EcosystemItem = { id: string; title: string; image: string };
// const ecosystemData: EcosystemItem[] = [...];

// ---- UI Primitives ----
const Section: React.FC<React.PropsWithChildren<{ id?: string; className?: string }>> = ({ id, className, children }) => (
  <section id={id} className={`py-8 sm:py-12 lg:py-16 ${className ?? ""}`}>{children}</section>
);

const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
  <div className={`container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className ?? ""}`}>{children}</div>
);

// ---- Layout ----
const Navbar: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-[#0b3954]/70 bg-[#0b3954]">
    <Container className="flex h-16 items-center justify-between">
      <Link href="#home" className="inline-flex items-center gap-2" aria-label="The Carbon Economy">
        <Image src="/Group 6.png" width={122} height={40} alt="Logo" priority />
      </Link>
      <nav className="hidden md:flex items-center gap-8">
        {items.map((item) => (
          <Link key={item.label} href={item.href} className="text-white/90 hover:text-[#56bdba] transition-colors text-sm font-medium">
            {item.label}
          </Link>
        ))}
      </nav>
      {/* <Link
        href="#contact"
        className="inline-flex items-center rounded-full bg-teal-400 px-4 py-2 text-sm font-semibold text-[#0b3954] hover:bg-[#56bdba] transition-colors"
      >
        Contact Us
      </Link> */}
    </Container>
  </header>
);

const Hero: React.FC = () => (
  <Section id="home" className="bg-[#0b3954] text-white">
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#56bdba]">
          The climate system is now searchable.
          <div className="mt-8 flex items-start gap-4">
            {/* Vertical line */}
            <span className="block w-0.5 h-12 bg-[#56bdba] mt-1" />
            </div>
          <span className="block mt-8 text-[#56bdba]">Start exploring.</span>
        </h1>
        <div className="mt-8">
          {/* <Link
            href="#discover"
            className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold hover:border-[#56bdba] hover:text-[#56bdba] transition-colors"
          >
            Discover More
          </Link> */}
        </div>
      </div>
    </Container>
  </Section>
);

const RealTime: React.FC<{ items: RealTimeFeature[] }> = ({ items }) => {
  // Fallback positions if not provided
  const defaults = [
    { angleDeg: 210, radiusPct: 55 },
    { angleDeg: 345, radiusPct: 60 },
    { angleDeg: 150, radiusPct: 75 },
    { angleDeg: 330, radiusPct: 78 },
  ];

  {/* --- constants for layout --- */}
    const GLOBE_RADIUS = 30;      // % of viewBox (edge of white globe)
    const DOT_RADIUS   = 48;      // where the outer dots live
    const CARD_PUSH    = 6;       // extra outward push for the card (in %)
    const DOT_SIZE     = 3;       // px

  return (
    <Section id="discover" className="bg-[#0b3954] text-white">
      <Container>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#56bdba] flex-1">
            Discover global activity in real time
          </h2>
        </div>

        {/* Radar + labels */}
        <div className="relative mx-auto mt-8 w-full max-w-4xl aspect-square">
          {/* Concentric rings */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {[16, 32, 48, 64, 80, 96].map((d, i) => (
              <circle key={i} cx="50" cy="50" r={d/2} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.25" />
            ))}
          </svg>

          {/* Globe mark (use your SVG/PNG) */}
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <Image src="/Isolation_Mode.svg" alt="Globe" width={800} height={800} className="w-full h-auto opacity-90" />
          </div>

          {/* Feature dots + callouts */}
          {items.map((f, idx) => {
            const { angleDeg = defaults[idx % defaults.length].angleDeg } = f;
            const rad = (angleDeg * Math.PI) / 180;

            // helper to convert polar -> cartesian in 0–100 space
            const pt = (radiusPct: number) => ({
                x: 50 + radiusPct * Math.cos(rad),
                y: 50 - radiusPct * Math.sin(rad),
            });

            const pGlobe = pt(GLOBE_RADIUS);             // point on globe edge
            const pDot   = pt(DOT_RADIUS);               // outer small dot
            const pCard  = pt(DOT_RADIUS + CARD_PUSH);   // card anchor (slightly further out)

            // side-aware card shift so it sits outside nicely
            const sideX = Math.cos(rad) >= 0 ? 0 : -220;  // 220px ~ card width
            const sideY = Math.sin(rad) >= 0 ? -80 : 0;   // small vertical bias

            return (
                <React.Fragment key={`${f.title}-${idx}`}>
                {/* connector: globe edge -> dot */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    <line
                    x1={pGlobe.x} y1={pGlobe.y}
                    x2={pDot.x}   y2={pDot.y}
                    stroke="rgba(255,255,255,0.6)" strokeWidth="0.4"
                    />
                </svg>

                {/* dot */}
                <div
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${pDot.x}%`, top: `${pDot.y}%` }}
                >
                    <span
                    className="block rounded-full bg-white"
                    style={{ width: DOT_SIZE, height: DOT_SIZE }}
                    />
                </div>

                {/* label card (anchored just beyond the dot, biased outward) */}
                <div
                    className="absolute max-w-[220px] rounded-xl border border-white/20 bg-[#0b3954]/70 p-3 text-xs backdrop-blur-sm"
                    style={{
                    left: `calc(${pCard.x}% + ${sideX}px)`,
                    top:  `calc(${pCard.y}% + ${sideY}px)`,
                    }}
                >
                    <h3 className="text-[11px] tracking-wide text-[#56bdba]">{f.title}</h3>
                    <p className="mt-1 leading-relaxed text-white/90">{f.description}</p>
                </div>
                </React.Fragment>
            );
            })}
        </div>
      </Container>
    </Section>
  );
};
const ProjectFeatures: React.FC<{ items: ProjectFeature[] }> = ({ items }) => (
  <Section id="services" className="bg-[#0b3954] text-white">
    <Container>
        <div className="mt-12 flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#56bdba] max-w-xl">
            Browse a global archive of boundary‑pushing projects
          </h2>
          <ArrowRightCircle className="size-8 sm:size-10" aria-hidden />
        </div>
      <div className="grid lg:mt-20 lg:pt-6 grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((pf) => (
          <article key={pf.title} className="rounded-2xl p-6 items-center text-center">
            {/* <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/40">
              <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeOpacity="0.7" />
                <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeOpacity="0.7" />
              </svg>
            </div> */}
            <div className="mb-5 inline-flex w-[186px] h-[109px] items-center justify-center rounded-full">
              <Image
                src={pf.icon}
                alt=""                    // decorative
                width={186}
                height={109}
                className="w-[186px] h-[109px] object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold">{pf.title}</h3>
            <p className="mt-3 text-sm text-white/90">{pf.description}</p>
            {/* spacer to push button to bottom */}
            <div className="flex-1" />
            {/* <Link
              href="#projects"
              className="mt-6 inline-flex rounded-md border border-white/40 px-4 py-2 text-sm font-semibold hover:border-[#56bdba] hover:text-[#56bdba] transition-colors"
            >
              View More
            </Link> */}
          </article>
        ))}
      </div>
    </Container>
  </Section>
);

const Articles: React.FC<{ sections: ArticleSection[] }> = ({ sections }) => (
  <Section id="about" className="bg-[#0b3954] text-white">
    <Container>
      <div className="flex items-center gap-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#56bdba] max-w-xl">
          Track the signals driving carbon markets, policy, and project design
        </h2>
        <ArrowRightCircle className="size-8 sm:size-10" aria-hidden />
      </div>
      <div className="mt-8 lg:mt-20 lg:pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((sec) => (
          <article key={sec.category} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6">
            <p className="text-xs uppercase tracking-wider text-white/80">{sec.category}</p>
            <h3 className="mt-2 text-xl font-semibold">{sec.mainTitle}</h3>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sec.articles.map((a) => (
                <li key={a} className="text-sm text-white/90">{a}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Container>
  </Section>
);

const Ecosystem: React.FC<{ items: EcosystemItem[] }> = ({ items }) => (
  <Section className="bg-[#0b3954] text-white">
    <Container>
      {/* --- Top Title + Side Paragraph --- */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Left Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#56bdba] max-w-xl">
          Work with the ecosystem shaping carbon’s next chapter.
        </h2>

        {/* Right Paragraph */}
        <p className="max-w-md text-sm text-white/90 leading-relaxed">
          Policy, tech, finance, impact — whatever your lever, this is where it moves the system. 
          From frontier methodologies to market-scale deployment, this ecosystem turns intent into infrastructure.
        </p>
      </div>

      {/* --- Grid of Items --- */}
        <div className="mt-12 lg:mt-20 lg:pt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <figure
            key={it.id}
            className={`rounded-2xl border border-white/20 overflow-hidden transition-transform duration-300 ${
              // Apply alternating up/down effect
              idx % 2 === 0 ? "translate-y-0" : "lg:-translate-y-10"
            }`}
          >
            <div className="relative aspect-[3/4] w-full bg-[#0b3954]">
              <Image
                src={it.image}
                alt={it.title}
                fill
                className="object-contain p-6" // ensures icons don't stretch
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-white/70">{it.id}</span>
                <span className="font-medium">{it.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  </Section>
);

const Footer: React.FC = () => (
  <footer className="bg-[#0b3954] text-white">
    <Container className="py-10 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <Image src="/Group 19.png" width={122} height={40} alt="Logo" />
        {/* <div className="flex items-center gap-6 text-sm">
          <Link href="#privacy" className="hover:text-[#56bdba]">Privacy Policy</Link>
          <Link href="#terms" className="hover:text-[#56bdba]">Terms & Conditions</Link>
          <Link href="#support" className="hover:text-[#56bdba]">Support</Link>
        </div> */}
      </div>
        <p className="max-w-md text-sm text-white/90 leading-relaxed whitespace-pre-line">
        The carbon economy is a new operating system for climate action — where capital, code, and carbon intersect.
        {"\n"}
        {"\n"}
        It’s not just about removal or reduction. It’s about redefining value, accountability, and scale.
        </p>
      <div className="h-px w-full bg-white/10" />
      <p className="text-xs text-white/70 text-center sm:text-right">© 2025 The Carbon Economy. All Rights Reserved.</p>
    </Container>
  </footer>
);

export default function Page() {
  // Bring your existing arrays back in here
  const navigationItems: NavItem[] = [
    // { label: "Home", href: "#home" },
    // { label: "About Us", href: "#about" },
    // { label: "Services", href: "#services" },
  ];

  const realTimeFeatures: RealTimeFeature[] = [
    {
    title: "MONITOR PROJECT LAUNCHES",
    description:
      "Track where and when new carbon projects are coming online. By region, type, and developer.",
    // lineImage: "/Line 11.png",
    // linePosition: { top: "562px", left: "289px" },
  },
  {
    title: "FOLLOW MARKET SIGNALS",
    description:
      "Stay updated on credit issuance, retirements, and pricing trends across registries.",
    // lineImage: "/Line 13.png",
    // linePosition: { top: "639px", left: "1161px" },
  },
  {
    title: "WATCH POLICY SHIFTS",
    description:
      "Track climate policy updates, jurisdictional programs, and international agreements as they evolve.",
    // lineImage: "/Line 10.png",
    // linePosition: { top: "1051px", left: "405px" },
  },
  {
    title: "MAP TECH DEPLOYMENT",
    description:
      "Visualize where MRV tools, carbon removal tech, and digital infrastructure are being scaled.",
    // lineImage: "/Line 12.png",
    // linePosition: { top: "1008px", left: "1102px" },
  },
  ];

  const projectFeatures: ProjectFeature[] = [
    {
    title: "Filter Projects",
    description:
      "Explore a complete archive by methodology, geography, project types. From biochar deployments to soil carbon initiatives. Compare strategies across contexts and conditions.",
    icon: "/project_1.svg",
  },
  {
    title: "See What Works",
    description:
      "Get inside real-world implementations and tradeoffs. Understand how developers, communities, and financiers are balancing impact, integrity, and scale.",
    icon: "/project_2.svg",
  },
  {
    title: "Track What's Next",
    description:
      "Follow the signals shaping the next generation of carbon projects. From frontier tech to new governance models, see where innovation is leading and where the market is moving.",
    icon: "/project_3.svg",
  },
  ];

  const articlesData: ArticleSection[] = [
    {
    category: "ARTICLES",
    mainTitle:
      "How human-centred cities address multidimensional poverty and build urban resilience in Latin America",
    articles: [
      "Why investment in sustainable infrastructure is key to financial resilience in a changing climate",
      "Rewilding our cities: How urban nature restoration is reshaping the future of urban life – and business",
      "Nature Positive: Corporate Assessment Guide for Financial Institutions",
      "How the birthplace of Earth Day became a climate innovation hub",
    ],
  },
  {
    category: "POLICIES",
    mainTitle:
      "WTO sounds alarm on trade risks as 2025 outlook weakens, and other international trade stories to know this month",
    articles: [
      "Implementation options for ASEAN's Digital Economy Framework Agreement",
      "The world needs a new food revolution. Here's how to empower farmers to make it happen",
      "This is the state of play in the global data centre gold rush",
      "The game of 'chicken' being played with the world economy can be brought to a cooperative end",
    ],
  },
  ];

  const ecosystemData: EcosystemItem[] = [
    {
        id: "01",
        title: "Government / Policymaker",
        image: "/image_2.png",
    },
    {
        id: "02",
        title: "Corporate / Businesses",
        image: "/image_3.png",
    },
    {
        id: "03",
        title: "Carbon Developer",
        image: "/image_4.png",
    },
    {
        id: "04",
        title: "Technology Partner",
        image: "/image_5.png",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b3954]">
      <Navbar items={navigationItems} />
      <main>
        <Hero />
        <RealTime items={realTimeFeatures} />
        <ProjectFeatures items={projectFeatures} />
        <Articles sections={articlesData} />
        <Ecosystem items={ecosystemData} />
      </main>
      <Footer />
    </div>
  );
}
