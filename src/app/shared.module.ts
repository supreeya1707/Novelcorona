import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThaiDatePipe} from './pipes/thai-date.pipe';



@NgModule({
  declarations: [ThaiDatePipe],
  imports: [
    CommonModule,
  ],
  exports: [ThaiDatePipe]
})
export class SharedModule {
}
