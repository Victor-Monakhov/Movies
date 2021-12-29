import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {MovieResponse, PageResponse} from "../../models/home-content";

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {

  public currentPage: number = 1;
  public lastPage: number = 80;
  public moviesSubject: BehaviorSubject<MovieResponse[]>  = new BehaviorSubject<MovieResponse[]>([]);


  constructor(private http: HttpClient) {
  }

  public getContent(page: number = 1):Observable<MovieResponse[]>{
   return this.http.get<PageResponse>(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${page}`)
      .pipe(
        tap((response) => this.currentPage = response.page),
        map(response => response.results)
      );
  }

  public getMovie(id: number): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`);
  }

  public addFavourite(id: number){
    const favourites: number[] | null = JSON.parse(localStorage.getItem('favourites') as string);
    if(favourites) {
      localStorage.removeItem('favourites');
      favourites.push(id);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    } else {
      localStorage.setItem('favourites', JSON.stringify([id]));
    }
  }
}
