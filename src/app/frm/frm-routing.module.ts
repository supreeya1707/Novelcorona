import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Novelcorona2Component} from './novelcorona2/novelcorona2.component';
import {SwabComponent} from './swab/swab.component';
import {Swab2Component} from './swab2/swab2.component';


const routes: Routes = [
  {path: 'novelcorona2', component: Novelcorona2Component},
  {path: 'swab', component: SwabComponent},
  {path: 'swab2', component: Swab2Component},

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrmRoutingModule { }
