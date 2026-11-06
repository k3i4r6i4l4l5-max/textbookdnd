import SectionTitle from '../components/ui/SectionTitle';
import OrnamentalCard from '../components/ui/OrnamentalCard';
import { beyondCategories } from '../data/beyond';
export default function BeyondPage() {
  return <div className="page inner-page beyond-page"><SectionTitle chapter="По ту сторону" title="За пределами Доски" subtitle="Не каждый наблюдатель является участником." /><div className="beyond-grid">{beyondCategories.map(category => <OrnamentalCard key={category.id} title={category.title} description={category.description} icon={category.icon} to={category.path} />)}</div></div>;
}
