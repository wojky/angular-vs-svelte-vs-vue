import { Injectable, effect, signal } from "@angular/core";

export type UserInfo = {
  role: string;
  email: string;
  watchList: number[];
  subscribed: boolean;
};

@Injectable({
  providedIn: "root",
})
export class UserStateService {
  private state = signal<UserInfo | null>(null);

  value = this.state.asReadonly();

  setUser(info: UserInfo | null) {
    this.state.set(info);
  }
}
