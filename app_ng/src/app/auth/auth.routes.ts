import { Routes } from "@angular/router";
import { LoginPageComponent } from "./login.page.component";
import { RegisterPageComponent } from "./register.page.component";

export const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
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
