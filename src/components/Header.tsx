import { NavLink } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { to: "/", label: "Compress" },
  { to: "/compare", label: "Compare" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-(--border-color) bg-(--bg)/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight"
          aria-label="Squeeze home"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-signal-deep text-ink dark:bg-signal)">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M2 2l4.5 5.5L2 13M13 2L8.5 7.5 13 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Squeeze
        </NavLink>

        <nav
          className="hidden items-center gap-1 rounded-full border border-(--border-color) p-1 sm:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-(--fg) text-(--bg)"
                    : "text-(--fg-muted) hover:text-(--fg)"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          aria-pressed={theme === "dark"}
          className="relative h-7 w-12 shrink-0 rounded-full border border-(--border-color-strong) bg-(--bg-raised) transition-colors"
        >
          {/* <span
            className={` top-0 h-5 w-5 rounded-full bg-signal transition-transform duration-300 dark:bg-signal ${
              theme === "dark" ? "" : ""
            }`}
          ></span> */}
          <div
            className={`bg-signal h-5 w-5 rounded-full ${theme === "dark" ? "ml-auto" : ""}`}
          ></div>
        </button>
      </div>
    </header>
  );
}
