import {
  Component,
  OnInit,
  Output,
  ContentChild,
  EventEmitter,
  ElementRef,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, filter, take, switchMapTo } from 'rxjs/operators';

import { EditModeDirective } from './edit-mode.directive';
import { ViewModeDirective } from './view-mode.directive';

@Component({
  selector: 'editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css']
})
export class EditableComponent implements OnInit, OnDestroy {
  @Output() update = new EventEmitter();
  @ContentChild(ViewModeDirective) viewModeTpl!: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl!: EditModeDirective;

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private host: ElementRef) {}

  get currentView(): TemplateRef<any> {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  private get element(): HTMLElement {
    return this.host.nativeElement;
  }

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  toViewMode(): void {
    this.update.next();
    this.mode = 'view';
  }

  private viewModeHandler(): void {
    fromEvent(this.element, 'dblclick')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);
      });
  }

  private editModeHandler(): void {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target as Node) === false),
      take(1)
    );

    this.editMode$
      .pipe(switchMapTo(clickOutside$), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.update.next();
        this.mode = 'view';
      });
  }
}
