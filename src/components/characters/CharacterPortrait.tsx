import { useState } from 'react';
import { UserRound } from 'lucide-react';
import type { Character } from '../../types/character';

export default function CharacterPortrait({ character, className }: { character: Character; className: string }) {
  const [failedImage, setFailedImage] = useState<string>();
  return <div className={className}>{character.image && failedImage !== character.image
    ? <img src={character.image} alt={`Портрет ${character.name}`} width={1086} height={1448} loading="lazy" onError={() => setFailedImage(character.image)} />
    : <div className="portrait-placeholder"><UserRound size={40} strokeWidth={1.2} aria-hidden="true" /><span>Портрет пока не добавлен</span></div>
  }</div>;
}
