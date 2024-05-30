import { Router, Routes } from "@angular/router";
import { SettingsPageComponent } from "./settings.page.component";
import { inject } from "@angular/core";
import { AuthStateService } from "../auth/state/auth.state.service";

export const routes: Routes = [
  {
    path: "",
    component: SettingsPageComponent,
    runGuardsAndResolvers: "pathParamsOrQueryParamsChange",
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
