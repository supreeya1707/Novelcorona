import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {NcovLayoutComponent} from './ncov/ncov-layout/ncov-layout.component';
import {LoginNcovComponent} from './login-ncov/login-ncov.component';
import {BlankPageComponent} from './blank-page/blank-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'blankpage', component: BlankPageComponent},
  {path: 'login/ncov', component: LoginNcovComponent},
  {path: 'nCoV', loadChildren: () => import('./ncov/ncov.module').then(m => m.NcovModule), component: NcovLayoutComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
