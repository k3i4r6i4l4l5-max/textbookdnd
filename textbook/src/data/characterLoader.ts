import { attributes } from './attributes';
import { alignments, alignmentStatuses } from './alignments';
import { characterRoles } from './roles';
import type { Character } from '../types/character';

function assetUrl(path: string) {
  return /^https?:\/\//i.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

/** JSON files are loaded by Vite; no index or metadata files belong beside them. */
export function loadCharacters(files: Record<string, unknown>): Character[] {
  const ids = new Set<string>();
  return Object.entries(files).sort(([a], [b]) => a.localeCompare(b)).map(([path, value]) => {
    const fail = (message: string): never => { throw new Error(`Ошибка в ${path}: ${message}`); };
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail('ожидается один объект персонажа');
    const record = value as Record<string, unknown>;
    if (typeof record.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id)) fail('id должен содержать строчные латинские буквы, цифры и дефисы');
    const id = record.id as string;
    if (ids.has(id)) fail(`повторяется id «${id}»`);
    ids.add(id);
    for (const field of ['name', 'description', 'image', 'knownInfo']) {
      if (record[field] !== undefined && typeof record[field] !== 'string') fail(`поле «${field}» должно быть строкой`);
    }
    if (record.affiliation !== undefined && typeof record.affiliation !== 'string' && (!Array.isArray(record.affiliation) || record.affiliation.some(item => typeof item !== 'string' || !item.trim()))) fail('affiliation должна быть строкой или массивом непустых строк');
    if (typeof record.name !== 'string' || !record.name.trim()) fail('нужно непустое name');
    if (record.roles !== undefined && (!Array.isArray(record.roles) || record.roles.some(id => !characterRoles.some(role => role.id === id)))) fail('roles должен быть массивом идентификаторов ролей');
    if (record.personality !== undefined && record.personality !== null && ![...alignments, ...alignmentStatuses].some(item => item.id === record.personality)) fail('неизвестный характер personality');
    if (record.side !== undefined && !['white', 'black', 'neutral', 'unknown'].includes(record.side as string)) fail('неизвестная сторона side');
    if (record.attributes !== undefined && record.attributes !== null && record.attributes !== 'not-applicable') {
      if (!Array.isArray(record.attributes) || record.attributes.some(id => !attributes.some(item => item.id === id))) fail('attributes должен быть массивом идентификаторов атрибутов или null');
    }
    if (record.artifacts !== undefined && record.artifacts !== null) {
      if (!Array.isArray(record.artifacts)) fail('artifacts должен быть массивом предметов или null');
      const artifactIds = new Set<string>();
      for (const artifact of record.artifacts as unknown[]) {
        if (!artifact || typeof artifact !== 'object' || Array.isArray(artifact)) fail('артефакт должен быть объектом');
        const item = artifact as Record<string, unknown>;
        if (typeof item.id !== 'string' || !item.id.trim() || typeof item.name !== 'string' || !item.name.trim()) fail('у артефакта нужны id и name');
        if (artifactIds.has(item.id as string)) fail('у артефактов повторяется id');
        artifactIds.add(item.id as string);
        for (const field of ['description', 'image']) if (item[field] !== undefined && typeof item[field] !== 'string') fail(`поле артефакта «${field}» должно быть строкой`);
      }
    }
    const character = record as unknown as Character;
    return {
      ...character,
      ...(character.image ? { image: assetUrl(character.image) } : {}),
      ...(character.artifacts ? { artifacts: character.artifacts.map(item => ({ ...item, ...(item.image ? { image: assetUrl(item.image) } : {}) })) } : {}),
    };
  });
}
