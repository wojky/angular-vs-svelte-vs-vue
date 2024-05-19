import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from "@angular/core";
import { GameStateService } from "../memo-game.page.component";
import { AsyncPipe, NgStyle } from "@angular/common";
import { MemoBoardComponent } from "./components/memo-board.component";
import { MemoGameStatusComponent } from "./components/memo-game-status.component";

export type Card = {
  id: number;
  characterId: number;
  name: string;
  image: number;
  matched: boolean;
  hide: boolean;
};

@Component({
  selector: "app-play-memo-game-page",
  standalone: true,
  imports: [AsyncPipe, NgStyle, MemoBoardComponent, MemoGameStatusComponent],
  template: `
    @if(cards().length && gameConfiguration()) {
    <app-memo-game-status [currentRound]="currentRound()" />

    @if(gameConfiguration(); as configuration) {
    <app-memo-board
      [cards]="cards()"
      [(rounds)]="rounds"
      [gameConfiguration]="configuration"
      [currentRound]="currentRound()"
      [disableSelection]="isRoundEnd() || gameOver()"
    />

    } }
  `,
  styles: [],
})
export class PlayMemoGamePageComponent {
  private gameState = inject(GameStateService).value;

  cards = inject(GameStateService).cards;

  gameConfiguration = computed(() => {
    const state = this.gameState();
    if (state.status === "setup") {
      return null;
    } else {
      return state.configuration;
    }
  });

  currentRound = signal(1);
  gameOver = computed(() => this.cards().every((card) => card.matched));

  rounds = signal<Record<number, Card[]>>({});

  isRoundEnd = computed(() => {
    const currentRound = this.currentRound();
    const currentRoundState = this.rounds()[currentRound];

    console.log({ currentRoundState });

    return currentRoundState?.length === 2;
  });

  eff = effect(
    () => {
      if (!this.isRoundEnd()) {
        return;
      } else {
        const round = untracked(this.rounds)[untracked(this.currentRound)];

        const isMatched = round[0].characterId === round[1].characterId;

        console.log("koniec rundy!", isMatched);

        if (!isMatched) {
          setTimeout(() => {
            this.cards.update((cards) => {
              return cards.map((card) => {
                return {
                  ...card,
                  hide: !card.matched,
                };
              });
            });
          }, 500);
        } else {
          const matchedCharactedId = round[0].characterId;

          this.cards.update((cards) => {
            return cards.map((card) => {
              const matchedCard =
                card.matched || card.characterId === matchedCharactedId;

              return {
                ...card,
                matched: matchedCard,
                hide: !matchedCard,
              };
            });
          });
        }

        this.currentRound.update((value) => value + 1);
      }
    },
    { allowSignalWrites: true }
  );
}
