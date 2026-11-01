import { Eye, WandSparkles } from 'lucide-react';

export const beyondCategories = [
  { id: 'observers', path: '/characters?role=observer&role=wonderworker', title: 'Чудотворцы и наблюдатели', description: 'Взгляд за пределами истории', icon: Eye },
  { id: 'witches', path: '/characters?role=witch&role=territorial-lord', title: 'Ведьмы и Территориальные Лорды', description: 'Неизведанные страницы архива', icon: WandSparkles },
] as const;
