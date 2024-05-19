import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from "rxjs";

export type SeriesLocation = {
  name: string;
  id: number;
};

@Component({
  selector: "app-locations-page",
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  template: `
    <input
      [formControl]="searchTerm"
      class="mt-1 mb-8 input"
      placeholder="Search locations..."
    />

    <div class="flex flex-wrap gap-8">
      @for(location of locations(); track location.id) {
      <div>
        <p class="w-24">{{ location.name }}</p>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class LocationsPageComponent {
  http = inject(HttpClient);

  searchTerm = new FormControl("", { nonNullable: true });

  locations = toSignal(
    this.searchTerm.valueChanges.pipe(
      startWith(this.searchTerm.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        return this.http.get<{
          results: SeriesLocation[];
        }>(
          `https://rickandmortyapi.com/api/location?name=${searchTerm
            .trim()
            .toLowerCase()}`
        );
      }),
      map(({ results }) => results)
    )
  );
}
