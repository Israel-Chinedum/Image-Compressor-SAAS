const TIERS = [
  {
    name: "Free",
    price: "$0",
    tagline: "For occasional use",
    features: [
      "Unlimited compressions",
      "All formats",
      "Before/after compare",
      "Ads supported",
    ],
    cta: "Currently active",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$6",
    tagline: "per month, for regular use",
    features: [
      "Everything in Free",
      "No ads",
      "Batch ZIP download",
      "Priority processing",
    ],
    cta: "Coming soon",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 px-6 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-4xl font-extrabold">Simple pricing</h1>
        {/* <p className="max-w-md text-(--fg-muted)">
          Compression is free, forever. Pro just removes friction for people
          doing it a lot.
        </p> */}
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col gap-6 rounded-2xl border p-8 ${
              tier.highlighted
                ? "border-signal-deep bg-(--bg-raised) dark:border-signal"
                : "border-(--border-color) bg-(--bg-raised)"
            }`}
          >
            <div>
              <h2 className="text-lg font-semibold">{tier.name}</h2>
              <p className="mt-2 font-mono text-4xl font-bold">{tier.price}</p>
              <p className="mt-1 text-sm text-(--fg-muted)">{tier.tagline}</p>
            </div>

            <ul className="flex flex-col gap-2.5 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="shrink-0 text-signal-deep dark:text-signal"
                  >
                    <path
                      d="M3 8l3.5 3.5L13 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <button
              type="button"
              disabled={tier.cta !== "Currently active" ? false : true}
              className={`mt-auto rounded-full py-2.5 text-sm font-semibold transition-opacity ${
                tier.highlighted
                  ? "bg-signal-deep text-white hover:opacity-90 dark:bg-signal dark:text-ink"
                  : "border border-(--border-color-strong)"
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
