export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center">
        <p className="text-sm text-[var(--fg-muted)]">
          Everything runs in your browser. Nothing you drop here is uploaded
          anywhere.
        </p>
        <p className="font-mono text-xs text-[var(--fg-muted)]">
          © {new Date().getFullYear()} Squeeze
        </p>
      </div>
      <nav className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
        <a href="/" className="hover:text-signal transition-colors">
          Home
        </a>
        <a href="/about" className="hover:text-signal transition-colors">
          About Us
        </a>
        <a href="/compare" className="hover:text-signal transition-colors">
          Compare Engine
        </a>
        <a href="/pricing" className="hover:text-signal transition-colors">
          Pricing Tiers
        </a>
        <a href="/contact" className="hover:text-signal transition-colors">
          Get in Touch
        </a>
        <a href="/privacy" className="hover:text-signal transition-colors">
          Privacy Policy
        </a>
      </nav>
    </footer>
  );
}
