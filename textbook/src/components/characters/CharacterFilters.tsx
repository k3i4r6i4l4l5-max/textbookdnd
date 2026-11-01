import { attributes } from '../../data/attributes';
import { characterRoles } from '../../data/roles';
import { characterSides } from '../../data/characterFilters';
import type { CharacterFiltersState } from '../../types/character';

export type FilterKey = 'side' | 'attribute' | 'role';

export default function CharacterFilters({ filters, onToggle, onClear }: {
  filters: CharacterFiltersState;
  onToggle: (key: FilterKey, value: string) => void;
  onClear: (key: FilterKey) => void;
}) {
  const groups = [
    { key: 'side', title: 'Сторона', selected: filters.sides as string[], options: characterSides },
    { key: 'role', title: 'Кем является', selected: filters.roles as string[], options: characterRoles },
    { key: 'attribute', title: 'Атрибуты', selected: filters.attributes as string[], options: attributes },
  ] as const;
  return <div className="character-filters">{groups.map(group => <fieldset className="trait-filter" key={group.key}>
    <legend>{group.title}</legend><div className="trait-options">
      <button type="button" className="trait-option" aria-pressed={!group.selected.length} onClick={() => onClear(group.key)}>Все</button>
      {group.options.map(option => <button type="button" className="trait-option" key={option.id} aria-pressed={group.selected.includes(option.id)} onClick={() => onToggle(group.key, option.id)}>
        {'image' in option && <img src={option.image} alt="" width={36} height={36} loading="lazy" />}<span>{option.name}</span>
      </button>)}
    </div>
  </fieldset>)}<p className="filter-hint">Можно выбрать несколько значений. Внутри каждой группы достаточно одного совпадения.</p></div>;
}
