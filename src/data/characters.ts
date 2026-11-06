import { loadCharacters } from './characterLoader';

export const characters = loadCharacters(import.meta.glob('./characters/**/*.json', { eager: true, import: 'default' }));

export function findCharacter(id?: string) {
  return characters.find(character => character.id === id);
}
