import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {DashboardComponent } from './Component/dashboard/dashboard.component';
import { GraphComponent } from './Component/graph/graph.component'
import { VerificationComponent } from './verification/verification.component'

const routes: Routes = [
  { path: '', component : HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'verification', component: VerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }


