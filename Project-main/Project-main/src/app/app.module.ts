import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgChartsModule } from 'ng2-charts' ;
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';



import { AppComponent } from './app.component';
import { VerificationComponent } from './verification/verification.component';
import { DataInterceptor } from './data.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LeftnavbarComponent } from './Component/leftnavbar/leftnavbar.component';
import { TopnavbarComponent } from './Component/topnavbar/topnavbar.component';
import { DashboardOverviewComponent } from './Component/dashboard-overview/dashboard-overview.component';
import { GraphComponent } from './Component/graph/graph.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
registerLocaleData(fr);

import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { NzIconModule } from 'ng-zorro-antd/icon';

const appRoute: Routes = [{
  path: '',
  component : HomeComponent
}]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraphComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    LeftnavbarComponent,
    TopnavbarComponent,
    DashboardOverviewComponent,
    VerificationComponent,
  ],
  imports: [
    MatPaginatorModule,
    MatDialogModule,
    DemoNgZorroAntdModule,
    FormsModule,
    BrowserModule,
    NgChartsModule,
    AppRoutingModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    EditorModule,
    MatSelectModule,
    MatOptionModule
    // NzIconModule.forRoot(),
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: DataInterceptor,
        multi: true
    },
    { provide: NZ_I18N, useValue: fr_FR },
    {
      provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce.min.js'
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
