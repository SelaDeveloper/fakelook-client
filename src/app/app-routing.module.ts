import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './components/add-post/add-post.component';
import { LoginComponent } from './components/login/login.component';
import { SecretComponent } from './components/secret/secret.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SecretGuard } from './guards/secret.guard';

const routes: Routes = [
  {
    path: `Secret`,
    component: SecretComponent,
    canActivate: [SecretGuard],
  },
  { path: `SignUp`, component: SignUpComponent },
  { path: `Login`, component: LoginComponent },
  { path: `Add-Post`, component: AddPostComponent },
  { path: ``, component: LoginComponent }, //LoginComponent AddPostComponent
  { path: `**`, component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
