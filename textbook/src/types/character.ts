import type { AttributeId } from '../data/attributes';
import type { AlignmentId } from '../data/alignments';
import type { CharacterRoleId } from '../data/roles';

export type CharacterSide = 'white' | 'black' | 'neutral' | 'unknown';

export interface CharacterFiltersState {
  sides: CharacterSide[];
  attributes: AttributeId[];
  roles: CharacterRoleId[];
}

export interface Artifact {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

/** A character's traits are independent of its folder and of each other. */
export interface CharacterTraits {
  side?: CharacterSide;
  roles?: CharacterRoleId[];
  personality?: AlignmentId | null;
  affiliation?: string | string[];
  knownInfo?: string;
  /** null means explicitly unknown; undefined means not filled in yet. */
  attributes?: AttributeId[] | null | 'not-applicable';
  artifacts?: Artifact[] | null;
}

export interface Character extends CharacterTraits {
  id: string;
  name: string;
  description?: string;
  image?: string;
}
