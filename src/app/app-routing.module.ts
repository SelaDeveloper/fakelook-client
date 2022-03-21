import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FakelookComponent } from './components/fakelook/fakelook.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SecretComponent } from './components/secret/secret.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SecretGuard } from './guards/secret.guard';

const routes: Routes = [
  {
    path: `secret`,
    component: SecretComponent,
    canActivate: [SecretGuard],
  },
  { path: `sign-up`, component: SignUpComponent },
  { path: `login`, component: LoginComponent },
  { path: `reset-password`, component: ResetPasswordComponent },
  { path: `fakelook`, component: FakelookComponent },
  { path: ``, component: LoginComponent },
  { path: `**`, component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
