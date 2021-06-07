import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';

import { DatepickerComponent } from 'app/shared-components/datepicker/datepicker.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ClarityModule,
    CommonModule
  ],
  declarations: [
    DatepickerComponent
  ],
  exports: [
    DatepickerComponent
  ]
})
export class DatepickerModule {}



