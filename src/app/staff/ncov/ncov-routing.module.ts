import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewComponent} from './view/view.component';
import {ReportComponent} from './report/report.component';
import {RecheckComponent} from './recheck/recheck.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: '', redirectTo: 'view', pathMatch: 'full'},
  {path: 'view', component: ViewComponent},
  {path: 'recheck', component: RecheckComponent},
  {path: 'report', component: ReportComponent},
  {path: 'search', component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NcovRoutingModule { }
