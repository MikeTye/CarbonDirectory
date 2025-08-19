export default function Hero() {
  return (
    <section className="relative">
      {/* Concentric rings background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-rings" />
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24">
        <div className="max-w-xl">
          <p className="text-tce-mint/90 text-lg">The climate system</p>
          <h1 className="mt-1 text-3xl md:text-4xl font-medium text-tce-mint">is now searchable.</h1>
          <div className="mt-6 h-px w-8 bg-tce-mint/60" />
          <p className="mt-6 text-tce-mist">Start exploring.</p>
          <button className="mt-6 rounded-full border border-tce-line px-5 py-2 text-sm text-tce-mist hover:bg-white/5">
            Discover More
          </button>
        </div>

        {/* Globe placeholder */}
        <div className="mt-20 grid place-items-center">
          <div className="relative h-[360px] w-[360px] md:h-[460px] md:w-[460px]">
            <div className="absolute inset-0 rounded-full border border-tce-line/60" />
            <div className="absolute inset-6 rounded-full border border-tce-line/40" />
            <div className="absolute inset-12 rounded-full border border-tce-line/30" />
            <div className="absolute inset-0 animate-spin-slow [animation-duration:18s]">
              <svg viewBox="0 0 200 200" className="h-full w-full opacity-70">
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#9EE5D6" />
                    <stop offset="100%" stopColor="#9EE5D6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                {[...Array(16)].map((_, i) => {
                  const r = 95 - i * 5.5;
                  return (
                    <circle key={i} cx="100" cy="100" r={r} fill="none" stroke="url(#g)" strokeWidth="0.5"
                      transform={`skewX(${i})`} />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}