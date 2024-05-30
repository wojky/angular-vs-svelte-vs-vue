import { Injectable, computed, inject } from "@angular/core";
import { Episode, EpisodesApiService } from "./episodes.api.service";
import { EpisodesStateService } from "./episodes.state.service";
import { UserStateService } from "../auth/state/user.state.service";

@Injectable({
  providedIn: "root",
})
export class EpisodesService {
  private apiService = inject(EpisodesApiService);
  private userState = inject(UserStateService);
  private state = inject(EpisodesStateService);

  episodesDataSource = computed(() => {
    return this.state.value().map((e) => {
      return {
        id: e.id,
        name: e.name,
        airdate: e.air_date,
        episodeCode: e.episode,
        characters: e.characters,
      };
    });
  });

  watchLists = computed(() => {
    return this.state
      .value()
      .filter((e) => this.userState.value()?.watchList.includes(e.id));
  });

  toggleWatchList(episode: Episode) {
    const user = this.userState.value();

    if (!user) {
      return;
    }

    this.apiService.toggleWatchList(episode.id).subscribe(({ watchList }) => {
      this.userState.setUser({
        ...user,
        watchList,
      });
    });
  }

  constructor() {
    this.apiService.getAll().subscribe(({ results }) => {
      this.state.setEpisodes(results);
    });
  }
}
