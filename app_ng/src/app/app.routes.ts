import { inject } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { AuthStateService } from "./auth/state/auth.state.service";

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
    canMatch: [
      () => {
        const auth = inject(AuthStateService).value;
        const router = inject(Router);

        console.log(auth());

        if (auth().status === "AUTHENTICATED") {
          router.navigate(["/"]);

          return false;
        } else {
          return true;
        }
      },
    ],
  },
  {
    path: "",
    redirectTo: "characters",
    pathMatch: "full",
  },
];
