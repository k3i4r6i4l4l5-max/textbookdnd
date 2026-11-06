import { attributes } from './attributes';
import { characterRoles } from './roles';
import type { Character, CharacterFiltersState, CharacterSide } from '../types/character';

export const characterSides = [
  { id: 'white', name: 'Белые', singular: 'Белая' },
  { id: 'black', name: 'Чёрные', singular: 'Чёрная' },
  { id: 'neutral', name: 'Нейтральные', singular: 'Нейтральная' },
  { id: 'unknown', name: 'Неизвестная', singular: 'Неизвестна' },
] as const;

function selectedIds<T extends string>(params: URLSearchParams, key: string, available: readonly T[]): T[] {
  const requested = new Set(params.getAll(key));
  return available.filter(id => requested.has(id));
}

export function readCharacterFilters(params: URLSearchParams): CharacterFiltersState {
  return {
    sides: selectedIds(params, 'side', characterSides.map(item => item.id)),
    attributes: selectedIds(params, 'attribute', attributes.map(item => item.id)),
    roles: selectedIds(params, 'role', characterRoles.map(item => item.id)),
  };
}

/** OR within a group, AND between groups. Unknown attributes never match a known one. */
export function filterCharacters(characters: Character[], filters: CharacterFiltersState): Character[] {
  return characters.filter(character =>
    (!filters.sides.length || filters.sides.includes(character.side ?? 'unknown')) &&
    (!filters.attributes.length || (Array.isArray(character.attributes) && filters.attributes.some(id => character.attributes?.includes(id)))) &&
    (!filters.roles.length || filters.roles.some(id => character.roles?.includes(id)))
  );
}

export function characterTheme(sides: CharacterSide[]): CharacterSide | 'all' {
  return sides.length === 1 ? sides[0] : 'all';
}
