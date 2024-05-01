import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    var accessToken = localStorage.getItem('access_token');
    var refreshToken = localStorage.getItem('refresh_token');

    var req = request.clone({
      headers: request.headers.append('Authorization', 'Bearer ' + accessToken),
    });

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Sent) {
          console.log(`** Request sent ${req.url} **`);
        }
        else if (event.type === HttpEventType.Response) {
          console.log(`** Response received ${req.url} **`);
        }

      }),
      catchError((err: HttpErrorResponse) => {
        console.log(`** Error received **`);
        return this.auth.refreshToken().pipe(
          map((response: any) => {
            let newAccessToken = response.body.access;
            
            localStorage.setItem('access_token', newAccessToken);
            console.log(`** Access token refreshed **`);
            return newAccessToken;
          }), 
          switchMap((newAccessToken: any) => {
            console.log(`** New AccessToken ${JSON.stringify(newAccessToken)} **`);
            return next.handle(
              request.clone({
                headers: request.headers.append(
                  'Authorization',
                  'Bearer ' + newAccessToken
                ),
              })
            ).pipe(
              tap((event: HttpEvent<any>) => {
                if (event.type === HttpEventType.Sent) {
                  console.log(`** Request sent ${req.url} **`);
                }
                else if (event.type === HttpEventType.Response) {
                  console.log(`** Response received ${req.url} **`);
                }
              }),
            ); 
          })
        ) 
      })
    );
  }
}
