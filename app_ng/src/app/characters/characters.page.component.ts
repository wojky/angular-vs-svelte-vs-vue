import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaginationComponent } from "../shared/pagination.component";
import { SpinnerLoaderComponent } from "../shared/loader.component";
import { CharactersService } from "./services/characters.service";
import { CharactersPageFiltersComponent } from "./character-page-filters/characters-page-filters.component";
import { Character } from "./model/character.model";
import { CharactersFilters } from "./services/characters.state.service";

@Component({
  selector: "app-characters-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PaginationComponent,
    SpinnerLoaderComponent,
    CharactersPageFiltersComponent,
  ],
  template: `
    <app-characters-page-filters
      [defaults]="vm.filters()"
      (filtersChanged)="updateFilters($event)"
    />

    @if (vm.loading()) {
    <app-spinner-loader />
    } @else {
    <div class="flex flex-wrap gap-4">
      @for(character of vm.characters(); track character.id) {
      <button (click)="goToDetails(character)" class="card card--button">
        <img
          class="w-24 h-24 rounded-image mb-2"
          [src]="character.image"
          [alt]="character.name"
        />
        <p class="w-24 text-center text-gray-700">{{ character.name }}</p>
      </button>
      } @empty {
      <p>Empty list</p>
      }

      <app-pagination
        class="w-full"
        [currentPage]="vm.filters().page"
        [totalPages]="vm.total()"
        (pageChange)="updateFilters({ page: $event })"
      ></app-pagination>
    </div>
    }
  `,
})
export class CharactersPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(CharactersService);

  vm = this.service.vm;

  updateFilters(filters: Partial<CharactersFilters>) {
    this.service.updateFilters({ ...filters, page: filters.page || 1 });
  }

  goToDetails(character: Character) {
    this.router.navigate([character.id], { relativeTo: this.route });
  }
}
