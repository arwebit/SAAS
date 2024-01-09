import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginErr: string = '';
  usernameErr: string = '';
  passwordErr: string = '';

  constructor(private loginSrv: LoginService, private router: Router) {
    localStorage.clear();
    this.loginErr = '';
    this.formInit();
  }
  formInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  ngOnInit() {
    this.formInit();
  }

  login() {
    this.loginSrv.login(this.loginForm.value).subscribe(
      (result: any) => {
        if (result.statusCode === 200) {
          localStorage.setItem('username', result.details.username);
          localStorage.setItem('role_id', result.details.role_id);
          localStorage.setItem('user_id', result.details.user_id);
          this.router.navigate(['/home']);
        } else {
          this.usernameErr = '';
          this.passwordErr = '';
          this.loginErr = result.errors;
        }
      },
      (err: HttpErrorResponse): void => {
        this.loginErr = err.error.message;
        this.usernameErr = err.error.errors.username;
        this.passwordErr = err.error.errors.password;
      }
    );
  }
}
