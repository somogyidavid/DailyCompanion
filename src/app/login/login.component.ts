import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { LoadingService } from '../shared/services/loading.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { USER_NOT_FOUND, WRONG_PASSWORD, TOO_MANY_REQUESTS } from "../../errorConstants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  inputEmail: string = '';
  inputPassword: string = '';
  loginForm!: FormGroup;
  errorTypes: string[] = [USER_NOT_FOUND, WRONG_PASSWORD, TOO_MANY_REQUESTS];

  constructor(
    public authService: AuthService,
    public loader: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.inputEmail, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.inputPassword, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  get wrongEmail(): boolean {
    return (this.email.invalid && (this.email.dirty || this.email.touched));
  }

  get wrongPassword(): boolean {
    return (this.password.invalid && (this.password.dirty || this.password.touched));
  }
}
