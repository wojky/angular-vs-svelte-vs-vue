import {
  Component,
  Directive,
  TemplateRef,
  ViewContainerRef,
  contentChildren,
  effect,
  inject,
  input,
  viewChild,
} from "@angular/core";
import { EpisodesApiService } from "./episodes.api.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { NgTemplateOutlet } from "@angular/common";

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
    @for(column of config(); track column.name) {
    <div class="grid-item bg-teal-500">{{ column.title || column.name }}</div>

    }
    <!--  -->

    @for(value of data(); track value.id) {
    <!--  -->
    @for(column of config(); track column.name) {
    <div class="grid-item">
      @if(column.customTemplate) {
      <ng-container
        *ngTemplateOutlet="findTemplate(column.customTemplate)"
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

  ef = effect((_) => {
    const templates = this.template();

    console.dir(templates[0].cellTemplate());
  });

  findTemplate(name: string) {
    return (
      this.template().find((t) => t.cellTemplate() === name)?.template || null
    );
  }
}

@Component({
  selector: "app-episodes-page",
  standalone: true,
  imports: [TableComponent, CellTemplateDirective],
  template: `
    @if(episodes(); as episodes) {
    <app-table [data]="episodes.results" [config]="config">
      <button *cellTemplate="'preview'">preview</button>
    </app-table>
    }
  `,
  styles: `


  `,
})
export class EpisodesPageComponent {
  private backend = inject(EpisodesApiService);

  private previewTemplate = viewChild.required<TemplateRef<any>>("preview");

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
    },
    {
      order: 3,
      name: "episodeCode",
      title: "season",
      computeValue: ({ episodeCode }) =>
        episodeCode.slice(0, episodeCode.indexOf("E")),
    },
    {
      order: 4,
      name: "episodeCode",
      title: "episode",
      computeValue: ({ episodeCode }) =>
        episodeCode.slice(episodeCode.indexOf("E")),
    },
    {
      order: 5,
      name: "airdate",
    },
    {
      order: 6,
      name: "characters",
      computeValue: (item) => item.characters.length.toString(),
    },
    {
      order: 7,
      name: "characters",
      title: "preview",
      customTemplate: "preview",
    },
  ];

  episodes = toSignal(
    this.backend.getAll().pipe(
      map((response) => {
        return {
          ...response,
          results: response.results.map((e) => {
            return {
              id: e.id,
              name: e.name,
              airdate: e.air_date,
              episodeCode: e.episode,
              characters: e.characters,
            };
          }),
        };
      })
    ),
    { initialValue: null }
  );
}
