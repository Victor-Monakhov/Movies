import {Component, OnInit} from '@angular/core';
import {MovieResponse} from "../../../../shared/models/home-content";
import {combineLatest, switchMap} from "rxjs";
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public currentMovie: MovieResponse | undefined;

  constructor(
    public contentService: HomeContentService,
    public activateRoute: ActivatedRoute,
    public router: Router) {
  }

  public ngOnInit(): void {
    combineLatest([this.activateRoute.params, this.activateRoute.queryParams]).pipe(
      switchMap(([params, queryParams]) =>{
        if(this.contentService.moviesSubject.value.length === 0){
          this.contentService.getContent(+queryParams['page']).
            subscribe(movies => this.contentService.moviesSubject.next(movies));
        }
        return this.contentService.getMovie(params['id']);
      })
    ).subscribe(movie => {
      this.currentMovie = movie;
    });
  }

  public onNextMovie(): void{
    let index: number = this.contentService.moviesSubject.value
      ?.findIndex((movie) => {
        return movie.id === this.currentMovie?.id
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
    let nextMovieId: number | undefined = this.contentService.moviesSubject.getValue()?.[index].id;
    this.router.navigate(['/movie', nextMovieId],{queryParams:{page: this.contentService.currentPage}});
  }

  public onBackToList(): void{
    this.router.navigate(['/list', this.contentService.currentPage]);
  }
}
