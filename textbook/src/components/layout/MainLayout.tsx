import { useEffect, useRef, useState } from 'react';
import { matchPath, Outlet, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { findCharacter } from '../../data/characters';
import { characterTheme, readCharacterFilters } from '../../data/characterFilters';

const titles: Record<string, string> = { '/': 'Архив Доски', '/characters': 'Персонажи', '/world': 'Мир', '/beyond': 'За пределами Доски' };

export default function MainLayout() {
  const { pathname, search } = useLocation();
  const characterMatch = matchPath('/characters/:characterId', pathname);
  const character = findCharacter(characterMatch?.params.characterId);
  const pageTitle = character?.name ?? (characterMatch ? 'Персонаж не найден' : titles[pathname] ?? 'Страница не найдена');
  const theme = pathname === '/characters' ? characterTheme(readCharacterFilters(new URLSearchParams(search)).sides) : character ? character.side ?? 'unknown' : undefined;
  const [showTop, setShowTop] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = pathname === '/' ? 'Архив Доски' : `${pageTitle} | Архив Доски`;
    if (previousPath.current !== pathname) mainRef.current?.focus({ preventScroll: true });
    previousPath.current = pathname;
  }, [pathname, pageTitle]);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className={`app-shell ${pathname === '/beyond' ? 'beyond-theme' : ''}`} data-character-theme={theme}>
    <a href="#main-content" className="skip-link" onClick={event => { event.preventDefault(); mainRef.current?.focus(); }}>Перейти к содержимому</a>
    <Header /><main id="main-content" tabIndex={-1} ref={mainRef}><div key={pathname} className="route-enter"><Outlet /></div></main><Footer />
    {showTop && <button className="back-to-top" aria-label="Вернуться наверх" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowUp size={18} /></button>}
  </div>;
}
