import { useUpload } from "@/contexts/UploadContext";
import type { OutputFormat } from "@/types";

const FORMATS: { value: OutputFormat; label: string }[] = [
  { value: "original", label: "Keep original" },
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
];

const RESIZE_PRESETS = [
  { value: 0, label: "No resize" },
  { value: 3840, label: "4K · 3840px" },
  { value: 1920, label: "Full HD · 1920px" },
  { value: 1280, label: "HD · 1280px" },
  { value: 800, label: "Web · 800px" },
];

const selectClasses =
  "w-full rounded-lg border border-[var(--border-color-strong)] bg-[var(--bg)] px-3 py-2 text-sm";

export function SettingsPanel() {
  const { settings, updateSettings, recompressAll, items, isProcessing } =
    useUpload();

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-(--border-color) bg-(--bg-raised) p-5">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="quality-slider"
          className="flex items-center justify-between text-sm font-medium"
        >
          Quality
          <span className="font-mono text-xs text-(--fg-muted)">
            {Math.round(settings.quality * 100)}
          </span>
        </label>
        <input
          id="quality-slider"
          type="range"
          min={10}
          max={100}
          step={5}
          value={settings.quality * 100}
          onChange={(e) =>
            updateSettings({ quality: Number(e.target.value) / 100 })
          }
          className="w-full accent-(--accent)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="resize-select" className="text-sm font-medium">
          Max dimension
        </label>
        <select
          id="resize-select"
          className={selectClasses}
          value={settings.maxWidthOrHeight}
          onChange={(e) =>
            updateSettings({ maxWidthOrHeight: Number(e.target.value) })
          }
        >
          {RESIZE_PRESETS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="format-select" className="text-sm font-medium">
          Output format
        </label>
        <select
          id="format-select"
          className={selectClasses}
          value={settings.format}
          onChange={(e) =>
            updateSettings({ format: e.target.value as OutputFormat })
          }
        >
          {FORMATS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={settings.preserveExif}
          onChange={(e) => updateSettings({ preserveExif: e.target.checked })}
          className="h-4 w-4 accent-(--accent)"
        />
        Preserve EXIF data
      </label>

      {items.length > 0 && (
        <button
          type="button"
          className="mt-1 w-full rounded-full border border-(--border-color-strong) py-2 text-sm font-medium transition-colors hover:bg-(--bg) disabled:opacity-50"
          onClick={recompressAll}
          disabled={isProcessing}
        >
          {isProcessing ? "Compressing…" : "Re-apply to all"}
        </button>
      )}
    </div>
  );
}
