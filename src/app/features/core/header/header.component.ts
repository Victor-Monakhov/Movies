import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public accountBtnFlag: boolean = false;

  public constructor(public router: Router) { }

  public ngOnInit(): void {
  }

  public onAccount(){
    this.accountBtnFlag = !this.accountBtnFlag;
    this.accountBtnFlag ? this.router.navigate(['/account']) : this.router.navigate(['/']);
  }
}
