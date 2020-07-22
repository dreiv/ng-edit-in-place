import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EditableComponent } from './editable/editable.component';
import { ViewModeDirective } from './editable/view-mode.directive';
import { EditModeDirective } from './editable/edit-mode.directive';
import { EditableOnEnterDirective } from './editable/editable-on-enter.directive';
import { FocusableDirective } from './focusable.directive';

@NgModule({
  declarations: [
    AppComponent,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableOnEnterDirective,
    FocusableDirective
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
