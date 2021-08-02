import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsComponent} from './forms/forms.component';
import {FormRecheckComponent} from './admin/form-recheck/form-recheck.component';
import {PrintReportComponent} from './admin/print-report/print-report.component';




const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'form'},
  {path: 'form', component: FormsComponent},
  {path: 'formRecheck', component: FormRecheckComponent},
  // {path: 'printReport', component: PrintReportComponent},
  // {path:'**',redirectTo:'date'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
