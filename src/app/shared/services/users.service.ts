import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getSelectedUser(userID: number): Observable<any> {
    const params = new HttpParams().set('id', userID);
    return this.http.get(API_LINKS.USERS_URL, { params: params }).pipe(take(1));
  }

  getUsers(): Observable<any> {
    return this.http.get(API_LINKS.USERS_URL).pipe(take(1));
  }

  addUsers(data: any): Observable<any> {
    return this.http.post(API_LINKS.USERS_URL, data).pipe(take(1));
  }

  editUsers(data: any, userID: number): Observable<any> {
    const params = new HttpParams().set('id', userID);
    return this.http
      .put(API_LINKS.USERS_URL, data, { params: params })
      .pipe(take(1));
  }

  changePassword(userID: number, data: any): Observable<any> {
    const params = new HttpParams().set('id', userID);
    return this.http
      .put(API_LINKS.PASS_CHANGE_URL, data, { params: params })
      .pipe(take(1));
  }
}
