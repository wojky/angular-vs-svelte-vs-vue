import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterLink } from "@angular/router";
import { FormErrorContainerComponent } from "../shared/form-error-container.component";
import { AuthApiService } from "./services/auth.api.service";

export function passwordMatchValidator(ctrl: AbstractControl) {
  return ctrl.parent?.get("password")?.value ===
    ctrl.parent?.get("confirmPassword")?.value
    ? null
    : { mismatch: true };
}

@Component({
  selector: "app-register-page",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormErrorContainerComponent],
  template: `
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-900">
        Register
      </h2>

      @if(displaySuccessRegisterMessage()) {
      <p>Great! Now go to your mailbox and confirm sign up!</p>
      } @else {
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            class="input"
          />
          <app-form-error-container [control]="registerForm.controls.email">
            Invalid email address
          </app-form-error-container>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            class="input"
          />
          <app-form-error-container [control]="registerForm.controls.password">
            Password must be at least 6 characters long, include a number and a
            special character
          </app-form-error-container>
        </div>
        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700"
            >Confirm Password</label
          >
          <input
            id="confirmPassword"
            type="password"
            formControlName="confirmPassword"
            class="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <app-form-error-container
            [control]="registerForm.controls.confirmPassword"
          >
            Passwords do not match
          </app-form-error-container>
        </div>

        <div class="mb-6">
          <div class="flex items-center">
            <label class="switch">
              <input type="checkbox" formControlName="acceptPolicy" />
              <span class="slider"></span>
            </label>
            <span class="ml-3 text-gray-700">Accept Service Policy</span>
          </div>
          <app-form-error-container
            [control]="registerForm.controls.acceptPolicy"
          >
            You must accept the service policy
          </app-form-error-container>
        </div>

        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="checkbox" formControlName="subscribeNewsletter" />
            <span class="slider"></span>
          </label>
          <span class="ml-3 text-gray-700">Subscribe to Newsletter</span>
        </div>

        <div class="flex items-center justify-between">
          <button type="submit" class="btn--primary">Register</button>
          <a
            routerLink="/auth/login"
            class="text-indigo-500 hover:underline cursor-pointer"
            >Login</a
          >
        </div>
      </form>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private authApi = inject(AuthApiService);
  private fb = inject(NonNullableFormBuilder);

  displaySuccessRegisterMessage = signal(false);

  registerForm = this.fb.group({
    email: this.fb.control("", [Validators.required, Validators.email]),
    password: this.fb.control("", [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),
      passwordMatchValidator,
    ]),
    confirmPassword: this.fb.control("", [
      Validators.required,
      passwordMatchValidator,
    ]),
    acceptPolicy: this.fb.control(false, [Validators.requiredTrue]),
    subscribeNewsletter: this.fb.control(false),
  });

  onSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      return;
    }

    const { email, password, subscribeNewsletter } =
      this.registerForm.getRawValue();
    this.authApi
      .register(email, password, subscribeNewsletter)
      .subscribe(() => {
        this.displaySuccessRegisterMessage.set(true);
      });
  }
}
