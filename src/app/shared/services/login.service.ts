import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(API_LINKS.LOGIN_URL, data).pipe(take(1));
  }

  isLoggedIn() {
    return (
      localStorage.getItem('username') != null &&
      localStorage.getItem('user_id') != null &&
      localStorage.getItem('role_id') != null
    );
  }
}
