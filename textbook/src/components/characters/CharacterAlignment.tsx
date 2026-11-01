import { alignments, alignmentStatuses } from '../../data/alignments';
import type { AlignmentId } from '../../data/alignments';

function AlignmentBadge({ id }: { id: AlignmentId }) {
  const alignment = [...alignments, ...alignmentStatuses].find(item => item.id === id)!;
  return <span className={`alignment-badge alignment-${id}`}><span className="alignment-marker" aria-hidden="true" />{alignment.name}</span>;
}

export default function CharacterAlignment({ value }: { value?: AlignmentId | null }) {
  return <div className="character-alignment">
    {value ? <AlignmentBadge id={value} /> : <span className="fact-empty">Пока не указан</span>}
    <details className="alignment-reference"><summary>Обозначения характеров</summary><ul>{alignments.map(item => <li key={item.id}><AlignmentBadge id={item.id} /></li>)}</ul></details>
  </div>;
}
