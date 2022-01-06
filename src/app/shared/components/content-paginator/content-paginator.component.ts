import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-content-paginator',
  templateUrl: './content-paginator.component.html',
  styleUrls: ['./content-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentPaginatorComponent implements OnInit, OnChanges {

  @Input() public currentPage: number = 1;
  @Input() public lastPage: number = 1;
  @Output() public clickEvent: EventEmitter<number> = new EventEmitter<number>();
  public pageButtons: number[] = [];
  private readonly pageButtonsCount: number = 4;

  constructor() {
  }

  public ngOnInit(): void {
    this.updatePageButtons(this.currentPage);
  }

  public ngOnChanges(changes: SimpleChanges) {
    const change = changes['currentPage'];
    if (change.previousValue !== change.currentValue) {
      if (this.checkRightSide(change.previousValue, change.currentValue) ||
        this.checkLeftSide(change.previousValue, change.currentValue) ||
        !this.pageButtons.includes(change.currentValue)
      )
        this.updatePageButtons(this.currentPage);
    }
  }

  private checkRightSide(previousValue: number, currentValue: number) {
    return (
      previousValue === this.pageButtons[this.pageButtonsCount - 1] &&
      previousValue < currentValue
    );
  }

  private checkLeftSide(previousValue: number, currentValue: number) {
    return (previousValue === this.pageButtons[0] && previousValue > currentValue);
  }

  private updatePageButtons(page: number) {
    this.pageButtons = [];
    if (page < this.lastPage - this.pageButtonsCount + 1) {
      for (let i = page; i < page + this.pageButtonsCount; ++i) {
        this.pageButtons.push(i);
      }
    } else {
      for (let i = this.lastPage - this.pageButtonsCount + 1; i <= this.lastPage; ++i) {
        this.pageButtons.push(i);
      }
    }
  }

  public onFirst(): void {
    if (this.currentPage === 1) {
      this.updatePageButtons(1);
    } else {
      this.clickEvent.emit(1);
    }
  }

  public onPrev(): void {
    if (this.currentPage > 1) {
      this.clickEvent.emit(this.currentPage - 1);
    }
  }

  public onNext(): void {
    if (this.currentPage < this.lastPage) {
      this.clickEvent.emit(this.currentPage + 1);
    }
  }

  public onLast(): void {
    if (this.currentPage === this.lastPage) {
      this.updatePageButtons(this.lastPage);
    } else {
      this.clickEvent.emit(this.lastPage);
    }
  }

  public onPageBtn(key: number): void {
    this.clickEvent.emit(key);
  }

  public onWatchLeft() {
    if (this.pageButtons[1] - this.pageButtonsCount > 0) {
      this.updatePageButtons(this.pageButtons[1] - this.pageButtonsCount);
    } else {
      this.updatePageButtons(1);
    }
  }

  public onWatchRight() {
    this.updatePageButtons(this.pageButtons[this.pageButtonsCount - 1]);
  }
}
