import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Covid19Component} from './covid19.component';

const routes: Routes = [
  {path: '', component: Covid19Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Covid19RoutingModule { }
