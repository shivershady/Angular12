import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FacebookGuard } from './guards/facebook.guard';
import {RegisterComponent} from "./pages/register/register.component";
import {VerifyEmailAddressComponent} from "./pages/verify-email-address/verify-email-address.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [FacebookGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email-address', component: VerifyEmailAddressComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
