import { Injectable, effect, inject, signal } from "@angular/core";
import { Character } from "./Character.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { EMPTY, catchError } from "rxjs";

export type CharactersPageFilters = {
  searchTerm: string;
  status: string;
};

export type CharactersPageApiParams = CharactersPageFilters & { page: number };

@Injectable()
export class CharactersService {
  private http = inject(HttpClient);

  #filters = signal({
    searchTerm: "",
    status: "",
    page: 1,
  });

  #loading = signal(false);
  #total = signal(0);
  #characters = signal<Character[]>([]);

  filters = this.#filters.asReadonly();
  loading = this.#loading.asReadonly();
  total = this.#total.asReadonly();
  characters = this.#characters.asReadonly();

  constructor() {
    effect(
      () => {
        const { searchTerm, status, page } = this.#filters();
        this.#loading.set(true);

        this.http
          .get<{
            results: Character[];
            info: { count: number; pages: number };
          }>(`https://rickandmortyapi.com/api/character`, {
            params: new HttpParams({
              fromObject: {
                name: searchTerm.trim().toLowerCase(),
                status: status.toLowerCase(),
                page,
              },
            }),
          })
          .pipe(
            catchError(() => {
              this.#loading.set(false);
              this.#characters.set([]);
              this.#total.set(0);
              return EMPTY;
            })
          )
          .subscribe((r) => {
            this.#loading.set(false);
            this.#characters.set(r.results);
            this.#total.set(r.info.pages);
          });
      },
      { allowSignalWrites: true }
    );
  }

  updateFilters(value: Partial<CharactersPageApiParams>): void {
    this.#filters.update((f) => {
      return {
        ...f,
        ...value,
      };
    });
  }
}
