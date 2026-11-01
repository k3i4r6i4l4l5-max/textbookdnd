import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

export default function Footer() {
  return <footer className="site-footer"><div className="footer-inner"><Link to="/" className="footer-brand"><Crown size={17} strokeWidth={1.6} aria-hidden="true" />Архив Доски</Link><span className="footer-note">Мир авторской D&D-кампании</span></div></footer>;
}
