import { Routes } from "@angular/router";
import { EpisodesPageComponent } from "./episodes.page.component";
import { WatchlistPageComponent } from "./watchlist.page.component";

export const routes: Routes = [
  {
    path: "",
    component: EpisodesPageComponent,
  },
  {
    path: "watchlist",
    component: WatchlistPageComponent,
  },
];
