import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getSelectedCategory(categoryID: number): Observable<any> {
    const params = new HttpParams().set('id', categoryID);
    return this.http
      .get(API_LINKS.CATEGORY_URL, { params: params })
      .pipe(take(1));
  }

  getCategorys(): Observable<any> {
    return this.http.get(API_LINKS.CATEGORY_URL).pipe(take(1));
  }

  addCategorys(data: any): Observable<any> {
    return this.http.post(API_LINKS.CATEGORY_URL, data).pipe(take(1));
  }

  editCategorys(data: any, categoryID: number): Observable<any> {
    const params = new HttpParams().set('id', categoryID);
    return this.http
      .put(API_LINKS.CATEGORY_URL, data, { params: params })
      .pipe(take(1));
  }
}
