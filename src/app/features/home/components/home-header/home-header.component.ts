import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  readonly logoPath: string = "../../../../../assets/images/logo.png";
  readonly anglePath: string = "../../../../../assets/images/angle_down.png";
  screenWidth: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
