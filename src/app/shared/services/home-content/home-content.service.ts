import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {MovieResponse, PageResponse} from "../../models/home-content";

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {

  public currentPage: number = 1;
  public moviesSubject: BehaviorSubject<MovieResponse[] | undefined>;


  constructor(private http: HttpClient) {
    this.moviesSubject = new BehaviorSubject<MovieResponse[] | undefined>(undefined);
  }

  public getContent(page: number = 1): Observable<MovieResponse[]>{
    return this.http.get<PageResponse>(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${page}`)
      .pipe(
        tap((response) => this.currentPage = response.page),
        map((response) => response.results));
  }

  public getMovie(id: number): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`);
  }







}
