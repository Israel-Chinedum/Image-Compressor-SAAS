import { useSearchParams } from "react-router-dom";
import { useUpload } from "@/contexts/UploadContext";
import { CompareSlider } from "@/components/CompareSlider";
import { AdSlot } from "@/components/AdSlot";
import { formatBytes, reductionPercent } from "@/utils/compression";

export function Compare() {
  const { items } = useUpload();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const done = items.filter((i) => i.status === "done" && i.resultUrl);
  const active = done.find((i) => i.id === id) ?? done[0];

  if (done.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Nothing to compare yet</h1>
        <p className="text-(--fg-muted)">
          Compress an image on the Compress page, then come back here to see it
          side by side.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
      <div>
        <h1 className="text-3xl font-bold">Before &amp; after</h1>
        <p className="mt-1 text-(--fg-muted)">
          Drag the handle to compare, or use the arrow keys.
        </p>
      </div>

      {active && (
        <>
          <CompareSlider
            beforeSrc={active.originalUrl}
            afterSrc={active.resultUrl!}
          />

          <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-(--border-color) bg-(--bg-raised) px-6 py-4 font-mono text-sm">
            <span>{active.file.name}</span>
            <span className="text-(--fg-muted)">
              {formatBytes(active.originalSize)} →{" "}
              {formatBytes(active.resultSize ?? 0)}
            </span>
            <span className="text-signal-deep dark:text-signal">
              −{reductionPercent(active.originalSize, active.resultSize ?? 0)}%
            </span>
          </div>
        </>
      )}

      {done.length > 1 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-(--fg-muted)">
            Other compressed images
          </p>
          <div className="flex flex-wrap gap-2">
            {done.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSearchParams({ id: item.id })}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  item.id === active?.id
                    ? "border-transparent bg-(--fg) text-(--bg)"
                    : "border-(--border-color-strong) hover:bg-(--bg)"
                }`}
              >
                {item.file.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <AdSlot placement="in-feed" />
    </div>
  );
}
