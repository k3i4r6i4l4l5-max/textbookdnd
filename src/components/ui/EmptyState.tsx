import type { LucideIcon } from 'lucide-react';

type Props = { title: string; description?: string; icon?: LucideIcon; chess?: boolean };
export default function EmptyState({ title, description, icon: Icon, chess }: Props) {
  return <div className="empty-state"><div className="empty-emblem" aria-hidden="true">{chess ? <span>♙</span> : Icon ? <Icon size={32} strokeWidth={1.5} /> : <span>◇</span>}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}
