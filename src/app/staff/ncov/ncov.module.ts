import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NcovRoutingModule } from './ncov-routing.module';
import {ViewComponent} from './view/view.component';
import {RecheckComponent} from './recheck/recheck.component';
import {ReportComponent} from './report/report.component';
import {NcovLayoutComponent} from './ncov-layout/ncov-layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {SharedModule} from '../../shared.module';


@NgModule({
  declarations: [
    NcovLayoutComponent,
    ViewComponent,
    ReportComponent,
    RecheckComponent
  ],
  imports: [
    CommonModule,
    NcovRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NcovModule { }
