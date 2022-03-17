import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  ngOnInit(): void {}
  submitPost(): void {
    // const user: IUser = this.loginForm.value;
    // this.authService.login(user);

    const user: IUser = {
      username: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
      firstName: '',
      lastName: '',
      address: '',
      age: NaN,
      workPlace: '',
    };

    this.authService.login(user);
  }
}
