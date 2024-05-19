import { AsyncPipe, NgStyle } from "@angular/common";
import { Component, input, model } from "@angular/core";
import { Game } from "../../memo-game.page.component";
import { Card } from "../play-memo-game.page.component";

@Component({
  selector: "app-memo-board",
  standalone: true,
  imports: [AsyncPipe, NgStyle],
  template: `
    <div class="grid grid-cols-6 grid-rows-4">
      @for(card of cards(); track card.id) {
      <button
        [disabled]="disableSelection()"
        class="h-32 bg-cover bg-lime-400"
        [ngStyle]="{
          backgroundImage: card.hide ? '' : 'url(' + card.image + ')'
        }"
        (click)="handleClick(card)"
      >
        {{ card.characterId }}
      </button>
      }
    </div>
  `,
  styles: [],
})
export class MemoBoardComponent {
  disableSelection = input.required<boolean>();
  gameConfiguration = input.required<Game["configuration"]>();
  cards = input.required<Card[]>();
  currentRound = input.required<number>();

  rounds = model<Record<number, Card[]>>([]);

  handleClick(card: Card) {
    if (card.matched || !card.hide) {
      return;
    }

    card.hide = !card.hide;

    this.rounds.update((rounds) => {
      const current = rounds[this.currentRound()];

      if (!current) {
        return {
          ...rounds,
          [this.currentRound()]: [card],
        };
      } else {
        return {
          ...rounds,
          [this.currentRound()]: current.concat(card),
        };
      }
    });
  }
}
