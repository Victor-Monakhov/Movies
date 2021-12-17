import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home-content-paginator',
  templateUrl: './home-content-paginator.component.html',
  styleUrls: ['./home-content-paginator.component.scss']
})
export class HomeContentPaginatorComponent implements OnInit {

  @Input() public currentPage: number = 1;
  @Input() public lastPage: number = 1;
  @Output() public clickEvent: EventEmitter<number> = new EventEmitter<number>();
  public pageButtons: Map<number, boolean> = new Map<number, boolean>();
  constructor() {
    for(let i = 0; i < 3; ++i)
      this.pageButtons.set(this.currentPage + i, false);
  }

  ngOnInit(): void {
  }

  public clickFirst(): void {
    this.currentPage = 1;
    this.clickEvent.emit(this.currentPage);
  }
  public clickPrev(): void {
    if(this.currentPage > 1)
      this.clickEvent.emit(this.currentPage - 1);
  }
  public clickNext(): void {
    if(this.currentPage < this.lastPage)
      this.clickEvent.emit(this.currentPage + 1);
  }
  public clickLast(): void {
    this.currentPage = this.lastPage;
    this.clickEvent.emit(this.currentPage);
  }
  public onPageBtn(): void {

  }
  public onWatchLeft(){

  }
  public onWatchRight(){

  }

}
