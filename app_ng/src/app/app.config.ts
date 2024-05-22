import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { routes } from "./app.routes";
import {
  HttpInterceptorFn,
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import { tap } from "rxjs";

const logger: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((res) => {
      if (res instanceof HttpResponse) {
        console.log(req.urlWithParams);
      }
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([logger])),
  ],
};
