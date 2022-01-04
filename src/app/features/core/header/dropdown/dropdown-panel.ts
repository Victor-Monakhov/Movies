import {EventEmitter, TemplateRef} from "@angular/core";

export interface DropdownPanel{
  templateRef: TemplateRef<any>;
  closed: EventEmitter<void>;
}
