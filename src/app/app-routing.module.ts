import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsComponent} from "./forms/forms.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'form'},
  {path: 'form', component: FormsComponent},

  // {path:'**',redirectTo:'date'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
