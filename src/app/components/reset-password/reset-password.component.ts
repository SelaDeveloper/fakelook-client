import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  passwordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        confirm_password: new FormControl('', [Validators.required]),
      },
      { validators: this.ConfirmedValidator('password', 'confirm_password') }
    );
  }

  submitPost(): void {
    const user: IUser = {
      userName: this.passwordForm.controls['userName'].value,
      password: this.passwordForm.controls['password'].value,
      firstName: '',
      lastName: '',
      address: '',
      age: NaN,
      workPlace: '',
    };

    this.authService.reserPassword(user);
  }

  ConfirmedValidator(str1: string, str2: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[str1];
      const control2 = formGroup.controls[str2];
      if (control2.errors && !control2.errors['ConfirmedValidator']) {
        return;
      }
      if (control.value !== control2.value) {
        control2.setErrors({ ConfirmedValidator: true });
      } else {
        control2.setErrors(null);
      }
    };
  }
}
