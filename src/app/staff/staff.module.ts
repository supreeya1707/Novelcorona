import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffLayoutComponent } from './staff-layout/staff-layout.component';
import {SharedModule} from '../shared.module';
import { MainComponent } from './main/main.component';
import {LoginNcovComponent} from './login-ncov/login-ncov.component';
import {FormsModule} from '@angular/forms';
import {BlankPageComponent} from './blank-page/blank-page.component';


@NgModule({
  declarations: [
    StaffLayoutComponent,
    MainComponent,
    LoginNcovComponent,
    BlankPageComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class StaffModule { }
