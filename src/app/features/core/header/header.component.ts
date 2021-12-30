import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HomeContentService} from "../../../shared/services/home-content/home-content.service";
import {PositionStrategy} from "@angular/cdk/overlay";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public toFavouriteFlag: boolean = false;
  public dropdownMenuFlag: boolean = false;
  public dropdownMenuFocus: boolean = false;
  public currentUrl: string = '';

  public constructor(public router: Router) {}

  public ngOnInit(): void {
    this.toFavouriteFlag = location.href.includes('account');
  }

  public onAccount(){
    console.log(document.querySelector('.dropdown-menu'));
  }
  public onFavourite(){
    this.toFavouriteFlag = !this.toFavouriteFlag;
    this.toFavouriteFlag ? this.router.navigate(['/account']) : this.router.navigate(['/list/1']);
  }
  public onClear(){
    localStorage.removeItem('favourites');
  }
}
