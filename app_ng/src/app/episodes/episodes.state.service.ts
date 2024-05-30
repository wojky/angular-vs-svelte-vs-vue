import { Injectable, signal } from "@angular/core";
import { Episode } from "./episodes.api.service";

@Injectable({
  providedIn: "root",
})
export class EpisodesStateService {
  #value = signal<Episode[]>([]);

  value = this.#value.asReadonly();

  setEpisodes(episodes: Episode[]) {
    this.#value.set(episodes);
  }
}
