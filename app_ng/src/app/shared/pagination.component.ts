import { Component, input, output } from "@angular/core";

@Component({
  selector: "app-pagination",
  standalone: true,
  template: `
    <div
      class="flex items-center justify-between p-4 bg-white rounded shadow mt-8"
    >
      <button
        (click)="previousPage()"
        [disabled]="currentPage() === 1"
        class="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div class="text-gray-700">
        Page {{ currentPage() }} of {{ totalPages() }}
      </div>

      <button
        (click)="nextPage()"
        [disabled]="currentPage() === totalPages()"
        class="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  `,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  previousPage() {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }
}
