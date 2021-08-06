import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffLayoutComponent } from './staff-layout/staff-layout.component';
import {SharedModule} from '../shared.module';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    StaffLayoutComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ]
})
export class StaffModule { }
