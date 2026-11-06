import { Compass, Eye, Crown } from 'lucide-react';
import NavigationCard from '../components/ui/NavigationCard';

export default function HomePage() {
  return <div className="home page">
    <section className="home-hero" aria-labelledby="home-title">
      <p className="chapter">Энциклопедия авторского мира</p>
      <h1 id="home-title">Архив <span>Доски</span></h1>
      <p className="home-description">Персонажи, устройство мира и то, что остаётся за его пределами.</p>
    </section>
    <section className="archive-sections" aria-labelledby="sections-title"><div className="section-heading"><h2 id="sections-title">Исследовать архив</h2><span>Три взгляда на одну историю</span></div>
      <div className="home-cards">
        <NavigationCard to="/characters" title="Персонажи" description="Все участники истории. Стороны, атрибуты и роли в одном каталоге." icon={Crown} featured />
        <NavigationCard to="/world" title="Мир" description="Земли, законы и сама природа существования." icon={Compass} />
        <NavigationCard to="/beyond" title="За Доской" description="То, что скрыто за границами известного." icon={Eye} beyond />
      </div>
    </section>
  </div>;
}
