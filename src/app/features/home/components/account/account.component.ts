import { Component, OnInit } from '@angular/core';
import {concatMap, from, tap, toArray} from "rxjs";
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(public contentService: HomeContentService, public router: Router) { }

  ngOnInit(): void {
    const favourites: number[] = JSON.parse(localStorage.getItem(this.contentService.favouritesKey) as string) || [];
    from(favourites).pipe(
      concatMap(movieId => this.contentService.getMovie(movieId)),
      toArray()
    ).subscribe( movies => this.contentService.favourites$.next(movies));
  }
  public onMovie(id: number){
    this.router.navigate(['/movie', id], {queryParams:{mode: 'favourites'}});
  }

}
