import { Directive, HostListener } from '@angular/core';

import { EditableComponent } from './editable.component';

@Directive({
  selector: '[editableOnEnterBlur]'
})
export class EditableOnEnterDirective {
  constructor(private editable: EditableComponent) {}

  @HostListener('keyup.enter')
  onEnter(): void {
    this.editable.toViewMode();
  }

  @HostListener('blur')
  onBlur(): void {
    this.editable.toViewMode();
  }
}
