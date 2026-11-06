import { Gem } from 'lucide-react';
import type { Artifact } from '../../types/character';

export default function ArtifactInventory({ items = [] }: { items?: Artifact[] | null }) {
  const unknown = items === null;
  const knownItems = items ?? [];
  const emptySlots = Math.max(6, Math.ceil(knownItems.length / 3) * 3) - knownItems.length;
  return <div className="artifact-inventory">
    <ul className="inventory-grid" aria-label="Инвентарь артефактов">
      {knownItems.map(item => <li key={item.id} className="inventory-item"><div className="inventory-item-art">{item.image ? <img src={item.image} alt={item.name} loading="lazy" /> : <Gem size={28} strokeWidth={1.5} aria-hidden="true" />}</div><p className="inventory-item-name">{item.name}</p>{item.description && <p className="inventory-item-description">{item.description}</p>}</li>)}
      {Array.from({ length: emptySlots }, (_, index) => <li className="inventory-empty" key={`empty-${index}`} aria-hidden="true"><span className={unknown ? 'inventory-unknown-marker' : undefined}>{unknown ? '?' : null}</span></li>)}
    </ul>
    {!knownItems.length && <p className="fact-empty">{unknown ? 'Артефакты неизвестны' : 'Артефакты пока не указаны'}</p>}
  </div>;
}
