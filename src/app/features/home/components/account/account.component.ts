import { Component, OnInit } from '@angular/core';
import {concatMap, from, map, mergeMap, Observable, of, switchMap, tap, toArray} from "rxjs";
import {MovieResponse} from "../../../../shared/models/home-content";
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public favourites$: Observable<MovieResponse[]> | undefined;

  constructor(public contentService: HomeContentService) { }

  ngOnInit(): void {
    const favourites: number[] = JSON.parse(localStorage.getItem(this.contentService.favouritesKey) as string) || [];
    this.favourites$ = from(favourites).pipe(
      concatMap(movieId => this.contentService.getMovie(movieId)),
      toArray()
    );
  }

  public onLog(){
    console.log(this.favourites$);
  }

}
