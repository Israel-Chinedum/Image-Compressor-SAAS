import { Link } from 'react-router-dom';
import type { UploadItem } from '@/types';
import { useUpload } from '@/contexts/UploadContext';
import {
  downloadBlob,
  formatBytes,
  reductionPercent,
  suggestOutputFilename,
} from '@/utils/compression';

interface ImageCardProps {
  item: UploadItem;
}

export function ImageCard({ item }: ImageCardProps) {
  const { removeItem, settings } = useUpload();
  const pct =
    item.status === 'done' && item.resultSize
      ? reductionPercent(item.originalSize, item.resultSize)
      : null;

  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-raised)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg)]">
        <img src={item.originalUrl} alt="" className="h-full w-full object-cover" />
        {item.status === 'compressing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50 text-sm text-white">
            <span
              className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden="true"
            />
            <span>Compressing…</span>
          </div>
        )}
        {item.status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-coral)]/90 px-4 text-center text-sm text-white">
            Couldn't compress this file
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="truncate text-sm font-medium" title={item.file.name}>
          {item.file.name}
        </p>

        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--fg-muted)]">
          <span>{formatBytes(item.originalSize)}</span>
          {item.status === 'done' && item.resultSize && (
            <>
              <span aria-hidden="true">→</span>
              <span className="text-[var(--fg)]">{formatBytes(item.resultSize)}</span>
              {pct !== null && pct > 0 && (
                <span className="rounded-full bg-[var(--color-signal-deep)]/10 px-2 py-0.5 text-[var(--color-signal-deep)] dark:bg-[var(--color-signal)]/10 dark:text-[var(--color-signal)]">
                  −{pct}%
                </span>
              )}
            </>
          )}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {item.status === 'done' && item.resultBlob && (
            <>
              <button
                type="button"
                className="rounded-full bg-[var(--color-signal-deep)] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 dark:bg-[var(--color-signal)] dark:text-[var(--color-ink)]"
                onClick={() =>
                  downloadBlob(
                    item.resultBlob!,
                    suggestOutputFilename(item.file.name, settings.format)
                  )
                }
              >
                Download
              </button>
              <Link
                to={`/compare?id=${item.id}`}
                className="rounded-full border border-[var(--border-color-strong)] px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[var(--bg)]"
              >
                Compare
              </Link>
            </>
          )}
          <button
            type="button"
            className="rounded-full border border-[var(--border-color-strong)] px-3 py-1.5 text-xs font-semibold text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg)]"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
