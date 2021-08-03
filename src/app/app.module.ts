import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {Novelcorona2Component} from './frm/novelcorona2/novelcorona2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {defineLocale} from 'ngx-bootstrap/chronos';
import {thBeLocale} from 'ngx-bootstrap/locale';
import {environment} from 'src/environments/environment';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {AdminModule} from './admin/admin.module';
import {SharedModule} from './shared.module';
import {AppsModule} from './apps/apps.module';
import {FrmModule} from './frm/frm.module';



defineLocale('th-be', thBeLocale);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DigitOnlyModule,
    AdminModule,
    AppsModule,
    FrmModule,
    SharedModule,
  ],
  providers: [
    {provide: 'baseURL', useValue: environment.baseURL},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: LOCALE_ID, useValue: 'th-TH' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
