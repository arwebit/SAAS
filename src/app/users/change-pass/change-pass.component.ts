import { Component } from '@angular/core';
import { LayoutsModule } from '../../layouts/layouts.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [LayoutsModule, ReactiveFormsModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css',
})
export class ChangePassComponent {
  passChangeForm!: FormGroup;
  newPassErr: string = '';
  confirmPassErr: string = '';
  userID: any = localStorage.getItem('user_id');
  message: string = '';
  className: string = '';

  constructor(private userSrv: UsersService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.passChangeForm = new FormGroup({
      new_pass: new FormControl(''),
      confirm_pass: new FormControl(''),
    });
  }
  chagePassword() {
    this.userSrv
      .changePassword(this.userID, this.passChangeForm.value)
      .subscribe(
        (result: any) => {
          this.className = 'green';
          this.message = result.message;
          this.newPassErr = '';
          this.confirmPassErr = '';
        },
        (err: HttpErrorResponse) => {
          this.className = 'red';
          this.newPassErr = err.error.errors.new_pass;
          this.confirmPassErr = err.error.errors.confirm_pass;
          this.message = err.error.message;
        }
      );
  }
}
