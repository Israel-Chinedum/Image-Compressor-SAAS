import imageCompression from 'browser-image-compression';
import type { CompressionSettings } from '@/types';

const FORMAT_MIME: Record<string, string> = {
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export async function compressImage(
  file: File,
  settings: CompressionSettings
): Promise<Blob> {
  const options: Parameters<typeof imageCompression>[1] = {
    maxSizeMB: 100, // rely on quality/resize, not a hard size cutoff
    maxWidthOrHeight: settings.maxWidthOrHeight || undefined,
    useWebWorker: true,
    initialQuality: settings.quality,
    exifOrientation: settings.preserveExif ? undefined : 1,
    fileType:
      settings.format === 'original' ? undefined : FORMAT_MIME[settings.format],
  };

  const compressed = await imageCompression(file, options);
  return compressed;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 KB';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exp = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024))
  );
  const value = bytes / Math.pow(1024, exp);
  return `${exp === 0 ? value : value.toFixed(value < 10 ? 2 : 1)} ${units[exp]}`;
}

export function reductionPercent(original: number, result: number): number {
  if (original <= 0) return 0;
  return Math.round((1 - result / original) * 100);
}

export async function getImageDimensions(
  file: File | Blob
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function suggestOutputFilename(
  originalName: string,
  format: CompressionSettings['format']
): string {
  const dot = originalName.lastIndexOf('.');
  const base = dot > 0 ? originalName.slice(0, dot) : originalName;
  const ext =
    format === 'original'
      ? dot > 0
        ? originalName.slice(dot + 1)
        : 'jpg'
      : format === 'jpeg'
        ? 'jpg'
        : format;
  return `${base}-compressed.${ext}`;
}
