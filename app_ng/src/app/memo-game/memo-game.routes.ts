import { Routes } from "@angular/router";
import {
  GameStateService,
  MemoGamePageComponent,
} from "./memo-game.page.component";
import { SetupMemoGamePageComponent } from "./setup/setup-memo-game.page.component";
import { PlayMemoGamePageComponent } from "./game/play-memo-game.page.component";
import { inject } from "@angular/core";

export const routes: Routes = [
  {
    path: "",
    component: MemoGamePageComponent,
    providers: [GameStateService],
    canDeactivate: [
      () => {
        inject(GameStateService).cleanState();
        return true;
      },
    ],
    children: [
      {
        path: "setup",
        component: SetupMemoGamePageComponent,
      },
      {
        path: "play",
        component: PlayMemoGamePageComponent,
        canMatch: [
          () => {
            return (
              inject(GameStateService, { optional: true })?.value().status ===
              "game"
            );
          },
        ],
      },
      {
        path: "**",
        redirectTo: "setup",
        pathMatch: "full",
      },
    ],
  },
];
