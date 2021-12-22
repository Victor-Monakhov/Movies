import {Component, Input, OnInit} from '@angular/core';
import {MovieResponse} from "../../../../shared/models/home-content";
import {switchMap} from "rxjs";
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
    this.activateRoute.params.pipe(
      switchMap(params => this.contentService.getMovie(params['id'])))
      .subscribe(movie => {
      this.currentMovie = movie;
    });
  }

  public onNextMovie(){
    let nextMovieId: number | undefined = 0;
    let index: number = this.contentService.moviesSubject.value
      ?.findIndex((movie) => {
        return movie.id === this.currentMovie?.id
      }) ?? -1;
    if(index + 1 === this.contentService.moviesSubject.value?.length) {
      this.contentService.getContent(this.contentService.currentPage + 1)
        .subscribe(movies =>{
        this.contentService.moviesSubject.next(movies);
          index = 0;
          nextMovieId = this.contentService.moviesSubject.getValue()?.[index].id;
          this.router.navigate(['/movie', nextMovieId]);
      });
    } else{
      nextMovieId = this.contentService.moviesSubject.getValue()?.[index + 1].id;
      this.router.navigate(['/movie', nextMovieId]);
    }
  }
  public onBackToList(){
    this.router.navigate(['/list', this.contentService.currentPage]);
  }
}
