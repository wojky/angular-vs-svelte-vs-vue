import { Injectable, signal } from "@angular/core";
import { Character } from "../model/character.model";
import { Pageable } from "../../shared/types/Pageable.model";
import { CharactersPageFilters } from "../model/character-page-filters.model";

export type CharactersFilters = Pageable<CharactersPageFilters>;

@Injectable({ providedIn: "root" })
export class CharactersStateService {
  #filters = signal({
    searchTerm: "",
    status: "",
    page: 1,
  });

  #loading = signal(true);
  #total = signal(0);
  #characters = signal<Character[]>([]);

  filters = this.#filters.asReadonly();
  loading = this.#loading.asReadonly();
  total = this.#total.asReadonly();
  characters = this.#characters.asReadonly();

  resetState() {
    this.#loading.set(false);
    this.#characters.set([]);
    this.#total.set(0);
  }

  setCharacters(results: Character[], totalPages: number) {
    this.#loading.set(false);
    this.#characters.set(results);
    this.#total.set(totalPages);
  }

  updateFilters(value: Partial<Pageable<CharactersPageFilters>>): void {
    this.#loading.set(true);
    this.#filters.update((f) => {
      return {
        ...f,
        ...value,
      };
    });
  }
}
