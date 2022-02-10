import { ChangeDetectorRef, Component, forwardRef } from '@angular/core';
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
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInfoComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressInfoComponent),
      multi: true,
    },
  ],
})
export class AddressInfoComponent implements ControlValueAccessor {
  public form: FormGroup = new FormGroup({
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
  });

  public onTouched: undefined | (() => void) = undefined;
  public onChanged: undefined | ((value: any) => void) = undefined;

  public initialState = null;

  constructor(
    private controlContainer: ControlContainer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
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
      this.changeDetectorRef.detectChanges();
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
      this.markAsPristine(form.parent);
    }
  }
}
