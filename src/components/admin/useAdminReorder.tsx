'use client';

import { useState, type Dispatch, type DragEvent, type SetStateAction } from 'react';
import { GripVertical } from 'lucide-react';

type Identified = { id?: string; order?: number };

export function useAdminReorder<T extends Identified>(options: {
  visibleItems: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
  enabled: boolean;
  persist: (ordered: T[]) => Promise<void>;
  onPersistError?: () => void | Promise<void>;
}) {
  const { visibleItems, setItems, enabled, persist, onPersistError } = options;
  const [dragId, setDragId] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const canDrag = enabled && !savingOrder;

  const moveItem = async (fromId: string, toId: string) => {
    if (!canDrag || fromId === toId) return;
    const from = visibleItems.findIndex((item) => item.id === fromId);
    const to = visibleItems.findIndex((item) => item.id === toId);
    if (from < 0 || to < 0) return;

    const nextVisible = [...visibleItems];
    const [moved] = nextVisible.splice(from, 1);
    nextVisible.splice(to, 0, moved);
    const orderById = new Map(
      nextVisible
        .filter((item) => item.id)
        .map((item, index) => [item.id as string, index])
    );

    setItems((prev) =>
      prev
        .map((item) =>
          item.id && orderById.has(item.id) ? { ...item, order: orderById.get(item.id)! } : item
        )
        .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
    );

    setSavingOrder(true);
    try {
      await persist(nextVisible.map((item, index) => ({ ...item, order: index })));
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save new order');
      await onPersistError?.();
    } finally {
      setSavingOrder(false);
      setDragId(null);
    }
  };

  const rowProps = (id: string) => ({
    draggable: canDrag,
    onDragStart: () => setDragId(id),
    onDragOver: (event: DragEvent) => {
      if (!canDrag) return;
      event.preventDefault();
    },
    onDrop: (event: DragEvent) => {
      event.preventDefault();
      if (dragId) moveItem(dragId, id);
      setDragId(null);
    },
    onDragEnd: () => setDragId(null),
    className: `hover:bg-gray-50/50 transition-colors ${canDrag ? 'cursor-grab' : ''} ${dragId === id ? 'opacity-50 bg-[#062516]/5' : ''}`,
  });

  return { canDrag, dragId, savingOrder, rowProps };
}

export function OrderGrip({ order, canDrag }: { order?: number | null; canDrag: boolean }) {
  return (
    <span className="inline-flex items-center justify-center gap-1 min-w-[2rem] h-8 px-2 rounded-lg bg-[#062516]/5 text-[#062516] text-sm font-bold tabular-nums">
      {canDrag ? <GripVertical className="w-4 h-4 text-gray-400" /> : null}
      {order != null && !Number.isNaN(Number(order)) ? Number(order) : '—'}
    </span>
  );
}
