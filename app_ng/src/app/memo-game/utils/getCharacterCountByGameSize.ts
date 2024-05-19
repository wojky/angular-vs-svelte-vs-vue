import { Game } from "../memo-game.page.component";

export function getCharacterCountByGameSize(
  gamesize: Game["configuration"]["size"]
) {
  switch (gamesize) {
    case "s":
      return 8;
    case "m":
      return 12;
    case "l":
      return 16;
  }
}
