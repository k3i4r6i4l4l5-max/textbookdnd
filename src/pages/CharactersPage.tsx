import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import EmptyState from '../components/ui/EmptyState';
import CharacterFilters from '../components/characters/CharacterFilters';
import type { FilterKey } from '../components/characters/CharacterFilters';
import CharacterPortrait from '../components/characters/CharacterPortrait';
import { characters } from '../data/characters';
import { filterCharacters, readCharacterFilters } from '../data/characterFilters';
import { characterRoles } from '../data/roles';

export default function CharactersPage() {
  const [params, setParams] = useSearchParams();
  const { search } = useLocation();
  const filters = readCharacterFilters(params);
  const filtered = filterCharacters(characters, filters);
  const activeCount = filters.sides.length + filters.roles.length + filters.attributes.length;
  function toggle(key: FilterKey, value: string) {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      const values = next.getAll(key);
      const selected = values.includes(value) ? values.filter(id => id !== value) : [...values, value];
      next.delete(key);
      selected.forEach(id => next.append(key, id));
      return next;
    });
  }
  function clear(key?: FilterKey) {
    setParams(previous => {
      const next = new URLSearchParams(previous);
      (key ? [key] : ['side', 'attribute', 'role']).forEach(name => next.delete(name));
      return next;
    });
  }
  return <div className="page inner-page characters-page">
    <SectionTitle chapter="Лица истории" title="Персонажи" subtitle="Сторона, природа существования и роль в мире. Найдите тех, чью историю хотите узнать." />
    <CharacterFilters filters={filters} onToggle={toggle} onClear={clear} />
    <div className="catalog-toolbar characters-toolbar"><span className="catalog-count" role="status">Найдено персонажей <strong>{filtered.length}</strong></span>
      {!!activeCount && <button type="button" className="reset-filters" onClick={() => clear()}><RotateCcw size={15} aria-hidden="true" />Сбросить фильтры</button>}
    </div>
    <section aria-label="Каталог персонажей">{filtered.length ? <div className="character-grid">{filtered.map(character => <Link key={character.id} className="portrait-button" to={`/characters/${character.id}${search}`} aria-label={`Открыть страницу персонажа ${character.name}`}>
      <CharacterPortrait character={character} className="portrait-image" />
      <span className="portrait-caption"><span>{character.name}</span><ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" /></span>
      {!!character.roles?.length && <span className="portrait-roles">{characterRoles.filter(role => character.roles?.includes(role.id)).map(role => role.name).join(', ')}</span>}
    </Link>)}</div> : <div className="catalog-panel"><EmptyState chess title={characters.length ? 'Персонажи не найдены' : 'В архиве пока нет персонажей'} description={characters.length ? 'Измените выбранные трейты или сбросьте фильтры.' : 'Их истории появятся после добавления в архив.'} />{!!activeCount && <button type="button" className="empty-reset" onClick={() => clear()}>Сбросить фильтры</button>}</div>}</section>
  </div>;
}
