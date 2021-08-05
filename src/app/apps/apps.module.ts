import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { ApplayoutComponent } from './applayout/applayout.component';
import { HomeComponent } from './home/home.component';
import {ScrollToTopComponent} from '../scroll-to-top/scroll-to-top.component';
import {BlankPageComponent} from './blank-page/blank-page.component';


@NgModule({
  declarations: [
    ApplayoutComponent,
    HomeComponent,
    ScrollToTopComponent,
    BlankPageComponent
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
