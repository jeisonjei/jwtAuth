import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now();
    let ok;

    return next.handle(request)
      .pipe(
        tap({
         next: (event: HttpEvent<any>) => {
           ok = event instanceof HttpResponse ? 'succeeded' : false;
         },
         error: (err: any) => {
           ok = 'failed';
         },

        }),
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${request.method} "${request.urlWithParams}" ${ok? 'OK' : 'KO'} ${elapsed}ms`;
          console.log(msg);
        })
      );
  }
}
