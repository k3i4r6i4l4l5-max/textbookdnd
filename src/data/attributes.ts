const attributeImage = (id: string) => `${import.meta.env.BASE_URL}attributes/${id}.webp`;

export const attributes = [
  { id: 'fire', name: 'Огонь', image: attributeImage('fire') },
  { id: 'earth', name: 'Земля', image: attributeImage('earth') },
  { id: 'water', name: 'Вода', image: attributeImage('water') },
  { id: 'air', name: 'Воздух', image: attributeImage('air') },
  { id: 'lightning', name: 'Молния', image: attributeImage('lightning') },
  { id: 'sky', name: 'Небо', image: attributeImage('sky') },
  { id: 'darkness', name: 'Тьма', image: attributeImage('darkness') },
  { id: 'light', name: 'Свет', image: attributeImage('light') },
  { id: 'void', name: 'Пустота', image: attributeImage('void') },
  { id: 'star', name: 'Звезда', image: attributeImage('star') },
  { id: 'witch-factor', name: 'Ведьминский фактор', image: attributeImage('witch-factor') },
] as const;

export type AttributeId = (typeof attributes)[number]['id'];
