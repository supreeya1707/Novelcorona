import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrmRoutingModule } from './frm-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {Novelcorona2Component} from './novelcorona2/novelcorona2.component';
import {SharedModule} from '../shared.module';
import {DigitOnlyModule} from '@uiowa/digit-only';


@NgModule({
  declarations: [
    Novelcorona2Component,
  ],
  imports: [
    CommonModule,
    FrmRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    DigitOnlyModule,
  ]
})
export class FrmModule {}
