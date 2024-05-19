import { AsyncPipe, NgStyle } from "@angular/common";
import { Component, inject, computed, input } from "@angular/core";
import { GameStateService } from "../../memo-game.page.component";
import { createTimer } from "../../utils/createTimer";

@Component({
  selector: "app-memo-game-status",
  standalone: true,
  imports: [AsyncPipe, NgStyle],
  template: `
    <h2></h2>
    <p>{{ timer() }}</p>
    <p>Runda: {{ currentRound() }}</p>
    @if(gameOver()) {
    <p>KONIEC GRY!</p>
    }
  `,
  styles: [],
})
export class MemoGameStatusComponent {
  currentRound = input.required<number>();
  timer = createTimer();

  cards = inject(GameStateService).cards;

  gameOver = computed(() => this.cards().every((card) => card.matched));
}
