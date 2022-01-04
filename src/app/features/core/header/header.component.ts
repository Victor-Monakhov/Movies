import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  public toFavouriteFlag: boolean = false;

  public constructor(public router: Router) {}

  public ngOnInit(): void {
    this.toFavouriteFlag = location.href.includes('account');
  }

  public onFavourite(){
    this.toFavouriteFlag = !this.toFavouriteFlag;
    this.toFavouriteFlag ? this.router.navigate(['/account']) : this.router.navigate(['/list/1']);
  }
  public onClear(){
    localStorage.removeItem('favourites');
  }
}
