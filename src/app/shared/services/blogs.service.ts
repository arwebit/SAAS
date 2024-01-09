import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getSelectedBlog(blogID: number): Observable<any> {
    const params = new HttpParams().set('id', blogID);
    return this.http.get(API_LINKS.BLOG_URL, { params: params }).pipe(take(1));
  }

  getBlogs(): Observable<any> {
    return this.http.get(API_LINKS.BLOG_URL).pipe(take(1));
  }

  addBlogs(data: any): Observable<any> {
    return this.http.post(API_LINKS.BLOG_URL, data).pipe(take(1));
  }

  deleteBlog(blogID: number): Observable<any> {
    const params = new HttpParams().set('id', blogID);
    return this.http
      .delete(API_LINKS.BLOG_URL, { params: params })
      .pipe(take(1));
  }

  editBlogs(data: any, blogID: number): Observable<any> {
    const params = new HttpParams().set('id', blogID);
    return this.http
      .put(API_LINKS.BLOG_URL, data, { params: params })
      .pipe(take(1));
  }

  changeCover(data: any, blogID: number): Observable<any> {
    const params = new HttpParams().set('id', blogID);
    return this.http
      .post(API_LINKS.BLOG_PIC_URL, data, { params: params })
      .pipe(take(1));
  }
}
