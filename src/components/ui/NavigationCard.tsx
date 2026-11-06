import { ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = { to: string; title: string; description: string; icon: LucideIcon; featured?: boolean; beyond?: boolean };
export default function NavigationCard({ to, title, description, icon: Icon, featured, beyond }: Props) {
  return <Link className={`navigation-card${featured ? ' featured-card' : ''}${beyond ? ' beyond-card' : ''}`} to={to}>
    <span className="card-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.5} /></span>
    <div className="navigation-card-copy"><h3>{title}</h3><p>{description}</p></div>
    <span className="card-action">Открыть раздел<ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></span>
  </Link>;
}
