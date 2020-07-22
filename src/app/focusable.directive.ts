import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[focusable]'
})
export class FocusableDirective implements AfterViewInit {
  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    this.host.nativeElement.focus();
  }
}
