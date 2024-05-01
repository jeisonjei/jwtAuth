import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs';

const baseUrl = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }
  // ***************************************************************
  login(formGroupValue) {
    var url = baseUrl + 'token/';
    return this.http.post(url, formGroupValue, {observe: 'response'}).pipe(
      map((response: any) => {
        if (response.status === 200) {
          localStorage.setItem('access_token', response.body.access);
          localStorage.setItem('refresh_token', response.body.refresh);
          this.router.navigateByUrl('');
          return response.body;
        } else {
          return response.error;
        }
      })
    );
  }
  refreshToken() {
    var url = baseUrl + 'token/refresh/';
    return this.http.post(url, { refresh: localStorage.getItem('refresh_token') }, { observe: 'response' })
      
  }
}
