import { Component, input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: `app-form-error-container`,
  standalone: true,
  template: `
    @if (control().invalid && control().touched) {
    <div class="form-control__error">
      <ng-content />
    </div>
    }
  `,
})
export class FormErrorContainerComponent {
  control = input.required<FormControl>();
}
