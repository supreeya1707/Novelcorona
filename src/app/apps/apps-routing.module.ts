import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplayoutComponent} from './applayout/applayout.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [{
  path: 'apps',
  component: ApplayoutComponent,
  children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }