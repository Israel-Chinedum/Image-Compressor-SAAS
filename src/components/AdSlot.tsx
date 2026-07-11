interface AdSlotProps {
  placement: "sidebar" | "in-feed" | "leaderboard";
  className?: string;
}

const DIMENSIONS: Record<AdSlotProps["placement"], string> = {
  sidebar: "300 × 250",
  "in-feed": "336 × 280",
  leaderboard: "728 × 90",
};

const SIZE_CLASSES: Record<AdSlotProps["placement"], string> = {
  sidebar: "h-[250px] w-full max-w-[300px]",
  "in-feed": "h-[280px] w-full max-w-[336px]",
  leaderboard: "h-[90px] w-full max-w-[728px]",
};

/**
 * Placeholder ad slot. Swap the inner div for your ad network's
 * script/iframe embed (AdSense, Ezoic, Carbon Ads, etc).
 * Kept as an isolated component so ad-network code never touches
 * app logic — safe to lazy-load or defer.
 */
export function AdSlot({ placement, className }: AdSlotProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-(--border-color-strong)] bg-(--bg-raised) ${SIZE_CLASSES[placement]} ${className ?? ""}`}
      role="complementary"
      aria-label="Advertisement"
    >
      <span className="font-mono text-xs text-(--fg-muted)">
        Ad · {DIMENSIONS[placement]}
      </span>
    </div>
  );
}
