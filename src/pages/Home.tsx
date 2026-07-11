import { useUpload } from "@/contexts/UploadContext";
import { Dropzone } from "@/components/Dropzone";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ImageCard } from "@/components/ImageCard";
import { AdSlot } from "@/components/AdSlot";
import { useCountUp } from "@/hooks/useCountUp";
import { formatBytes } from "@/utils/compression";
import Seo from "@/components/SEO";

function useSavingsTotals() {
  const { items } = useUpload();
  const done = items.filter((i) => i.status === "done" && i.resultSize);
  const originalTotal = done.reduce((sum, i) => sum + i.originalSize, 0);
  const resultTotal = done.reduce((sum, i) => sum + (i.resultSize ?? 0), 0);
  const saved = originalTotal - resultTotal;
  const pct = originalTotal > 0 ? Math.round((saved / originalTotal) * 100) : 0;
  return { count: done.length, saved, pct };
}

export function Home() {
  const { items } = useUpload();
  const { count, saved, pct } = useSavingsTotals();
  const animatedPct = useCountUp(pct, 700, count > 0);

  return (
    <>
      <Seo title="Squeeze - Home" />
      <div className="relative w-full">
        <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 py-12">
          <AdSlot
            placement="sidebar"
            className={`absolute top-10 left-10 hidden xl:w-[270px] 2xl:w-[300px] xl:flex 2xl:h-[70dvh]`}
          />
          <AdSlot
            placement="sidebar"
            className={`absolute top-10 left-[100%] xl:w-[270px] 2xl:w-[300px] translate-x-[-110%] hidden xl:flex 2xl:h-[70dvh]`}
          />
          <section className="flex flex-col items-center gap-4 text-center">
            <span className="rounded-full border border-(--border-color-strong) px-3 py-1 font-mono text-xs text-(--fg-muted)">
              Runs entirely in your browser
            </span>
            <h1 className="max-w-2xl text-4xl font-extrabold sm:text-5xl">
              Shrink your images.{" "}
              <span className="text-signal-deep dark:text-signal">
                Keep the quality.
              </span>
            </h1>
            <p className="max-w-lg text-(--fg-muted)">
              Drop in JPEGs, PNGs, or WebPs. Get smaller files back in seconds —
              nothing ever leaves your device.
            </p>

            <AdSlot
              placement="leaderboard"
              className={`top-10 left-10 xl:hidden h-60!`}
            />

            {count > 0 && (
              <div className="mt-2 flex items-center gap-6 rounded-2xl border border-(--border-color) bg-[var(--bg-raised) px-6 py-4">
                <div className="text-left">
                  <p className="font-mono text-2xl font-semibold">{count}</p>
                  <p className="text-xs text-(--fg-muted)">files compressed</p>
                </div>
                <div className="h-8 w-px bg-(--border-color)" />
                <div className="text-left">
                  <p className="font-mono text-2xl font-semibold text-signal-deep dark:text-signal">
                    {formatBytes(saved)}
                  </p>
                  <p className="text-xs text-(--fg-muted)">saved</p>
                </div>
                <div className="h-8 w-px bg-(--border-color)" />
                <div className="text-left">
                  <p className="font-mono text-2xl font-semibold">
                    {animatedPct}%
                  </p>
                  <p className="text-xs text-(--fg-muted)">
                    smaller on average
                  </p>
                </div>
              </div>
            )}
          </section>

          <section className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-8">
              <Dropzone />

              {items.length > 0 && (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => (
                    <ImageCard key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            <aside className="flex flex-col gap-6">
              <SettingsPanel />
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}
