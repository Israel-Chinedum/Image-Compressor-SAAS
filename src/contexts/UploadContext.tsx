import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { CompressionSettings, UploadItem } from '@/types';
import { compressImage, getImageDimensions } from '@/utils/compression';

interface UploadContextValue {
  items: UploadItem[];
  settings: CompressionSettings;
  updateSettings: (patch: Partial<CompressionSettings>) => void;
  addFiles: (files: FileList | File[]) => void;
  removeItem: (id: string) => void;
  clearAll: () => void;
  recompressAll: () => void;
  isProcessing: boolean;
}

const UploadContext = createContext<UploadContextValue | undefined>(undefined);

const DEFAULT_SETTINGS: CompressionSettings = {
  quality: 0.75,
  maxWidthOrHeight: 0,
  format: 'original',
  preserveExif: false,
};

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function UploadProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<UploadItem[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>(DEFAULT_SETTINGS);
  const processingCount = useRef(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateSettings = useCallback((patch: Partial<CompressionSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const runCompression = useCallback(
    async (item: UploadItem, currentSettings: CompressionSettings) => {
      processingCount.current += 1;
      setIsProcessing(true);
      setItems((prev) =>
        prev.map((it) =>
          it.id === item.id ? { ...it, status: 'compressing', error: undefined } : it
        )
      );

      try {
        const blob = await compressImage(item.file, currentSettings);
        const url = URL.createObjectURL(blob);
        const dims = await getImageDimensions(blob).catch(() => undefined);

        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? {
                  ...it,
                  status: 'done',
                  resultBlob: blob,
                  resultUrl: url,
                  resultSize: blob.size,
                  width: dims?.width ?? it.width,
                  height: dims?.height ?? it.height,
                }
              : it
          )
        );
      } catch (err) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? {
                  ...it,
                  status: 'error',
                  error:
                    err instanceof Error ? err.message : 'Compression failed',
                }
              : it
          )
        );
      } finally {
        processingCount.current -= 1;
        if (processingCount.current <= 0) setIsProcessing(false);
      }
    },
    []
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList).filter((f) =>
        ACCEPTED_TYPES.includes(f.type)
      );
      if (files.length === 0) return;

      const newItems: UploadItem[] = files.map((file) => ({
        id: makeId(),
        file,
        originalUrl: URL.createObjectURL(file),
        originalSize: file.size,
        status: 'queued',
      }));

      setItems((prev) => [...prev, ...newItems]);
      newItems.forEach((item) => {
        void runCompression(item, settings);
      });
    },
    [settings, runCompression]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const target = prev.find((it) => it.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        if (target.resultUrl) URL.revokeObjectURL(target.resultUrl);
      }
      return prev.filter((it) => it.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    setItems((prev) => {
      prev.forEach((it) => {
        URL.revokeObjectURL(it.originalUrl);
        if (it.resultUrl) URL.revokeObjectURL(it.resultUrl);
      });
      return [];
    });
  }, []);

  const recompressAll = useCallback(() => {
    items.forEach((item) => {
      void runCompression(item, settings);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, settings, runCompression]);

  const value = useMemo<UploadContextValue>(
    () => ({
      items,
      settings,
      updateSettings,
      addFiles,
      removeItem,
      clearAll,
      recompressAll,
      isProcessing,
    }),
    [items, settings, updateSettings, addFiles, removeItem, clearAll, recompressAll, isProcessing]
  );

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}

export function useUpload(): UploadContextValue {
  const ctx = useContext(UploadContext);
  if (!ctx) throw new Error('useUpload must be used within an UploadProvider');
  return ctx;
}
