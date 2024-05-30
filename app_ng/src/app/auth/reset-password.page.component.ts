import { NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { FormErrorContainerComponent } from "../shared/form-error-container.component";
import { AuthApiService } from "./services/auth.api.service";

@Component({
  selector: "app-reset-password-page",
  standalone: true,
  imports: [RouterLink, NgIf, FormErrorContainerComponent, ReactiveFormsModule],
  template: `
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-900">
        Reset password
      </h2>

      @if(displaySuccessResetMessage()) {
      <p>Password reset link has been sent to your email:</p>
      <p class="text-center">
        <strong>{{ emailControl.value }}</strong>
      </p>
      } @else {

      <div class="mb-4">
        <label for="email" class="block text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          [formControl]="emailControl"
          class="input"
        />
        <app-form-error-container [control]="emailControl">
          Invalid email address
        </app-form-error-container>
      </div>

      <button (click)="reset()" class="btn--primary mb-4">Reset</button>

      <div class="flex items-center justify-between mb-6">
        <a routerLink="/auth/login" class="link">Already registered? Login</a>

        <a routerLink="/auth/register" class="link">Need account?</a>
      </div>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPageComponent {
  private router = inject(Router);
  private service = inject(AuthApiService);

  displaySuccessResetMessage = signal(false);

  emailControl = inject(NonNullableFormBuilder).control("", [
    Validators.email,
    Validators.required,
  ]);

  redirectToLogin(): void {
    this.router.navigate(["auth/register"]);
  }

  reset() {
    this.emailControl.markAsTouched();

    if (this.emailControl.invalid) {
      return;
    }

    this.service
      .resetCredentials(this.emailControl.getRawValue())
      .subscribe(() => {
        this.displaySuccessResetMessage.set(true);
      });
  }
}
