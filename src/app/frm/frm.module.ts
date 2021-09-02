import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrmRoutingModule } from './frm-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {Novelcorona2Component} from './novelcorona2/novelcorona2.component';
import {SharedModule} from '../shared.module';
import {DigitOnlyModule} from '@uiowa/digit-only';
import { SwabComponent } from './swab/swab.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { Swab2Component } from './swab2/swab2.component';


@NgModule({
  declarations: [
    Novelcorona2Component,
    SwabComponent,
    Swab2Component,
  ],
  imports: [
    CommonModule,
    FrmRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    DigitOnlyModule,
    ModalModule.forRoot()
  ]
})
export class FrmModule {}
