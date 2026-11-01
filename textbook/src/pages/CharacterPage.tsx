import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { findCharacter } from '../data/characters';
import { characterRoles } from '../data/roles';
import { characterSides } from '../data/characterFilters';
import CharacterAlignment from '../components/characters/CharacterAlignment';
import CharacterAttributes from '../components/characters/CharacterAttributes';
import ArtifactInventory from '../components/characters/ArtifactInventory';
import CharacterPortrait from '../components/characters/CharacterPortrait';

export default function CharacterPage() {
  const { characterId } = useParams();
  const { search } = useLocation();
  const character = findCharacter(characterId);

  if (!character) return <div className="page not-found"><h1>Персонаж не найден</h1><Link className="text-link" to="/characters">Вернуться к персонажам</Link></div>;

  const roles = characterRoles.filter(role => character.roles?.includes(role.id));
  const affiliations = (Array.isArray(character.affiliation) ? character.affiliation : [character.affiliation]).filter(Boolean);
  return <div className="page inner-page character-page">
    <Link className="back-link" to={`/characters${search}`}><ArrowLeft size={16} aria-hidden="true" />К персонажам</Link>
    <header className="section-title"><p className="chapter">Персонаж</p><h1>{character.name}</h1></header>
    <div className="character-profile">
      <CharacterPortrait character={character} className="character-portrait" />
      <section className="character-information" aria-label="Информация о персонаже">
        <dl className="character-facts">
          <div className="character-fact"><dt>Имя</dt><dd>{character.name}</dd></div>
          <div className="character-fact"><dt>Характер</dt><dd><CharacterAlignment value={character.personality} /></dd></div>
          <div className="character-fact"><dt>Сторона</dt><dd>{characterSides.find(side => side.id === (character.side ?? 'unknown'))!.singular}</dd></div>
          <div className="character-fact"><dt>Кем является</dt><dd>{roles.length ? <ul className="character-role-list">{roles.map(role => <li key={role.id}>{role.name}</li>)}</ul> : <span className="fact-empty">Пока не указано</span>}</dd></div>
          <div className="character-fact"><dt>Принадлежность</dt><dd>{affiliations.length ? <ul className="character-role-list">{affiliations.map(name => <li key={name}>{name}</li>)}</ul> : <span className="fact-empty">Не указана</span>}</dd></div>
          <div className="character-fact"><dt>Атрибуты</dt><dd><CharacterAttributes values={character.attributes} /></dd></div>
          <div className="character-fact"><dt>Артефакты</dt><dd><ArtifactInventory items={character.artifacts} /></dd></div>
        </dl>
      </section>
      <section className="character-knowledge" aria-labelledby="known-info-title">
        <h2 id="known-info-title">Что известно:</h2>
        <p className={character.knownInfo ? undefined : 'knowledge-empty'}>{character.knownInfo || 'Пока нет записей.'}</p>
      </section>
    </div>
  </div>;
}
