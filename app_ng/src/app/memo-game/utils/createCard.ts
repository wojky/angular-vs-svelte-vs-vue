import { Character } from "../../characters/Character.model";

export function createCard(character: Character, cardId: number) {
  return {
    id: cardId,
    characterId: character.id,
    name: character.name,
    image: character.image,
    matched: false,
    hide: true,
  };
}
