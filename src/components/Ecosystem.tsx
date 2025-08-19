const roles = [
  { label: "Governments / Policymakers" },
  { label: "Corporate / Business" },
  { label: "Carbon Developers" },
  { label: "Technology Partner" },
];

export default function Ecosystem() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <h2 className="text-xl text-tce-mint/90">
        Work with the ecosystem shaping carbon’s next chapter.
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-4">
        {roles.map((r, idx) => (
          <div
            key={r.label}
            className="rounded-2xl border border-tce-line/60 bg-white/5 p-6 hover:bg-white/[.07] transition"
          >
            <div className="mb-6 grid place-items-center">
              <div className="h-28 w-28 rounded-2xl border border-tce-line/60" />
            </div>
            <p className="text-sm text-tce-mist">
              <span className="text-tce-faint mr-2">0{idx + 1}</span>{r.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}