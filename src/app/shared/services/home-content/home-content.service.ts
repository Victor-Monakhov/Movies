import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {MoviesResponse} from "../../models/home-content";

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {

  constructor(private http: HttpClient) {

  }

  public getContent(page: number = 1): Observable<MoviesResponse>{
    return this.http.get<MoviesResponse>(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${page}`);
  }

}
