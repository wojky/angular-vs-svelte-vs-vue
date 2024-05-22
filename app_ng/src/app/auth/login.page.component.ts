import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthStateService } from "./state/auth.state.service";

@Component({
  selector: "app-login-page",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: `
    <form
      class="bg-white p-8 rounded shadow-md w-full max-w-md"
      [formGroup]="loginForm"
      (ngSubmit)="onSubmit()"
    >
      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          formControlName="email"
          class="mt-1 input"
        />
        <div
          *ngIf="
            loginForm.get('email')?.invalid && loginForm.get('email')?.touched
          "
          class="form-conrol__error"
        >
          Valid email is required
        </div>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          formControlName="password"
          class="input"
        />
        <div
          *ngIf="
            loginForm.get('password')?.invalid &&
            loginForm.get('password')?.touched
          "
          class="form-control_error"
        >
          Password is required
        </div>
      </div>
      <div class="flex items-center justify-between mb-6">
        <button type="submit" class="btn--primary">Login</button>
        <a routerLink="/auth/register" class="link">Register</a>
      </div>
    </form>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private authState = inject(AuthStateService);

  loginForm = this.fb.group({
    email: ["test@test.pl", [Validators.required, Validators.email]],
    password: ["testtest", [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.authState.login(
      this.loginForm.getRawValue().email,
      this.loginForm.getRawValue().password
    );
  }

  reset() {}

  redirectToRegister(): void {
    this.router.navigate(["auth/register"]);
  }
}
