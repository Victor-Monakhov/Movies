import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, concatMap, from, map, Observable, Subject, switchMap, takeUntil, tap, toArray} from "rxjs";
import {MovieResponse, PageResponse} from "../../models/home-content";

export class PageInfo{
  public page: number;
  public callback: Function;
  constructor(page: number = 1, callback:Function = ()=>{}){
    this.page = page;
    this.callback = callback;
  }
}

@Injectable({
  providedIn: 'root'
})

export class HomeContentService implements OnDestroy{


  public currentPage: number = 1;
  public lastPage: number = 80;
  public isFavourite: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();
  public currPage$: BehaviorSubject<PageInfo> = new BehaviorSubject(new PageInfo());

  public moviesSubject: BehaviorSubject<MovieResponse[]>  = new BehaviorSubject<MovieResponse[]>([]);
  public favourites$: BehaviorSubject<MovieResponse[]> = new BehaviorSubject<MovieResponse[]>([]);
  public readonly favouritesKey: string = 'favourites';


  constructor(private http: HttpClient) {
    this.updateState();
  }

  public updateState(){
    this.currPage$.pipe(
      switchMap(pageInfo =>{
        return this.getContent(pageInfo.page).pipe(
          tap((response) => this.currentPage = response.page),
          map(response => [response.results, pageInfo.callback])
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(result => {
      this.moviesSubject.next(result[0] as MovieResponse[]);
      (result[1] as Function)(result[0]);
    });
  }

  public getContent(page: number = 1):Observable<PageResponse>{
   return this.http.get<PageResponse>(`http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${page}`);
  }

  public getMovie(id: number): Observable<MovieResponse>{
    return this.http.get<MovieResponse>(`https://api.themoviedb.org/3/movie/${id}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US`);
  }

  public addFavourite(id: number): void{
    const favourites: number[] | null = JSON.parse(localStorage.getItem(this.favouritesKey) as string);
    if(favourites) {
      localStorage.removeItem(this.favouritesKey);
      if(!favourites.find(item => item === id)) {
        favourites.push(id);
        this.isFavourite = true;
      }
      localStorage.setItem(this.favouritesKey, JSON.stringify(favourites));
    } else {
      this.isFavourite = true;
      localStorage.setItem(this.favouritesKey, JSON.stringify([id]));
    }
    this.updateFavourites();
  }

  public removeFavourite(id: number): void{
    let favourites: number[] | null = JSON.parse(localStorage.getItem(this.favouritesKey) as string);
    if(favourites) {
      this.isFavourite = false;
      localStorage.removeItem(this.favouritesKey);
      favourites = favourites.filter(item => item !== id);
      localStorage.setItem(this.favouritesKey, JSON.stringify(favourites));
    }
    this.updateFavourites();
  }

  public checkFavourite(id: number){
    const favourites: number[] | null =  JSON.parse(localStorage.getItem(this.favouritesKey) as string);
    this.isFavourite =  !!favourites?.find(item => item === id);
  }

  public onFavourite(id: number) {
    this.checkFavourite(id);
    if(!this.isFavourite){
      this.addFavourite(id);
    } else {
      this.removeFavourite(id);
    }
  }

  public updateFavourites(){

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
