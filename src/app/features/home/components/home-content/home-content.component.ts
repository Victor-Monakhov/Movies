import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";
import {delay, filter, map, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";
import {MovieResponse} from "../../../../shared/models/home-content";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit, OnDestroy{

  private destroy$: Subject<void> = new Subject<void>();

  constructor(public contentService: HomeContentService, public activateRoute: ActivatedRoute, public router: Router) {
  }

  public ngOnInit(): void {
    this.activateRoute.params.pipe(
      switchMap(params => this.contentService.getContent(params['page'])),
      takeUntil(this.destroy$)
    )
      .subscribe(movies => {
        this.contentService.moviesSubject.next(movies);
      });
  }

  public ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setMovies(page: number = 1){
    this.router.navigate(['/list', page]);
  }

  public onMovie(id: number){
    this.router.navigate(['/movie', id], {queryParams:{page: this.contentService.currentPage}});
  }
}
