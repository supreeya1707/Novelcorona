import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsComponent} from './forms/forms.component';
import {ReportComponent} from './report/report.component';
import {RegisterComponent} from './register/register.component';
// import {ConfirmComponent} from "./confirm/confirm.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'form'},
  {path: 'form', component: FormsComponent},
  {path: 'report', component: ReportComponent},
  {path: 'register', component: RegisterComponent},
  // {path: 'confirm', component: ConfirmComponent},


  // {path:'**',redirectTo:'date'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
