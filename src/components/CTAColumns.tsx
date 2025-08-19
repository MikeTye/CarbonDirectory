const items = [
  { title: "Filter Projects", text: "Browse by methodology, geography, or project type." },
  { title: "See What Works", text: "Understand implementations and standards." },
  { title: "Track What’s Next", text: "Follow signals shaping the next generation." },
];

export default function CTAColumns() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-tce-line/60 bg-white/5 p-6 hover:bg-white/[.07] transition"
          >
            <div className="h-12 w-12 rounded-full border border-tce-line/60" />
            <h3 className="mt-4 text-lg text-tce-mint">{c.title}</h3>
            <p className="mt-2 text-sm text-tce-mist">{c.text}</p>
            <button className="mt-4 rounded-full border border-tce-line px-4 py-2 text-xs text-tce-mist hover:bg-white/5">
              View More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}