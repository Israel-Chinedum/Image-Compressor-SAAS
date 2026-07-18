// import { StaticPageLayout } from "./StaticPageLayout";

interface Section {
  tag: string; // byte-style tag, e.g. "0x01"
  heading: string;
  body: React.ReactNode;
}

const sections: Section[] = [
  {
    tag: "0x01",
    heading: "Your images never leave your device",
    body: (
      <p>
        Squeeze compresses images using your browser's own processing power.
        When you drop a file in, it's read and compressed locally — it is never
        uploaded to a server, never stored in a database, and never seen by
        anyone but you. Closing or refreshing the tab clears it completely.
      </p>
    ),
  },
  {
    tag: "0x02",
    heading: "What's collected",
    body: (
      <>
        <p className="mb-3">
          Squeeze aims to collect as little as possible. Currently that
          includes:
        </p>
        <ul className="list-inside list-disc space-y-2 marker:text-signal">
          <li>
            <span className="font-medium">Basic usage analytics</span> —
            anonymized, aggregate data like page views and browser type, used to
            understand which features get used and to catch bugs. This does not
            include the contents or names of any files you compress.
          </li>
          <li>
            <span className="font-medium">Contact form submissions</span> — if
            you use the contact page, the name, email, and message you provide
            are sent to handle your request and aren't used for anything else.
          </li>
        </ul>
      </>
    ),
  },
  {
    tag: "0x03",
    heading: "Cookies & local storage",
    body: (
      <p>
        Squeeze may use your browser's local storage to remember simple
        preferences — like whether you prefer light or dark mode — on your own
        device. This information isn't transmitted anywhere and isn't used for
        tracking or advertising.
      </p>
    ),
  },
  {
    tag: "0x04",
    heading: "Third parties",
    body: (
      <p>
        Squeeze may display ads through third-party ad networks, which can use
        their own cookies or similar technology in line with their own privacy
        policies. Squeeze doesn't share any file content with these networks,
        since that content never reaches a server in the first place. The
        contact form is handled by a third-party email delivery service solely
        to route messages to the site's maintainer.
      </p>
    ),
  },
  {
    tag: "0x05",
    heading: "Children's privacy",
    body: (
      <p>
        Squeeze isn't directed at children and doesn't knowingly collect
        information from anyone under 13.
      </p>
    ),
  },
  {
    tag: "0x06",
    heading: "Changes to this policy",
    body: (
      <p>
        If this policy changes, the update will be posted here with a new
        effective date below. Continued use of Squeeze after a change means you
        accept the updated terms.
      </p>
    ),
  },
  {
    tag: "0x07",
    heading: "Contact",
    body: (
      <p>
        Squeeze is built and maintained by an independent developer, not a
        company. Questions about this policy or your data can go to{" "}
        <a
          href="mailto:hello@squeeze.app"
          className="text-signal underline underline-offset-2"
        >
          hello@squeeze.app
        </a>{" "}
        or through the{" "}
        <a href="/contact" className="text-signal underline underline-offset-2">
          contact page
        </a>
        .
      </p>
    ),
  },
];

export function PrivacyPage() {
  const effectiveDate = "July 11, 2026";

  return (
    <>
      {/* eyebrow="privacy policy" title="Your files stay yours." dek=
      {`Effective ${effectiveDate}. Plain-language summary: nothing you compress is ever uploaded or stored.`} */}
      <div className="w-200 mx-auto mt-10 mb-20">
        <div className="space-y-10">
          {sections.map((s) => (
            <section
              key={s.tag}
              className="border-l-2 border-[var(--color-border,#232629)] pl-5"
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="font-mono text-xs text-signal">{s.tag}</span>
                <h2 className="font-medium text-xl text-(--fg-muted)">
                  {s.heading}
                </h2>
              </div>
              <div className="leading-relaxed text-[var(--color-fg,#e8e6e1)]/90">
                {s.body}
              </div>
            </section>
          ))}
        </div>
        <p className="pt-4 font-mono text-xs text-[var(--color-muted,#8a8f98)]">
          This is a template — replace the contact email and confirm the
          analytics/ad details match what's actually integrated before
          publishing.
        </p>
      </div>
    </>
  );
}
