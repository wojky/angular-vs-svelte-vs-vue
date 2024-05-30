import { Component, inject } from "@angular/core";
import { RouterLinkActive, RouterLink } from "@angular/router";
import { AuthStateService } from "../auth/state/auth.state.service";
import { UserStateService } from "../auth/state/user.state.service";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  template: `
    <nav class="flex flex-col h-full bg-gray-800 text-white p-4 min-w-40">
      <ul class="space-y-4">
        <li>
          <a
            routerLink="characters"
            routerLinkActive="font-semibold text-indigo-400"
            class="hover:text-indigo-400"
          >
            Characters
          </a>
        </li>

        <li>
          <a
            routerLink="episodes"
            routerLinkActive="font-semibold text-indigo-400"
            [routerLinkActiveOptions]="{ exact: true }"
            class="hover:text-indigo-400"
          >
            Episodes
          </a>
        </li>
        @if(user(); as u) {
        <li>
          <a
            routerLink="episodes/watchlist"
            routerLinkActive="font-semibold text-indigo-400"
            [routerLinkActiveOptions]="{ exact: true }"
            class="hover:text-indigo-400"
          >
            Watchlist ({{ u.watchList.length }}) 👷‍♂️
          </a>
        </li>
        }

        <li>
          <a
            routerLink="locations"
            routerLinkActive="font-semibold text-indigo-400"
            class="hover:text-indigo-400"
            >Locations</a
          >
        </li>
      </ul>

      <div class="mt-auto mb-4">
        @if (user(); as u) {
        <a
          routerLink="settings"
          routerLinkActive="font-semibold text-indigo-400"
          class="hover:text-indigo-400"
          >Settings</a
        >
        <p class="mt-4">{{ u.email }}</p>
        <button (click)="authService.logout()" class="mt-2 btn--secondary">
          Logout
        </button>

        } @else {
        <a
          routerLink="auth/login"
          routerLinkActive="font-semibold text-indigo-400"
          class="hover:text-indigo-400"
          >Login</a
        >
        }
      </div>
    </nav>
  `,
})
export class SidebarComponent {
  user = inject(UserStateService).value;
  authService = inject(AuthStateService);
}
