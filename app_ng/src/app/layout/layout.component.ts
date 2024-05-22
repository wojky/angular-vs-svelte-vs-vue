import { Component, inject } from "@angular/core";
import { AuthStateService } from "../auth/state/auth.state.service";
import { UserStateService } from "../auth/state/user.state.service";
import { SidebarComponent } from "./sidebar.component";

@Component({
  selector: "app-layout",
  standalone: true,
  imports: [SidebarComponent],
  template: `
    <header class="bg-gray-900 text-white text-center py-4">
      <h1 class="text-3xl font-bold">Rick And Morty Universum</h1>
    </header>

    <div>
      <app-sidebar />
      <main>
        <ng-content />
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
        flex: 1;
        overflow: hidden;
      }

      main {
        flex-grow: 1;
        overflow-y: auto;
        height: 100%;
        @apply bg-gray-100;
      }
    `,
  ],
})
export class LayoutComponent {
  user = inject(UserStateService).value;
  authService = inject(AuthStateService);
}
