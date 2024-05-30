import { Routes } from "@angular/router";
import { CharacterDetailsPageComponent } from "./character-details.page.component";
import { CharactersPageComponent } from "./characters.page.component";

export const routes: Routes = [
  {
    path: "",
    component: CharactersPageComponent,
  },
  {
    path: ":id",
    component: CharacterDetailsPageComponent,
  },
];
