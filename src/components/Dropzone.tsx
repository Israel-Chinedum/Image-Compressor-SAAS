import { useCallback, useRef } from "react";
import { useUpload } from "@/contexts/UploadContext";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";

export function Dropzone() {
  const { addFiles } = useUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (files: FileList) => addFiles(files),
    [addFiles],
  );

  const { isDraggingOver, dragHandlers } = useDragAndDrop({
    onDrop: handleDrop,
  });

  return (
    <div
      className={`group relative flex cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 border-dashed px-8 py-16 text-center transition-colors duration-200 ${
        isDraggingOver
          ? "border-signal-deep bg-signal-deep/5 dark:border-signal dark:bg-signal/5"
          : "border-(--border-color-strong) hover:border-(--fg-muted)"
      }`}
      {...dragHandlers}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Drop images here or click to browse"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="sr-only"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div
        className={`grid h-16 w-16 place-items-center rounded-full border border-(--border-color-strong) text-(--fg-muted) transition-transform duration-300 ${
          isDraggingOver ? "scale-110 text-(--accent)" : "group-hover:scale-105"
        }`}
        aria-hidden="true"
      >
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 6v20m0 0l-7-7m7 7l7-7M8 30h24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="font-display text-xl font-bold">
        Drop images, or click to browse
      </p>
      <p className="text-sm text-(--fg-muted)">
        JPEG, PNG, WebP, GIF — as many as you like
      </p>
    </div>
  );
}
