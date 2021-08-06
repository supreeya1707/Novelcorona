import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Novelcorona2Component} from './novelcorona2/novelcorona2.component';

const routes: Routes = [
  {path: 'novelcorona2', component: Novelcorona2Component},
//   {
//   path: 'forms',
//   children: [
//     {path: 'novelcorona2', component: Novelcorona2Component},
//   ]
// }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrmRoutingModule { }
