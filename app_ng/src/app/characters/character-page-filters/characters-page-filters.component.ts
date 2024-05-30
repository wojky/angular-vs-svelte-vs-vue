import { Component, DestroyRef, inject, input, output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Pageable } from "../../shared/types/Pageable.model";
import { CharactersFilters } from "../services/characters.state.service";

@Component({
  selector: "app-characters-page-filters",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="charactersFiltersForm">
      <input
        formControlName="searchTerm"
        class="mt-1 mb-6 input"
        placeholder="Search characters..."
      />

      <div class="flex w-full justify-between">
        <p>Status:</p>
        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="radio" formControlName="status" value="" />
            <span class="slider"></span>
          </label>
          <span class="ml-2 text-gray-700">Any</span>
        </div>
        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="radio" formControlName="status" value="alive" />
            <span class="slider"></span>
          </label>
          <span class="ml-2 text-gray-700">Alive</span>
        </div>

        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="radio" formControlName="status" value="dead" />
            <span class="slider"></span>
          </label>
          <span class="ml-2 text-gray-700">Dead</span>
        </div>

        <div class="mb-6 flex items-center">
          <label class="switch">
            <input type="radio" formControlName="status" value="unknown" />
            <span class="slider"></span>
          </label>
          <span class="ml-2 text-gray-700">unknown</span>
        </div>
      </div>
    </form>
  `,
  styles: ``,
})
export class CharactersPageFiltersComponent {
  private fb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);

  defaults = input.required<CharactersFilters>();

  filtersChanged = output<Partial<{ status: string; searchTerm: string }>>();

  charactersFiltersForm!: FormGroup<{
    status: FormControl<string>;
    searchTerm: FormControl<string>;
  }>;

  ngOnInit() {
    this.charactersFiltersForm = this.fb.group({
      status: this.fb.control(this.defaults().status),
      searchTerm: this.fb.control(this.defaults().searchTerm),
    });

    this.charactersFiltersForm.controls.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((searchTerm) => {
        this.filtersChanged.emit({ searchTerm });
      });

    this.charactersFiltersForm.controls.status.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filtersChanged.emit(this.charactersFiltersForm.getRawValue());
      });
  }
}
