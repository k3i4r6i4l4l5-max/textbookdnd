import { useId, useState } from 'react';
import { attributes } from '../../data/attributes';
import type { AttributeId } from '../../data/attributes';

function AttributeEmblem({ name, image }: { name: string; image: string }) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  return <li className="character-attribute"><button type="button" className="attribute-emblem" aria-label={name} aria-describedby={open ? tooltipId : undefined}
    onMouseEnter={() => setOpen(true)} onMouseLeave={event => { if (document.activeElement !== event.currentTarget) setOpen(false); }}
    onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onClick={() => setOpen(true)}
    onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>
    <img src={image} alt="" width={64} height={64} loading="lazy" decoding="async" />
    <span id={tooltipId} role="tooltip" className="attribute-tooltip" hidden={!open}>{name}</span>
  </button></li>;
}

export default function CharacterAttributes({ values }: { values?: AttributeId[] | null | 'not-applicable' }) {
  if (values === null) return <span className="unknown-attribute" aria-label="Атрибуты неизвестны">?</span>;
  if (values === 'not-applicable') return <span className="fact-empty">Неприменимо</span>;
  if (values === undefined) return <span className="fact-empty">Пока не указаны</span>;
  const known = attributes.filter(attribute => values.includes(attribute.id));
  if (!known.length) return <span className="fact-empty">Нет атрибута</span>;
  return <ul className="character-attributes" aria-label="Атрибуты персонажа">{known.map(({ id, name, image }) => <AttributeEmblem key={id} name={name} image={image} />)}</ul>;
}
