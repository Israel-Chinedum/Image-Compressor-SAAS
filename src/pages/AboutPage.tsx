import Seo from "@/components/SEO";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * A small live "weight" demo — the page's own hero shrinks a mock
 * file-size number on load, echoing what the product does to images.
 * Respects prefers-reduced-motion.
 */
function ShrinkingStat() {
  const [value, setValue] = useState(4800);
  const target = 312;

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const duration = 900;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(4800 - (4800 - target) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span className="font-mono tabular-nums text-signal">
      {value.toLocaleString()} KB
    </span>
  );
}

export function AboutPage() {
  return (
    <>
      <Seo
        title="Squeeze - About"
        url="https://fastidious-gingersnap-eb4d73.netlify.app/about"
        description="Discover the story behind Squeeze. Learn how our developer-focused engineering enables 100% browser-side image compression that prioritizes your data privacy and speed.
"
      />
      <div className="w-[90dvw] sm:w-[80dvw] lg:w-200 mx-auto mt-10">
        <section>
          <div className="mb-8 flex items-baseline gap-3 font-mono text-2xl">
            <ShrinkingStat />
            <span className="text-[var(--color-muted,#8a8f98)]">
              → your download
            </span>
          </div>
          <p className="leading-relaxed">
            Most compression tools work by uploading your photo to a server,
            squeezing it somewhere else, then sending it back. Squeeze skips the
            round trip. The compression runs on your machine, in the tab you
            already have open, using the same browser APIs that power the rest
            of the page. Nothing is stored. Nothing is queued. Close the tab and
            it's gone.
          </p>
        </section>

        <section>
          <h2 className="mb-3 font-mono text-xl mt-10 uppercase tracking-[0.18em] text-[var(--color-muted,#8a8f98)]">
            Why it exists
          </h2>
          <p className="leading-relaxed ">
            Squeeze started as a simple frustration: shrinking a handful of
            images shouldn't mean signing up for an account, waiting on an
            upload bar, or wondering where your files end up in the meantime.
            It's built for people who need a quick, private, no-drama way to
            bring image sizes down before they go into a site, an email, or a
            deck.
          </p>
        </section>

        <section>
          <h2 className="mb-4 mt-10 text-xl font-mono uppercase tracking-[0.18em] text-[var(--color-muted,#8a8f98)]">
            How it works
          </h2>
          <dl className="grid gap-6 sm:grid-cols-3">
            {[
              {
                k: "01",
                label: "Drop",
                desc: "Drag an image in, or choose a file.",
              },
              {
                k: "02",
                label: "Compress",
                desc: "Your browser does the work, on-device.",
              },
              {
                k: "03",
                label: "Compare",
                desc: "Check the before/after, then download.",
              },
            ].map((step) => (
              <div
                key={step.k}
                className="rounded-lg border border-[var(--color-border,#232629)] p-4"
              >
                <p className="mb-2 font-mono text-xs text-signal text-[1rem]">
                  {step.k}
                </p>
                <p className="mb-1 font-medium">{step.label}</p>
                <p className="text-sm text-[var(--color-muted,#8a8f98)]">
                  {step.desc}
                </p>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-10 mb-20 rounded-lg border border-[var(--color-border,#232629)] p-6">
          <h2 className="mb-2 font-medium">
            Questions, feedback, or a bug to report?
          </h2>
          <p className="mb-4 text-sm text-[var(--color-muted,#8a8f98)]">
            Reach out on the contact page — a real person reads every message.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-signal px-4 py-2 text-sm font-medium text-[var(--color-bg,#0b0d0f)] transition-opacity hover:opacity-90"
          >
            Get in touch →
          </Link>
        </section>
      </div>
    </>
  );
}
