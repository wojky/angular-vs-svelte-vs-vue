import { Injectable, effect, inject } from "@angular/core";
import { CharactersApiService } from "./characters.api.service";
import {
  CharactersFilters,
  CharactersStateService,
} from "./characters.state.service";
import { catchError, EMPTY } from "rxjs";

@Injectable({ providedIn: "root" })
export class CharactersService {
  private backend = inject(CharactersApiService);
  private state = inject(CharactersStateService);

  vm = {
    filters: this.state.filters,
    total: this.state.total,
    loading: this.state.loading,
    characters: this.state.characters,
  };

  constructor() {
    effect(() => {
      if (!this.vm.loading()) {
        return;
      }

      this.backend
        .getCharacters(this.vm.filters())
        .pipe(
          catchError(() => {
            this.state.resetState();
            return EMPTY;
          })
        )
        .subscribe((r) => {
          this.state.setCharacters(r.results, r.info.pages);
        });
    });
  }

  updateFilters(f: Partial<CharactersFilters>) {
    this.state.updateFilters(f);
  }

  getCharacterById(id: string) {
    return this.backend.getCharacterById(id);
  }
}
