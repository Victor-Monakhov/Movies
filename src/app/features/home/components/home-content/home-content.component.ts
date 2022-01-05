import {Component, OnDestroy, OnInit} from '@angular/core';
import {HomeContentService, PageInfo} from "../../../../shared/services/home-content/home-content.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit, OnDestroy {

  constructor(public contentService: HomeContentService, public activateRoute: ActivatedRoute, public router: Router) {
  }

  public ngOnInit(): void {
    this.contentService.currPage$.next(new PageInfo(this.activateRoute.snapshot.params['page']));
  }


  public ngOnDestroy() {
  }

  public setMovies(page: number = 1) {
    this.contentService.currPage$.next(new PageInfo(page));
    this.router.navigate(['/list', page]);
  }

  public onMovie(id: number) {
    this.router.navigate(['/movie', id], {queryParams: {page: this.contentService.currPage$.value.page}});
  }
}
