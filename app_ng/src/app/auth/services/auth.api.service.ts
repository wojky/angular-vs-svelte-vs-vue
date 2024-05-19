import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfo } from "../state/user.state.service";

@Injectable({
  providedIn: "root",
})
export class AuthApiService {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<{ user: UserInfo; token: string }>(
      "http://localhost:3000/auth/login",
      {
        email,
        password,
      }
    );
  }

  logout() {
    return this.http.post<void>("http://localhost:3000/auth/logout", {});
  }

  register(email: string, password: string, subscription: boolean) {
    return this.http.post<void>("", { email, password, subscription });
  }

  resetCredentials(email: string) {
    return this.http.post<void>("", { email });
  }

  verifyToken(
    token: string
  ): Observable<{ user: UserInfo; token: string } | null> {
    return this.http.post<{ user: UserInfo; token: string } | null>(
      "http://localhost:3000/verify",
      {
        token,
      }
    );
  }
}
