import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplayoutComponent} from './applayout/applayout.component';
import {HomeComponent} from './home/home.component';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {HomeisolationComponent} from './homeisolation/homeisolation.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'blankpage', component: BlankPageComponent},
  {path: 'homeisolation', component: HomeisolationComponent},
//   {
//   path: 'apps',
//   component: ApplayoutComponent,
//   children: [
//     {path: '', redirectTo: 'home', pathMatch: 'full'},
//     {path: 'home', component: HomeComponent},
//     {path: 'blankpage', component: BlankPageComponent},
//   ]
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
