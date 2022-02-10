import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BasicInfoComponent),
      multi: true,
    },
  ],
})
export class BasicInfoComponent implements ControlValueAccessor, Validator {
  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    addressInfo: new FormControl(),
  });

  public onTouched: undefined | (() => void) = undefined;
  public onChanged: undefined | ((value: any) => void) = undefined;

  public initialState = null;

  constructor(private controlContainer: ControlContainer) {
    this.initialState = this.form.value;
  }

  ngOnInit() {
    const parentForm = (this.controlContainer as FormGroupDirective)?.form;
    this.form.setParent(parentForm);
  }

  writeValue(obj: any): void {
    obj !== null
      ? this.form.patchValue(obj)
      : this.form.reset(this.initialState);
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;

    this.form.valueChanges.subscribe((value) => {
      this.onChanged?.(value);

      const isAnyControlDirty = (this.form as any)._anyControlsDirty();
      if (!isAnyControlDirty) {
        this.markAsPristine(this.form);
      }
    });

    this.writeValue(this.initialState);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { invalid: true };
  }

  markAsPristine(form: FormGroup | FormArray | null) {
    form?.markAsPristine();

    if (form && form.parent) {
      this.markAsPristine(this.form.parent);
    }
  }
}
