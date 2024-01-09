import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_LINKS } from '../variables';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(private http: HttpClient) {}
}
