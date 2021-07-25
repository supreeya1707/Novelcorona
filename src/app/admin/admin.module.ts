import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {thBeLocale} from 'ngx-bootstrap/locale';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ViewNovelcorona2Component} from './view-novelcorona2/view-novelcorona2.component';
import {LayoutComponent} from './layout/layout.component';
import {FormRecheckComponent} from './form-recheck/form-recheck.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {SharedModule} from "../shared.module";


defineLocale('th-be', thBeLocale);

@NgModule({
  declarations: [
    ViewNovelcorona2Component,
    LayoutComponent,
    FormRecheckComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        BsDatepickerModule.forRoot(),
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        DigitOnlyModule,
        SharedModule,
    ]
})
export class AdminModule { }
