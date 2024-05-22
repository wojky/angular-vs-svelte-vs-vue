import { Router, Routes } from "@angular/router";
import { EpisodesPageComponent } from "./episodes.page.component";
import { WatchlistPageComponent } from "./watchlist.page.component";
import { inject } from "@angular/core";
import { AuthStateService } from "../auth/state/auth.state.service";

export const routes: Routes = [
  {
    path: "",
    component: EpisodesPageComponent,
  },
  {
    path: "watchlist",
    component: WatchlistPageComponent,
    canActivate: [
      () => {
        const auth = inject(AuthStateService).value;
        const router = inject(Router);

        if (auth().status === "AUTHENTICATED") {
          return true;
        } else {
          router.navigate(["/"]);

          return false;
        }
      },
    ],
  },
];
