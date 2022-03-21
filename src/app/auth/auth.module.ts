import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { SecretComponent } from '../components/secret/secret.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    SecretComponent,
    ResetPasswordComponent,
  ],
  exports: [LoginComponent, SignUpComponent, SecretComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AuthModule {}
