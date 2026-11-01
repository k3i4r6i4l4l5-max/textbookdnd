export const characterRoles = [
  { id: 'figure', name: 'Фигура' },
  { id: 'observer', name: 'Наблюдатель' },
  { id: 'wonderworker', name: 'Чудотворец' },
  { id: 'witch', name: 'Ведьма' },
  { id: 'territorial-lord', name: 'Территориальный лорд' },
] as const;

export type CharacterRoleId = (typeof characterRoles)[number]['id'];
