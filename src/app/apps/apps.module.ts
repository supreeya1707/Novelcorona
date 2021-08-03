import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { ApplayoutComponent } from './applayout/applayout.component';
import { HomeComponent } from './home/home.component';
import {ScrollToTopComponent} from "../scroll-to-top/scroll-to-top.component";


@NgModule({
  declarations: [
    ApplayoutComponent,
    HomeComponent,
    ScrollToTopComponent
  ],
  exports: [
    ScrollToTopComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule
  ]
})
export class AppsModule { }
