import {
  Directive,
  ElementRef,
  Input,
  Optional,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {TemplatePortal} from "@angular/cdk/portal";
import {merge, Observable} from "rxjs";
import {DropdownPanel} from "./dropdown-panel";


@Directive({
  selector: '[appDropDown]',
  host: {
    "(click)": "toggleDropdown()"
  },
  providers: []
})
export class DropdownDirective {

  private isDropdownOpen = false;
  public dropdownClosingActionsSub: any;

  @Input("appDropDown") public dropdownPanel: DropdownPanel = {} as DropdownPanel;

  constructor(
    @Optional() public overlayRef: OverlayRef,
    public overlay: Overlay,
    public elementRef: ElementRef,
    public viewContainerRef: ViewContainerRef) {
  }

  toggleDropdown(): void {
    this.isDropdownOpen ? this.destroyDropdown() : this.openDropdown();
  }

  openDropdown(): void {
    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: "cdk-overlay-transparent-backdrop",
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
         .position()
         .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: "end",
            originY: "bottom",
            overlayX: "end",
            overlayY: "top"
          }
        ])
    });
    const templatePortal = new TemplatePortal(
      this.dropdownPanel.templateRef as TemplateRef<any>,
      this.viewContainerRef
    );
    this.overlayRef.attach(templatePortal);
    this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe(
      () => this.destroyDropdown()
    );
  }

  private dropdownClosingActions(): Observable<MouseEvent | void> {
      const backdropClick$ = this.overlayRef.backdropClick();
      const detachment$ = this.overlayRef.detachments();
      const dropdownClosed = this.dropdownPanel.closed;
      return merge(backdropClick$, detachment$, dropdownClosed);
  }

  private destroyDropdown(): void {
    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }
    this.dropdownClosingActionsSub.unsubscribe();
    this.isDropdownOpen = false;
    this.overlayRef.detach();
  }
}
