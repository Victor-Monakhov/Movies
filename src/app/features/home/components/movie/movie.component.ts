import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MovieResponse} from "../../../../shared/models/home-content";
import {
  combineLatest, delay,
  map,
  Observable,
  of,
  switchMap,
  tap
} from "rxjs";
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit{

  public currentMovie$: Observable<MovieResponse> | undefined;
  public nextPageFlag: boolean = false;
  public favouriteMode: boolean = false;
  constructor(
    public contentService: HomeContentService,
    public activateRoute: ActivatedRoute,
    public router: Router) {
  }

  public ngOnInit(): void{
    this.currentMovie$ = this.currMovieInit();
    this.favouriteMode = !!this.activateRoute.snapshot.queryParams['mode'];
  }

  public currMovieInit(): Observable<MovieResponse> {
    return combineLatest([this.activateRoute.params, this.activateRoute.queryParams]).pipe(
      switchMap(([params, queryParams]) =>{
        const checkMovies = !this.contentService.moviesSubject.value.length;
        if(checkMovies && queryParams['page']) {
          return this.contentService.getContent(+queryParams['page']).pipe(
            tap(movies => {
              this.contentService.moviesSubject.next(movies)
            }),
            map(movies => params['id'])
          );
        } else {
          return of(params['id']);
        }
      }),
      switchMap(id => {
        return this.contentService.getMovie(id).pipe(
          delay(1500),
          tap(movie => this.nextPageFlag = false));
      })
    )
  }

  public onNextMovie(): void{
    const movies: MovieResponse[] = this.favouriteMode ?
                this.contentService.favourites$.value :
                this.contentService.moviesSubject.value;
    let index: number = movies?.findIndex((movie) => {
        return  +this.activateRoute.snapshot.params['id'] === movie.id;
      }) ?? -1;
    if(index < 0) return;
    if(!this.favouriteMode && index + 1 === this.contentService.moviesSubject.value?.length) {
      let page: number = this.contentService.currentPage + 1;
      if(this.contentService.currentPage + 1 > this.contentService.lastPage){
        page = 1;
      }
        this.contentService.getContent(page)
         .subscribe(movies => {
        this.contentService.moviesSubject.next(movies);
        index = 0;
        this.navigateToNextMovie(movies, index);
      });
    } else {
      if(index + 1 === movies.length){
        index = -1;
      }
      this.navigateToNextMovie(movies, index + 1);
    }
  }

  public onFavourite(){
    this.contentService.addFavourite(+this.activateRoute.snapshot.params['id']);
  }

  public navigateToNextMovie(movies: MovieResponse[], index: number): void{
    this.nextPageFlag = true;
    let nextMovieId: number | undefined = movies[index].id;
    const qParams = !this.favouriteMode ?
      {page: this.contentService.currentPage} :
      {mode: this.contentService.favouritesKey};
    this.router.navigate(['/movie', nextMovieId],{queryParams: qParams});
  }

  public onBackToList(): void{
    this.router.navigate(['/list', this.contentService.currentPage]);
  }
}
