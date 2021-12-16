import { Component, OnInit } from '@angular/core';
import {HomeContentService} from "../../../../shared/services/home-content/home-content.service";

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  loadingFlag: boolean = false;

  constructor(public contentService: HomeContentService) { }

  ngOnInit(): void {
    this.contentService.getContent().subscribe(() => {
      this.loadingFlag = true;
    });
  }
}
