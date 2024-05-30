import {
  EnvironmentInjector,
  Injectable,
  Injector,
  createEnvironmentInjector,
  effect,
  inject,
  signal,
} from "@angular/core";
import { AuthApiService } from "../services/auth.api.service";
import { UserStateService } from "./user.state.service";
import { Router } from "@angular/router";

export const AuthStateStatus = {
  INIT: "INIT",
  NOT_AUTHENTICATED: "NOT_AUTHENTICATED",
  AUTHENTICATED: "AUTHENTICATED",
} as const;

export type AuthStateStatus = keyof typeof AuthStateStatus;

export type AuthState =
  | { status: (typeof AuthStateStatus)["INIT"] }
  | { status: (typeof AuthStateStatus)["NOT_AUTHENTICATED"] }
  | { status: (typeof AuthStateStatus)["AUTHENTICATED"] };

@Injectable({
  providedIn: "root",
})
export class AuthStateService {
  private router = inject(Router);
  private state = signal<AuthState>({ status: "INIT" });
  private authApi = inject(AuthApiService);
  private userState = inject(UserStateService);

  value = this.state.asReadonly();

  constructor() {
    effect(() => {
      if (
        ["AUTHENTICATED", "NOT_AUTHENTICATED"].includes(this.state().status)
      ) {
        this.router.navigate(["/"]);
      }
    });

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    this.authApi.verifyToken(token).subscribe((verified) => {
      if (verified) {
        localStorage.setItem("token", verified.token);
      }

      this.userState.setUser(verified?.user || null);

      this.state.update(() => {
        return {
          status: token
            ? AuthStateStatus.AUTHENTICATED
            : AuthStateStatus.NOT_AUTHENTICATED,
        };
      });
    });
  }

  login(email: string, password: string) {
    this.authApi.login(email, password).subscribe(({ user, token }) => {
      localStorage.setItem("token", token);
      this.userState.setUser(user);
      this.state.set({ status: AuthStateStatus.AUTHENTICATED });
    });
  }

  logout() {
    this.authApi.logout().subscribe(() => {
      localStorage.removeItem("token");

      this.userState.setUser(null);
      this.state.set({ status: AuthStateStatus.NOT_AUTHENTICATED });
    });
  }
}
