import {Component, EventEmitter, OnInit} from '@angular/core';
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";
import {delay, finalize, map, Observable, tap} from "rxjs";
import {Movie} from "../../../../shared/models/home-content";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  public currentPage: number = 1;
  public lastPage: number = 83;
  public movies$: Observable<Movie[]> | undefined;

  constructor(public contentService: HomeContentService) {
  }

  public ngOnInit(): void {
    this.setMovies(this.currentPage);
  }

  public setMovies(page: number = 1){
    this.movies$ = this.contentService.getContent(page).pipe(
      //delay(1000),
      tap((response) => this.currentPage = response.page),
      map((response) => response.results)
    );
  }
}
