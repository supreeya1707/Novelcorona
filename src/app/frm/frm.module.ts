import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrmRoutingModule } from './frm-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Novelcorona2Component} from './novelcorona2/novelcorona2.component';
import {SharedModule} from '../shared.module';
import {AppsModule} from "../apps/apps.module";


@NgModule({
  declarations: [
    Novelcorona2Component,
  ],
  imports: [
    CommonModule,
    FrmRoutingModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    AppsModule,
  ]
})
export class FrmModule { }
