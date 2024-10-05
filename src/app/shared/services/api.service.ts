import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ROUTES_URL } from '../constant/route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  moviesBasePath = environment.moviePath;
  postBasePath = environment.postPath;
  // private http = inject(HttpClient)

  constructor(private http: HttpClient) { }

  getMovies() {
    try {
      return this.http.get(this.moviesBasePath + ROUTES_URL.getMovies);
    } catch (error) {
      throw new Error();
    }
  }

  getPosts(){
    try {
      return this.http.get(this.postBasePath+ROUTES_URL.getPost);
    } catch (error) {
      throw new Error();
    }
  }
}
