export const alignments = [
  { id: 'lawful-good', name: 'Законопослушный-Добрый' },
  { id: 'neutral-good', name: 'Нейтральный-Добрый' },
  { id: 'chaotic-good', name: 'Хаотичный-Добрый' },
  { id: 'lawful-neutral', name: 'Законопослушный-Нейтральный' },
  { id: 'true-neutral', name: 'Истинный-Нейтральный' },
  { id: 'chaotic-neutral', name: 'Хаотичный-Нейтральный' },
  { id: 'lawful-evil', name: 'Законопослушный-Злой' },
  { id: 'neutral-evil', name: 'Нейтральный-Злой' },
  { id: 'chaotic-evil', name: 'Хаотичный-Злой' },
] as const;

export const alignmentStatuses = [
  { id: 'unknown', name: 'Неизвестен' },
  { id: 'not-applicable', name: 'Неприменимо' },
] as const;

export type AlignmentId = (typeof alignments)[number]['id'] | (typeof alignmentStatuses)[number]['id'];
