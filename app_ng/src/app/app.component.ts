import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { UserStateService } from "./auth/state/user.state.service";
import { AuthStateService } from "./auth/state/auth.state.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  template: `
    <header class="bg-gray-900 text-white text-center py-4">
      <h1 class="text-3xl font-bold">Rick And Morty Universum</h1>
    </header>

    <div>
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
              My Watchlist ({{ u.watchList.length }})
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
          <button
            (click)="authService.logout()"
            class="mt-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
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
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      :host > div {
        display: flex;
        flex: 1; /* Takes up the remaining space */
        overflow: hidden; /* Contains the sidebar and content overflow */
      }

      main {
        flex-grow: 1; /* Allows the content area to grow */
        overflow-y: auto; /* Enables scrolling on the content area */
        height: 100%;
        @apply bg-gray-100;
      }
    `,
  ],
})
export class AppComponent {
  title = "app_ng";

  user = inject(UserStateService).value;
  authService = inject(AuthStateService);
}
