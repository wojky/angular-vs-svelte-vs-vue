import { Component, inject } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { GameStateService } from "../memo-game.page.component";

@Component({
  selector: "app-setup-memo-game-page",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="setupForm" (ngSubmit)="startGame()">
      <div class="flex gap-10">
        <div>
          <input formControlName="size" value="s" type="radio" />
          <span>8 postaci</span>
        </div>

        <div>
          <input formControlName="size" value="m" type="radio" />
          <span>12 postaci</span>
        </div>

        <div>
          <input formControlName="size" value="l" type="radio" />
          <span>16 postaci</span>
        </div>
      </div>

      <div class="flex gap-10">
        <div>
          <input formControlName="mode" value="classic" type="radio" />
          <span>Tryb klasyczny</span>
        </div>

        <div>
          <input formControlName="mode" value="timeout" type="radio" />
          <span>Tryb nagłej śmierci</span>
        </div>
      </div>

      <div>
        <input formControlName="onlyRickMode" value="timeout" type="checkbox" />
        <span>Tryb Only Rick</span>
      </div>

      <button>Graj!</button>
    </form>
  `,
  styles: [],
})
export class SetupMemoGamePageComponent {
  fb = inject(NonNullableFormBuilder);
  gameState = inject(GameStateService);

  setupForm = this.fb.group({
    size: this.fb.control<"s" | "m" | "l">("s"),
    mode: this.fb.control<"timeout" | "classic">("classic"),
    onlyRickMode: this.fb.control(false),
  });

  constructor() {
    this.setupForm.valueChanges.subscribe(console.log);
  }

  startGame() {
    if (!confirm("Jesteś pewny?")) return;

    this.gameState.startGame(this.setupForm.getRawValue());
  }
}
