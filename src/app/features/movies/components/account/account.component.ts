import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContentService} from "../../../../shared/services/content/content.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(public contentService: ContentService, public router: Router) {
  }

  ngOnInit(): void {
    this.contentService.getFavourites();
  }

  public onMovie(id: number) {
    this.router.navigate(['/movie', id], {queryParams: {mode: 'favourites'}});
  }
}
