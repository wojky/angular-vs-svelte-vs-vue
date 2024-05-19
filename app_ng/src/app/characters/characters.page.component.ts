import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from "rxjs";
import { PaginationComponent } from "../shared/pagination.component";

export type Character = {
  name: string;
  id: number;
  image: number;
  type: string;
  species: string;
  status: "Dead" | "Alive" | "unknown";
  gender: "Male" | "Female" | "Genderless" | "unknown";
  origin: { name: string };
  location: { name: string };
  episode: string[]; // list of episodes
};

@Component({
  selector: "app-characters-page",
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, FormsModule, PaginationComponent],
  template: `
    <div class="flex flex-col bg-gray-100 p-4">
      <input
        [formControl]="searchTerm"
        class="mt-1 mb-6 input"
        placeholder="Search characters..."
      />

      <div class="flex w-full justify-between">
        <p>Status:</p>
        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="radio" [formControl]="status" value="" />
            <span class="slider"></span>
          </label>
          <span class="ml-3 text-gray-700">Any</span>
        </div>
        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="radio" [formControl]="status" value="alive" />
            <span class="slider"></span>
          </label>
          <span class="ml-3 text-gray-700">Alive</span>
        </div>

        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="radio" [formControl]="status" value="dead" />
            <span class="slider"></span>
          </label>
          <span class="ml-3 text-gray-700">Dead</span>
        </div>

        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="radio" [formControl]="status" value="unknown" />
            <span class="slider"></span>
          </label>
          <span class="ml-3 text-gray-700">unknown</span>
        </div>
      </div>

      <div class="flex flex-wrap gap-4 justify-center">
        @for(character of characters(); track character.id) {
        <button (click)="goToDetails(character)" class="card card--button">
          <img
            class="w-24 h-24 rounded-image mb-2"
            [src]="character.image"
            alt="{{ character.name }}"
          />
          <p class="w-24 text-center text-gray-700">{{ character.name }}</p>
        </button>
        }

        <app-pagination
          [currentPage]="page()"
          [totalPages]="total()"
          (pageChange)="onPageChange($event)"
        ></app-pagination>
      </div>
    </div>
  `,
  styles: ``,
})
export class CharactersPageComponent {
  http = inject(HttpClient);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  filters = signal({
    searchTerm: "",
    status: "",
    page: 1,
  });

  status = new FormControl(this.filters().status, { nonNullable: true });
  searchTerm = new FormControl(this.filters().searchTerm, {
    nonNullable: true,
  });

  total = signal(0);
  page = signal(1);

  onPageChange(page: number) {
    this.page.set(page);
  }

  characters = toSignal(
    combineLatest([
      this.searchTerm.valueChanges.pipe(
        startWith(this.searchTerm.value),
        debounceTime(400),
        distinctUntilChanged()
      ),
      this.status.valueChanges.pipe(startWith(this.status.value)),
      toObservable(this.page),
    ]).pipe(
      switchMap(([searchTerm, status, page]) => {
        console.log({ status });
        return this.http.get<{
          results: Character[];
          info: { count: number; pages: number };
        }>(
          `https://rickandmortyapi.com/api/character?name=${searchTerm
            .trim()
            .toLowerCase()}&status=${status.toLowerCase()}&page=${page}`
        );
      }),
      tap((res) => {
        this.total.set(res.info.pages);
      }),
      map(({ results }) => results)
    )
  );

  goToDetails(character: Character) {
    this.router.navigate([character.id], { relativeTo: this.route });
  }
}
