import {Component, OnInit} from '@angular/core';
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";
import {delay, filter, map, Observable, tap} from "rxjs";
import {Movie} from "../../../../shared/models/home-content";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  public currentPage: number = 1;
  public lastPage: number = 83;
  //public movies$: Observable<Movie[]> | undefined;
  public currentMovie: Movie | undefined;

  constructor(public contentService: HomeContentService, public activateRoute: ActivatedRoute, public router: Router) {
  }

  public ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.contentService.movies$ = this.contentService.getContent(params['page']).pipe(
        tap((response) => this.currentPage = response.page ),
        map((response) => response.results)
      );
    });
  }

  public setMovies(page: number = 1){
    this.router.navigate(['/list', page]);
  }
}
