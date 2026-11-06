import { useEffect, useRef } from 'react';
import { BookOpen, X } from 'lucide-react';
import type { ReactNode } from 'react';
import EmptyState from './EmptyState';

export default function SectionDialog({ title, children, onClose }: { title: string; children?: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const dialog = ref.current!;
    triggerRef.current ??= document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = originalOverflow; triggerRef.current?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className="section-dialog" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }} aria-labelledby="dialog-title"><div className="dialog-heading"><h2 id="dialog-title">{title}</h2><button className="icon-button" aria-label="Закрыть раздел" onClick={onClose}><X size={22} /></button></div>{children ?? <EmptyState icon={BookOpen} title="Раздел пока не заполнен" description="Здесь появятся материалы мира, когда они будут добавлены в архив." />}</dialog>;
}
