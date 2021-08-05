import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplayoutComponent} from './apps/applayout/applayout.component';
import {StaffLayoutComponent} from './staff/staff-layout/staff-layout.component';


const routes: Routes = [
  {path: '', redirectTo: 'apps', pathMatch: 'full'},
  { path: 'apps',
    loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule),
    component: ApplayoutComponent
  },
  { path: 'form',
    loadChildren: () => import('./frm/frm.module').then(m => m.FrmModule),
  },
  { path: 'staff',
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
    component: StaffLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
