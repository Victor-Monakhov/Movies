import {Component, OnInit} from '@angular/core';
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
export class MovieComponent implements OnInit {

  public currentMovie: Observable<MovieResponse> | undefined;
  public checkQueryParams: boolean = true;
  constructor(
    public contentService: HomeContentService,
    public activateRoute: ActivatedRoute,
    public router: Router) {
  }

  public ngOnInit(): void{
    this.currentMovie = this.currMovieInit();
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
      switchMap(id => this.contentService.getMovie(id).pipe(delay(4000)))
    )
  }

  public onNextMovie(): void{
    let index: number = this.contentService.moviesSubject.value
      ?.findIndex((movie) => {
        return  +this.activateRoute.snapshot.params['id'] === movie.id;
      }) ?? -1;
    if(index < 0) return;
    if(index + 1 === this.contentService.moviesSubject.value?.length) {
      let page: number = this.contentService.currentPage + 1;
      if(this.contentService.currentPage + 1 > this.contentService.lastPage){
        page = 1;
      }
        this.contentService.getContent(page)
         .subscribe(movies => {
        this.contentService.moviesSubject.next(movies);
        index = 0;
        this.navigateToNextMovie(index);
      });
    } else{
      this.navigateToNextMovie(index + 1);
    }
  }

  public navigateToNextMovie(index: number): void{
    let nextMovieId: number | undefined = this.contentService.moviesSubject.value[index].id;
    this.router.navigate(['/movie', nextMovieId],{queryParams:{page: this.contentService.currentPage}});
  }

  public onBackToList(): void{
    this.router.navigate(['/list', this.contentService.currentPage]);
  }
}
