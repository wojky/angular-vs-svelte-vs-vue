import { HttpClient } from "@angular/common/http";
import { Component, effect, inject, signal } from "@angular/core";
import { NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import {} from "rxjs";
import { PaginationComponent } from "../shared/pagination.component";
import { SpinnerLoaderComponent } from "../shared/loader.component";

export type SeriesLocation = {
  name: string;
  id: number;
  dimension: string;
  type: string;
  residents: string[];
};

@Component({
  selector: "app-locations-page",
  standalone: true,
  imports: [ReactiveFormsModule, PaginationComponent, SpinnerLoaderComponent],
  template: `
    <form [formGroup]="locationsFiltersForm">
      <input
        formControlName="searchTerm"
        class="mt-1 mb-8 input"
        placeholder="Search locations by name..."
      />
    </form>

    @if (loading()) {
    <app-spinner-loader />
    } @else {
    <div class="grid grid-cols-2 gap-4">
      @for(location of locations(); track location.id) {
      <div class="card grow text-center">
        <p class="font-semibold">{{ location.name }}</p>
        <span class="chip my-2">{{ location.type }}</span>
        <p>{{ location.dimension }}</p>
        <p class="mt-2 font-bold">🧍‍♂️🧍‍♀️ {{ location.residents.length }}</p>
      </div>
      }
    </div>

    <app-pagination
      class="w-full"
      [currentPage]="filters().page"
      [totalPages]="total()"
      (pageChange)="onPageChange($event)"
    ></app-pagination>
    }
  `,
  styles: ``,
})
export class LocationsPageComponent {
  http = inject(HttpClient);
  private fb = inject(NonNullableFormBuilder);

  loading = signal(false);
  total = signal(0);
  locations = signal<SeriesLocation[]>([]);
  filters = signal({
    searchTerm: "",
    page: 1,
  });

  locationsFiltersForm = this.fb.group({
    searchTerm: this.fb.control(this.filters().searchTerm),
  });

  constructor() {
    this.locationsFiltersForm.valueChanges.subscribe(() => {
      const { searchTerm } = this.locationsFiltersForm.getRawValue();

      this.filters.update((f) => {
        return {
          searchTerm,
          page: 1,
        };
      });
    });

    effect(
      () => {
        const { searchTerm, page } = this.filters();
        this.loading.set(true);

        this.http
          .get<{
            results: SeriesLocation[];
            info: { count: number; pages: number };
          }>(
            `https://rickandmortyapi.com/api/location?name=${searchTerm
              .trim()
              .toLowerCase()}&page=${page}`
          )
          .subscribe((r) => {
            this.loading.set(false);
            this.locations.set(r.results);
            this.total.set(r.info.pages);
          });
      },
      { allowSignalWrites: true }
    );
  }

  onPageChange(page: number) {
    this.filters.update((f) => {
      return {
        ...f,
        page,
      };
    });
  }
}
