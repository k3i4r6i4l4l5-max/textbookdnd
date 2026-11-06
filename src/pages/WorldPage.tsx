import { useState } from 'react';
import { Map, Scale, Sparkles, Gem, BookText } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import OrnamentalCard from '../components/ui/OrnamentalCard';
import SectionDialog from '../components/ui/SectionDialog';
import { attributes } from '../data/attributes';

const categories = [
  { title: 'География', description: 'Земли и границы известного', icon: Map },
  { title: 'Законы мира', description: 'Порядок, которому следует Доска', icon: Scale },
  { title: 'Атрибуты', description: 'Природа существования и суть', icon: Sparkles },
  { title: 'Артефакты', description: 'Предметы, хранящие свои тайны', icon: Gem },
  { title: 'Термины', description: 'Язык этого мира', icon: BookText },
];
export default function WorldPage() {
  const [section, setSection] = useState<string | null>(null);
  return <div className="page inner-page"><SectionTitle chapter="Внутри Доски" title="Мир" subtitle="То, что известно наблюдателям внутри Доски." /><div className="world-grid">{categories.map(category => <OrnamentalCard key={category.title} {...category} onClick={() => setSection(category.title)} className={category.title === 'Атрибуты' ? 'attribute-category' : ''} meta={category.title === 'Атрибуты' ? `${attributes.length} базовых атрибутов` : undefined} />)}</div>
    {section && <SectionDialog title={section} onClose={() => setSection(null)}>{section === 'Атрибуты' ? <div className="attributes-content"><p>Атрибут характеризует природу существования и суть персонажа, а не просто тип применяемых способностей.</p><div className="attributes-grid">{attributes.map(({ id, name, image }) => <div className="attribute" key={id}><img src={image} alt="" width={96} height={96} loading="lazy" decoding="async" /><span>{name}</span></div>)}</div><p className="attribute-note">Базовые атрибуты мира</p></div> : undefined}</SectionDialog>}
  </div>;
}
