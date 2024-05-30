import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

export type UpdateSettingsPayload = {
  currentPassword: string;
  newPassword: string;
  subscription: boolean;
};

@Injectable({
  providedIn: "root",
})
export class SettingsApiService {
  private http = inject(HttpClient);

  updateSettings(payload: Partial<UpdateSettingsPayload>) {
    return this.http.patch("http://localhost:3000/settings", payload);
  }
}
