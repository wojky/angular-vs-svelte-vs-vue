import { HttpClient } from "@angular/common/http";
import {
  Component,
  Injectable,
  computed,
  effect,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { Character } from "../characters/characters.page.component";
import { shuffleArray } from "./utils/shuffleArray";
import { Card } from "./game/play-memo-game.page.component";
import { getCharacterCountByGameSize } from "./utils/getCharacterCountByGameSize";
import { createCard } from "./utils/createCard";
import { getRandoms } from "./utils/getRandoms";

export type Setup = {
  status: "setup";
};

export type Game = {
  status: "game";
  configuration: {
    size: "s" | "m" | "l";
    mode: "timeout" | "classic";
    onlyRickMode: boolean;
  };
};

export type GameState = Setup | Game;

@Injectable()
export class GameStateService {
  http = inject(HttpClient);

  private router = inject(Router);

  private gameStatus = signal<"setup" | "game">("setup");
  private configuration = signal<Game["configuration"]>({
    size: "m",
    mode: "classic",
    onlyRickMode: false,
  });

  value = computed<GameState>(() => {
    const status = this.gameStatus();

    if (status === "setup") {
      return { status: "setup" };
    }

    return {
      status: "game",
      configuration: this.configuration(),
    };
  });

  cards = signal<Card[]>([]);

  constructor() {}

  startGame(config: Game["configuration"]) {
    this.configuration.set(config);
    this.gameStatus.set("game");

    this.get()
      .pipe(take(1))
      .subscribe((cards) => {
        this.cards.set(cards);
        this.router.navigateByUrl("game/play");
      });
  }

  cleanState() {
    this.configuration.set({
      size: "m",
      mode: "classic",
      onlyRickMode: false,
    });

    this.gameStatus.set("setup");
  }

  get(): Observable<Card[]> {
    const url = this.configuration().onlyRickMode
      ? `https://rickandmortyapi.com/api/character?name=rick`
      : `https://rickandmortyapi.com/api/character/${getRandoms(
          getCharacterCountByGameSize(this.configuration().size),
          826
        )}`;

    return this.http
      .get<
        | {
            results: Character[];
          }
        | Character[]
      >(url)
      .pipe(
        map((response) => {
          const characters =
            "results" in response ? response.results : response;

          return characters
            .slice(0, getCharacterCountByGameSize(this.configuration().size))
            .map((ch, index, array) => {
              return [
                createCard(ch, index + 1),
                createCard(ch, index + 1 + array.length),
              ];
            })
            .flat();
        }),
        map(shuffleArray)
      );
  }
}

@Component({
  selector: "app-memo-game",
  imports: [RouterOutlet],
  standalone: true,
  template: ` <router-outlet />`,
  providers: [],
  styles: [
    `
      :host {
        height: 2000px;
      }
    `,
  ],
})
export class MemoGamePageComponent {
  title = "app_ng";
}
