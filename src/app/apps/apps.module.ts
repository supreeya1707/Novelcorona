import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsRoutingModule } from './apps-routing.module';
import { ApplayoutComponent } from './applayout/applayout.component';
import { HomeComponent } from './home/home.component';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {SharedModule} from '../shared.module';
import { HomeisolationComponent } from './homeisolation/homeisolation.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ApplayoutComponent,
    HomeComponent,
    BlankPageComponent,
    HomeisolationComponent
  ],
    imports: [
        CommonModule,
        AppsRoutingModule,
        SharedModule,
        FormsModule
    ]
})
export class AppsModule { }
