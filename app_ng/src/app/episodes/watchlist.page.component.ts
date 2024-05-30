import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { EpisodesService } from "./episodes.service";
import { Episode } from "./episodes.api.service";

@Component({
  selector: "app-watchlist.page",
  standalone: true,
  template: `
    <p class="text-5xl mb-6 text-center">👀</p>
    <div class="grid grid-cols-2 gap-4">
      @for (episode of watchList(); track episode.id) {
      <div class="card grow text-center">
        <p class="font-semibold">{{ episode.name }}</p>
        <p>🎬 {{ episode.episode }}</p>

        <button (click)="remove(episode)" class="mt-4 btn--secondary">
          Remove
        </button>
      </div>

      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatchlistPageComponent {
  private service = inject(EpisodesService);

  watchList = this.service.watchLists;

  remove(episode: Episode) {
    this.service.toggleWatchList(episode);
  }
}
