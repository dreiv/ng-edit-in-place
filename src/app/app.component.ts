import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  entities = [
    { id: 1, name: 'Andrei Voicu', isAdmin: true },
    { id: 2, name: 'John Due', isAdmin: false }
  ];

  controls!: FormArray;

  ngOnInit(): void {
    const toGroups = this.entities.map((entity: any) => {
      return new FormGroup({
        name: new FormControl(entity.name, Validators.required),
        isAdmin: new FormControl(entity.isAdmin)
      });
    });

    this.controls = new FormArray(toGroups);
  }

  getControl(index: number, field: string): AbstractControl | null {
    return this.controls.at(index).get(field);
  }
}
