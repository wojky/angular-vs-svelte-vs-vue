import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { combineLatest, map } from "rxjs";

export type ApiResults<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

@Injectable({
  providedIn: "root",
})
export class EpisodesApiService {
  private http = inject(HttpClient);

  getAll() {
    return combineLatest([
      this.http.get<ApiResults<Episode>>(
        "http://rickandmortyapi.com/api/episode?page=1"
      ),
      this.http.get<ApiResults<Episode>>(
        "http://rickandmortyapi.com/api/episode?page=2"
      ),
      this.http.get<ApiResults<Episode>>(
        "http://rickandmortyapi.com/api/episode?page=3"
      ),
    ]).pipe(
      map(([page1, page2, page3]) => {
        return {
          info: {
            count: page1.info.count,
          },
          results: page1.results.concat(page2.results, page3.results),
        };
      })
    );
  }
}
