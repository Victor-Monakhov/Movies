import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ContentService, PageInfo} from "../../../../shared/services/content/content.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WIN_SIZES} from "../../../../app.config";

@Component({
  selector: 'app-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit, OnDestroy {

  public rows: number = 0;
  public columns: number = 0;

  constructor(public contentService: ContentService, public activateRoute: ActivatedRoute, public router: Router) {
  }

  public ngOnInit(): void {
    this.contentService.currPage$.next(new PageInfo(this.activateRoute.snapshot.params['page']));
    this.onResize({target: window});
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

  @HostListener('window:resize', ['$event'])
  public onResize({target}: any): void {
    if(target.innerWidth <= WIN_SIZES.SM){
      this.rows = Math.round(this.contentService.moviesSubject.value.length / 2);
      this.columns = 2;
    } else if(target.innerWidth <= WIN_SIZES.MD){
      this.rows = Math.round(this.contentService.moviesSubject.value.length / 4);
      this.columns = 4;
    } else {
      this.rows = Math.round(this.contentService.moviesSubject.value.length / 6);
      this.columns = 6;
    }
  }
}
