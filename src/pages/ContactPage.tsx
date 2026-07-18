import Seo from "@/components/SEO";
import { useState, type FormEvent } from "react";
// import { StaticPageLayout } from "./StaticPageLayout";
// import { sendContactMessage } from "../lib/emailjs";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // setStatus("sending");
    // try {
    //   await sendContactMessage({ name, email, message });
    //   setStatus("sent");
    //   setName("");
    //   setEmail("");
    //   setMessage("");
    // } catch (err) {
    //   console.error("Contact form send failed:", err);
    //   setStatus("error");
    // }
  };

  return (
    <>
      <Seo title="Squeeze - Contact us" />
      {status === "sent" ? (
        <div className="rounded-lg border border-[var(--color-accent,#7dd3c0)]/40 bg-[var(--color-accent,#7dd3c0)]/10 p-6">
          <p className="font-medium text-[var(--color-accent,#7dd3c0)]">
            Sent.
          </p>
          <p className="mt-1 text-sm text-[var(--color-muted,#8a8f98)]">
            Thanks for writing in — expect a reply soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 font-mono text-xs text-[var(--color-muted,#8a8f98)] underline underline-offset-2 hover:text-[var(--color-fg,#e8e6e1)]"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-[80dvw] mx-auto mt-20 sm:w-100"
          noValidate
        >
          <h1 className="text-4xl text-center">
            Contact <span className="text-signal">us</span>
          </h1>
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-mono text-xs uppercase tracking-wide text-[var(--color-muted,#8a8f98)]"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full rounded-md border border-[var(--color-border,#232629)] bg-transparent px-4 py-3 text-[var(--color-fg,#e8e6e1)] placeholder:text-[var(--color-muted,#8a8f98)]/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-[var(--color-accent,#7dd3c0)]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-mono text-xs uppercase tracking-wide text-[var(--color-muted,#8a8f98)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-[var(--color-border,#232629)] bg-transparent px-4 py-3 text-[var(--color-fg,#e8e6e1)] placeholder:text-[var(--color-muted,#8a8f98)]/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-[var(--color-accent,#7dd3c0)]"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-mono text-xs uppercase tracking-wide text-[var(--color-muted,#8a8f98)]"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              placeholder="What's on your mind?"
              className="w-full resize-none rounded-md border border-[var(--color-border,#232629)] bg-transparent px-4 py-3 text-[var(--color-fg,#e8e6e1)] placeholder:text-[var(--color-muted,#8a8f98)]/60 focus:border-signal focus:outline-none focus:ring-1 focus:ring-[var(--color-accent,#7dd3c0)]"
            />
          </div>

          {status === "error" && (
            <p className="font-mono text-sm text-red-400">
              Something went wrong sending that. Try again, or email directly at{" "}
              <a
                href="mailto:hello@squeeze.app"
                className="underline underline-offset-2"
              >
                hello@squeeze.app
              </a>
              .
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mb-10 w-full rounded-md bg-signal px-4 py-3 text-sm font-medium text-gray-900 text-[1rem] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </>
  );
}
