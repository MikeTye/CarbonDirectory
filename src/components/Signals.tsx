export default function Signals() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center gap-3">
        <h2 className="text-xl text-tce-mint/90">Track the signals driving carbon markets, policy, and project design.</h2>
        <span className="ml-auto hidden md:block h-8 w-8 rounded-full border border-tce-line" />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {[0, 1].map((i) => (
          <article
            key={i}
            className="rounded-2xl border border-tce-line/60 bg-white/5 p-5 text-sm text-tce-mist hover:bg-white/[.07] transition"
          >
            <p className="text-xs text-tce-faint">NEWS</p>
            <h3 className="mt-2 text-base text-tce-mint/90">
              Headline — keep copy short (replace with your feed)
            </h3>
            <p className="mt-2 line-clamp-3">
              Short summary goes here. Replace cards with dynamic content later.
            </p>
            <div className="mt-4 text-xs text-tce-faint">Read more →</div>
          </article>
        ))}
      </div>
    </section>
  );
}