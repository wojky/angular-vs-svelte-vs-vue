import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "characters",
    loadChildren: async () =>
      (await import("./characters/characters.routes")).routes,
  },
  {
    path: "locations",
    loadChildren: async () =>
      (await import("./locations/locations.routes")).routes,
  },
  {
    path: "episodes",
    loadChildren: async () =>
      (await import("./episodes/episodes.routes")).routes,
  },
  {
    path: "settings",
    loadChildren: async () =>
      (await import("./settings/settings.routes")).routes,
  },
  {
    path: "auth",
    loadChildren: async () => (await import("./auth/auth.routes")).routes,
  },
  {
    path: "",
    redirectTo: "characters",
    pathMatch: "full",
  },
];
