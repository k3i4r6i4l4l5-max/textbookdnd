import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = { title: string; description: string; icon: LucideIcon; className?: string; meta?: string } & ({ to: string; onClick?: never } | { onClick: () => void; to?: never });
export default function OrnamentalCard({ title, description, icon: Icon, onClick, to, className = '', meta }: Props) {
  const content = <><span className="category-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.5} /></span><div className="category-copy"><h2>{title}</h2><p>{description}</p></div>{meta && <span className="category-meta">{meta}</span>}<span className="category-arrow" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={1.5} /></span></>;
  return to ? <Link className={`ornamental-card ${className}`} to={to}>{content}</Link> : <button className={`ornamental-card ${className}`} onClick={onClick}>{content}</button>;
}
