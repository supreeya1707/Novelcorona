import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Covid19RoutingModule } from './covid19-routing.module';
import { Covid19Component } from './covid19.component';
import {SharedModule} from '../shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {DigitOnlyModule} from '@uiowa/digit-only';


@NgModule({
  declarations: [
    Covid19Component
  ],
    imports: [
      CommonModule,
      Covid19RoutingModule,
      SharedModule,
      FormsModule,
      BsDatepickerModule.forRoot(),
      ReactiveFormsModule,
      DigitOnlyModule
    ]
})
export class Covid19Module { }
