import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsRoutingModule } from './apps-routing.module';
import { ApplayoutComponent } from './applayout/applayout.component';
import { HomeComponent } from './home/home.component';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {SharedModule} from '../shared.module';


@NgModule({
  declarations: [
    ApplayoutComponent,
    HomeComponent,
    BlankPageComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    SharedModule
  ]
})
export class AppsModule { }
