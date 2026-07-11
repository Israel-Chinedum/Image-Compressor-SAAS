import { useCallback, useState, type DragEvent } from 'react';

interface UseDragAndDropOptions {
  onDrop: (files: FileList) => void;
}

interface UseDragAndDropResult {
  isDraggingOver: boolean;
  dragHandlers: {
    onDragEnter: (e: DragEvent<HTMLElement>) => void;
    onDragOver: (e: DragEvent<HTMLElement>) => void;
    onDragLeave: (e: DragEvent<HTMLElement>) => void;
    onDrop: (e: DragEvent<HTMLElement>) => void;
  };
}

export function useDragAndDrop({
  onDrop,
}: UseDragAndDropOptions): UseDragAndDropResult {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [depth, setDepth] = useState(0);

  const onDragEnter = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDepth((d) => d + 1);
    setIsDraggingOver(true);
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDepth((d) => {
      const next = Math.max(0, d - 1);
      if (next === 0) setIsDraggingOver(false);
      return next;
    });
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      setIsDraggingOver(false);
      setDepth(0);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onDrop(e.dataTransfer.files);
      }
    },
    [onDrop]
  );

  return {
    isDraggingOver,
    dragHandlers: {
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop: handleDrop,
    },
  };
}
