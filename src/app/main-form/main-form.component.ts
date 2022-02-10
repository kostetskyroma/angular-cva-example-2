import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit {
  public form = new FormGroup({
    // addressInfo: new FormControl(null),
    basicInfo: new FormControl(null),
  });

  constructor() {}

  ngOnInit(): void {
    this.form.markAsPristine();
  }

  onPatchBasicForm() {
    this.form.patchValue({ basicInfo: null });
  }

  onPatchBasicFormWithValues() {
    this.form.patchValue({
      basicInfo: { firstName: 'name', lastName: 'name2' },
    });
  }
}
