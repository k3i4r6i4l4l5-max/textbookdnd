import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Crown, Menu, X } from 'lucide-react';

const links = [{ to: '/', label: 'Главная' }, { to: '/characters', label: 'Персонажи' }, { to: '/world', label: 'Мир' }, { to: '/beyond', label: 'За Доской' }];

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); menuRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="site-header"><div className="header-inner">
    <Link to="/" className="brand" aria-label="Архив Доски, главная"><span className="brand-mark" aria-hidden="true"><Crown size={22} strokeWidth={1.6} /></span><span>Архив Доски</span></Link>
    <nav aria-label="Основная навигация" id="main-navigation" className={open ? 'navigation is-open' : 'navigation'}>
      {links.map(({ to, label }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
    </nav>
    <div className="header-end"><span className="header-label">Энциклопедия мира</span><button ref={menuRef} className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} aria-controls="main-navigation">{open ? <X size={21} /> : <Menu size={21} />}</button></div>
  </div></header>;
}
