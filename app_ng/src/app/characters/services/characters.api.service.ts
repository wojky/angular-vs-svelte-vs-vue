import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Pageable } from "../../shared/types/Pageable.model";
import { CharactersPageFilters } from "../model/character-page-filters.model";
import { Character } from "../model/character.model";

@Injectable({ providedIn: "root" })
export class CharactersApiService {
  private http = inject(HttpClient);

  getCharacters({ page, searchTerm, status }: Pageable<CharactersPageFilters>) {
    return this.http.get<{
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
    });
  }

  getCharacterById(characterId: string) {
    return fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    ).then((res) => res.json());
  }
}
