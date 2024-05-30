import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login.page.component";
import { RegisterPageComponent } from "./register.page.component";
import { ResetPasswordPageComponent } from "./reset-password.page.component";

export const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "reset",
    component: ResetPasswordPageComponent,
  },
  {
    path: "register",
    component: RegisterPageComponent,
  },
  {
    path: "**",
    redirectTo: "login",
  },
];
