import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {MoviesPage} from "../../models/home-content";

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {

  content: MoviesPage | any  = {};

  constructor(private http: HttpClient) {

  }

  public getContent(): Observable<MoviesPage>{
    return this.http.get<MoviesPage>("http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=1")
      .pipe(tap(pages => {
        this.content = pages;
      }));
  }

}
