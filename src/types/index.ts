export type CompressionStatus =
  | 'queued'
  | 'compressing'
  | 'done'
  | 'error';

export type OutputFormat = 'original' | 'jpeg' | 'png' | 'webp';

export interface CompressionSettings {
  quality: number; // 0.1–1
  maxWidthOrHeight: number; // px, 0 = no resize
  format: OutputFormat;
  preserveExif: boolean;
}

export interface UploadItem {
  id: string;
  file: File;
  originalUrl: string;
  originalSize: number;
  status: CompressionStatus;
  resultBlob?: Blob;
  resultUrl?: string;
  resultSize?: number;
  error?: string;
  width?: number;
  height?: number;
}

export interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
