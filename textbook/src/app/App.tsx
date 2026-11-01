import { HashRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import HomePage from '../pages/HomePage';
import CharactersPage from '../pages/CharactersPage';
import WorldPage from '../pages/WorldPage';
import BeyondPage from '../pages/BeyondPage';
import CharacterPage from '../pages/CharacterPage';
import { Link } from 'react-router-dom';
import { beyondCategories } from '../data/beyond';

function LegacyCharacterRedirect() {
  const { characterId } = useParams();
  const { search } = useLocation();
  return <Navigate to={`/characters/${encodeURIComponent(characterId ?? '')}${search}`} replace />;
}

function LegacyCatalogRedirect() {
  const { search } = useLocation();
  return <Navigate to={`/characters${search}`} replace />;
}

export default function App() {
  return <HashRouter><Routes><Route element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path="characters" element={<CharactersPage />} />
    <Route path="characters/:characterId" element={<CharacterPage />} />
    <Route path="figures" element={<LegacyCatalogRedirect />} />
    <Route path="world" element={<WorldPage />} />
    <Route path="beyond" element={<BeyondPage />} />
    {beyondCategories.map(category => <Route key={category.id} path={`beyond/${category.id}`} element={<Navigate to={category.path} replace />} />)}
    <Route path="beyond/:categoryId/:characterId" element={<LegacyCharacterRedirect />} />
    <Route path="*" element={<div className="page not-found"><h1>Эта страница не найдена</h1><Link className="text-link" to="/">Вернуться в архив</Link></div>} />
  </Route></Routes></HashRouter>;
}
