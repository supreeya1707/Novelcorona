import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThaiDatePipe} from './pipes/thai-date.pipe';
import {DigitOnlyModule} from '@uiowa/digit-only';



@NgModule({
  declarations: [ThaiDatePipe],
  imports: [
    CommonModule,
    DigitOnlyModule
  ],
  exports: [ThaiDatePipe]
})
export class SharedModule {
}
