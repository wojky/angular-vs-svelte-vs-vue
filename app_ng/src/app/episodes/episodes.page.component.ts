import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  TemplateRef,
  ViewContainerRef,
  contentChildren,
  inject,
  input,
} from "@angular/core";
import { Episode, EpisodesApiService } from "./episodes.api.service";
import { DatePipe, NgTemplateOutlet } from "@angular/common";
import { UserStateService } from "../auth/state/user.state.service";
import { EpisodesService } from "./episodes.service";

export type TableColumnDefinition<T> = {
  order: number;
  name: keyof T;
  title?: string;
  customTemplate?: string; // localizator
  computeValue?: (item: T) => string;
};

@Directive({ standalone: true, selector: "[cellTemplate]" })
export class CellTemplateDirective {
  cellTemplate = input.required<string>();

  host = inject(ViewContainerRef);

  template = inject(TemplateRef);
}

@Component({
  standalone: true,
  selector: "app-table",
  imports: [NgTemplateOutlet],
  template: ` <div
    class="grid-container"
    [style.--num-columns]="config().length"
  >
    @for(column of config(); track $index) {
    <div class="grid-item bg-indigo-100 text-indigo-800 font-semibold">
      {{ column.title || column.name }}
    </div>

    }
    <!--  -->

    @for(value of data(); track value.id) {
    <!--  -->
    @for(column of config(); track $index) {
    <div class="grid-item">
      @if(column.customTemplate) {
      <ng-container
        *ngTemplateOutlet="
          findTemplate(column.customTemplate);
          context: { $implicit: value }
        "
      ></ng-container>
      } @else {
      {{
        column.computeValue ? column.computeValue(value) : value[column.name]
      }}
      }
    </div>
    }
    <!--  -->
    }
  </div>`,
  styles: [
    `
      :host {
        --num-columns: 2;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(var(--num-columns), 1fr);
        gap: 10px;
      }

      .grid-item {
        border: 1px solid #ccc;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class TableComponent<T extends { id: number }> {
  config = input.required<TableColumnDefinition<T>[]>();

  data = input.required<T[]>();

  template = contentChildren(CellTemplateDirective);

  findTemplate(name: string) {
    return (
      this.template().find((t) => t.cellTemplate() === name)?.template || null
    );
  }
}

@Component({
  selector: "app-episodes-page",
  standalone: true,
  imports: [TableComponent, CellTemplateDirective, DatePipe],
  template: `
    @if(episodes(); as episodes) {
    <app-table [data]="episodes" [config]="config">
      <div *cellTemplate="'preview'; let episode">
        @if(user();as u) {
        <label class="switch">
          <input
            type="checkbox"
            (change)="toggleWatchList(episode)"
            [checked]="onWatchList(u.watchList, episode)"
          />
          <span class="slider"></span>
        </label>
        } @else {

        <p class="font-semibold text-xs">
          Login if you want to wishlist this episode
        </p>
        }
      </div>

      <div *cellTemplate="'airdate'; let episode">
        <span class="text-sm"> {{ episode.airdate }}</span>
      </div>
    </app-table>
    }
  `,
  styles: `


  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodesPageComponent {
  private service = inject(EpisodesService);
  user = inject(UserStateService).value;

  onWatchList(wishList: number[], episode: Episode) {
    return wishList.includes(episode.id);
  }

  toggleWatchList(episode: Episode) {
    this.service.toggleWatchList(episode);
  }

  config: TableColumnDefinition<{
    id: number;
    name: string;
    airdate: string;
    episodeCode: string;
    characters: string[];
  }>[] = [
    {
      order: 1,
      name: "id",
    },
    {
      order: 2,
      name: "name",
      title: "Name",
    },
    {
      order: 3,
      name: "episodeCode",
      title: "Season",
      computeValue: ({ episodeCode }) =>
        episodeCode.slice(0, episodeCode.indexOf("E")),
    },
    {
      order: 4,
      name: "episodeCode",
      title: "Episode",
      computeValue: ({ episodeCode }) =>
        episodeCode.slice(episodeCode.indexOf("E")),
    },
    {
      order: 5,
      name: "airdate",
      title: "Airdate",
      customTemplate: "airdate",
    },
    {
      order: 6,
      name: "characters",
      title: "Characters",
      computeValue: (item) => `🧍‍♂️🧍‍♀️${item.characters.length.toString()}`,
    },
    {
      order: 7,
      name: "characters",
      title: " ",
      customTemplate: "preview",
    },
  ];

  episodes = this.service.episodesDataSource;
}
