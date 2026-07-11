export function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center">
        <p className="text-sm text-[var(--fg-muted)]">
          Everything runs in your browser. Nothing you drop here is uploaded anywhere.
        </p>
        <p className="font-mono text-xs text-[var(--fg-muted)]">
          © {new Date().getFullYear()} Squeeze
        </p>
      </div>
    </footer>
  );
}
