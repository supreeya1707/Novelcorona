import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewNovelcorona2Component} from './view-novelcorona2/view-novelcorona2.component';
import {LayoutComponent} from './layout/layout.component';
import {FormRecheckComponent} from './form-recheck/form-recheck.component';

const routes: Routes = [{
  path: 'admin',
  component: LayoutComponent,
  children: [
    {path: '', redirectTo: 'viewNovelcorona2', pathMatch: 'full'},
    {path: 'viewNovelcorona2', component: ViewNovelcorona2Component},
    {path: 'formRecheck', component: FormRecheckComponent},
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
