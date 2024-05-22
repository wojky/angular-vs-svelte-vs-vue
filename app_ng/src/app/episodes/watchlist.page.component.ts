import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-watchlist.page",
  standalone: true,
  imports: [],
  template: ` <p class="text-5xl">👀</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchlistPageComponent {}
