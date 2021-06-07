import { Component, forwardRef, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';

import {
  ControlValueAccessor,
  ValidationErrors,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    }
  ]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  public dateForm: FormGroup;
  public date: Date;

  @Input()
  public label: string = '';

  @Input()
  public labelId: string = 'date';

  @Input()
  public transcludedValidationErrors: boolean = false;

  public ngOnInit(): void {
    this.setupForm();
    this.registerFormChanges();
  }

  public onTouched: () => void = () => null;
  public onChange: (value: Date) => void = () => null;

  public writeValue(value: Date): void {
    console.log('writeValue');
    console.log(value instanceof Date);
    console.log(`value: ${JSON.stringify(value)}`);

    if (value) {
      const year: number = value.getUTCFullYear();
      console.log(`year: ${year}`);
      let month: number | string = value.getUTCMonth() + 1;
      let day: number | string = value.getUTCDate();

      if (month < 10) {
        month = '0' + month;
      }

      if (day < 10) {
        day = '0' + day;
      }

      console.log(`day/month/year: ${day}/${month}/${year}`);

      this.dateForm.patchValue({
        date: `${day}/${month}/${year}`,
      }, {
        emitEvent: false
      });
    } else {
      this.datePickerFormReset();
    }

    this.onChange(value);
  }

  public registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public isInvalid(field: string): boolean {
    return (this.dateForm.get(field).invalid &&
      (this.dateForm.get(field).dirty || this.dateForm.get(field).touched));
  }

  private setupForm(): void {
    this.dateForm = new FormGroup({
      date: new FormControl('', [Validators.required, isValidDate]),
    });
  }

  public datePickerFormReset(): void {
    this.dateForm.reset({
      date: '',
    });

    this.registerFormChanges();
  }

  private registerFormChanges(): void {
    console.log('registerFormChanges');
    this.dateForm.valueChanges.subscribe(val => {
      const day: string = this.dateForm.controls.date.value.slice(0, 2);
      const month: string = this.dateForm.controls.date.value.slice(3, 5);
      const year: string = this.dateForm.controls.date.value.slice(6);
      const dateSeparator: Array<string> = [];

      dateSeparator[0] = this.dateForm.controls.date.value.slice(2,3);
      dateSeparator[1] = this.dateForm.controls.date.value.slice(5,6);

      if (dateSeparator[0] === '/' && dateSeparator[1] === '/') {
        // We output a date in UTC format, which is the same as it is when its input, for consistency and to avoid
        // having to do timezone conversions
        this.date = new Date(`${year}-${month}-${day}`);
        // this.writeValue(this.date)
        this.onChange(this.date);
      } else {
        this.date = undefined;
        this.onChange(new Date(undefined));
      }
    });
  }

}


export function isValidDate(c: FormControl): ValidationErrors | null {
  console.log('isValidDate');
  if (!c.value) {
    console.log('return null');
    return null;
  }

  console.log(typeof c.value);
  console.log(`c.value: ${c.value}`);

  // Check it matches the European format DD/MM/YYYY
  if (!c.value.match(/\d{2}\/\d{2}\/\d{4}/)) {
    console.log('1');
    return {
      isValidDate: false
    };
  } else {
    console.log('2');
    // Check to make sure its a valid date, e.g cant have 13 months, cant have 32 days etc
    if (moment(c.value, 'DD/MM/YYYY', true).isValid()) {
      console.log('3');
      return null;
    }
    console.log('4');

    return {
      isValidDate: false
    };
  }
}
