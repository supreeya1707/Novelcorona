import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThaiDatePipe} from './pipes/thai-date.pipe';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {ScrollToTopComponent} from "./scroll-to-top/scroll-to-top.component";



@NgModule({
  declarations: [ThaiDatePipe, ScrollToTopComponent],
  imports: [
    CommonModule,
    DigitOnlyModule,
  ],
  exports: [ThaiDatePipe, ScrollToTopComponent]
})
export class SharedModule {
}
