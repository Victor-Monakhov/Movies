import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {DropdownPanel} from "./dropdown-panel";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: []
})

export class DropdownComponent implements OnInit, DropdownPanel {
  @ViewChild(TemplateRef) templateRef: TemplateRef<any> = {} as TemplateRef<any>;
  @Output() closed = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
