import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-register-page",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  template: `
    <div class="flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-900">
          Register
        </h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label for="email" class="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="input"
            />
            <div
              *ngIf="
                registerForm.controls.email.invalid &&
                registerForm.controls.email.touched
              "
              class="form-control__error"
            >
              Invalid email address
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
                registerForm.controls.password &&
                registerForm.controls.password.touched
              "
              class="form-control__error"
            >
              Password must be at least 6 characters long, include a number and
              a special character
            </div>
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
            <div
              *ngIf="
                registerForm.errors?.['mismatch'] &&
                registerForm.controls.confirmPassword.touched
              "
              class="form-control__error"
            >
              Passwords do not match
            </div>
          </div>

          <div class="mb-6">
            <div class="flex items-center">
              <label class="switch">
                <input type="checkbox" formControlName="acceptPolicy" />
                <span class="slider"></span>
              </label>
              <span class="ml-3 text-gray-700">Accept Service Policy</span>
            </div>
            <div
              *ngIf="
                registerForm.controls.acceptPolicy.invalid &&
                registerForm.controls.acceptPolicy.touched
              "
              class="form-control__error"
            >
              You must accept the service policy
            </div>
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
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  registerForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),
        this.passwordMatchValidator,
      ],
    ],
    confirmPassword: ["", [Validators.required, this.passwordMatchValidator]],
    acceptPolicy: [false, [Validators.requiredTrue]],
    subscribeNewsletter: [false],
  });

  passwordMatchValidator(ctrl: AbstractControl) {
    return ctrl.parent?.get("password")?.value ===
      ctrl.parent?.get("confirmPassword")?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
    }
  }

  redirectToLogin(): void {
    this.router.navigate(["/auth/login"]);
  }
}
