import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  Validators,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserStateService } from "../auth/state/user.state.service";

@Component({
  selector: "app-setting.page",
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <header class="bg-gray-900 text-white text-center py-4">
      <h1 class="text-3xl font-bold">Settings</h1>
    </header>
    <div class="flex-grow flex items-center justify-center ">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <p class="text-center text-gray-700 mb-6">Email: {{ userEmail }}</p>
        <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label for="currentPassword" class="block text-gray-700"
              >Current Password</label
            >
            <input
              id="currentPassword"
              type="password"
              formControlName="currentPassword"
              class="input"
            />
            <div
              *ngIf="
                settingsForm.get('currentPassword')?.invalid &&
                settingsForm.get('currentPassword')?.touched
              "
              class="form-control__error"
            >
              Current password is required
            </div>
          </div>
          <div class="mb-4">
            <label for="newPassword" class="block text-gray-700"
              >New Password</label
            >
            <input
              id="newPassword"
              type="password"
              formControlName="newPassword"
              class="input"
            />
            <div
              *ngIf="
                settingsForm.get('newPassword')?.invalid &&
                settingsForm.get('newPassword')?.touched
              "
              class="form-control__error"
            >
              Password must be at least 6 characters long, include a number and
              a special character
            </div>
          </div>
          <div class="mb-4">
            <label for="confirmNewPassword" class="block text-gray-700"
              >Confirm New Password</label
            >
            <input
              id="confirmNewPassword"
              type="password"
              formControlName="confirmNewPassword"
              class="input"
            />
            <div
              *ngIf="settingsForm.errors?.['mismatch'] && settingsForm.get('confirmNewPassword')?.touched"
              class="form-control__error"
            >
              Passwords do not match
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
            <button type="submit" class="btn--primary">Update Settings</button>
          </div>
        </form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  private user = inject(UserStateService).value;
  private fb = inject(NonNullableFormBuilder);

  settingsForm = this.fb.group({
    currentPassword: ["", [Validators.required]],
    newPassword: [
      "",
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/),
      ],
    ],
    confirmNewPassword: ["", [Validators.required]],
    subscribeNewsletter: [this.user()?.subscribed],
  });
  userEmail: string = "user@example.com"; // This should be fetched from the user's data

  passwordMatchValidator(form: typeof this.settingsForm) {
    return form.controls.newPassword.value ===
      form.controls.confirmNewPassword.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      // Perform update settings logic here
      console.log("Form Submitted", this.settingsForm.value);
    }
  }
}
