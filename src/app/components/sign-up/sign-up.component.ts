import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService) {}
  signUpForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    workPlace: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    age: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  ngOnInit(): void {}

  submitPost(): void {
    // const user: IUser = this.signUpForm.value;
    // this.authService.signUp(user);

    const user: IUser = {
      userName: this.signUpForm.controls['userName'].value,
      firstName: this.signUpForm.controls['firstName'].value,
      lastName: this.signUpForm.controls['lastName'].value,
      password: this.signUpForm.controls['password'].value,
      address: this.signUpForm.controls['address'].value,
      age: this.signUpForm.controls['age'].value,
      workPlace: this.signUpForm.controls['workPlace'].value,
    };

    this.authService.signUp(user);
  }
}
