import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThaiDatePipe} from './pipes/thai-date.pipe';
import {DataTablesModule} from 'angular-datatables';
import {DigitOnlyModule} from '@uiowa/digit-only';



@NgModule({
  declarations: [ThaiDatePipe],
  imports: [
    CommonModule,
    DataTablesModule,
    DigitOnlyModule
  ],
  exports: [ThaiDatePipe]
})
export class SharedModule {
}
