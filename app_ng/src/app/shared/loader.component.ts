import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-spinner-loader",
  template: `
    <div class="flex justify-center items-center h-full">
      <div
        class=" border-gradient-to-r spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full gradient-border border-indigo-500 text-indigo-500"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `,
  styles: [
    `
      .gradient-border {
        border: 4px solid transparent;
        border-top-color: #3b82f6;
        border-right-color: #6366f1;
        border-bottom-color: #818cf8;
        border-left-color: #a5b4fc;
        border-radius: 50%;
      }
    `,
  ],
})
export class SpinnerLoaderComponent {}
