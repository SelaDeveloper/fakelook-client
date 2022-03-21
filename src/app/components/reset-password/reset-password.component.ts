import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(private authService: AuthService) {}

  passwordForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  ngOnInit(): void {}
  submitPost(): void {
    // const user: IUser = this.loginForm.value;
    // this.authService.login(user);
    // const user: IUser = {
    //   username: this.passwordForm.controls['userName'].value,
    //   password: this.passwordForm.controls['password'].value,
    //   firstName: '',
    //   lastName: '',
    //   address: '',
    //   age: NaN,
    //   workPlace: '',
    // };
    // this.authService.login(user);
  }
}
