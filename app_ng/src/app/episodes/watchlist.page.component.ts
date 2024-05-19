import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-watchlist.page',
  standalone: true,
  imports: [],
  template: `
    <p>
      watchlist.page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchlistPageComponent {

}
