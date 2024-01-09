import { Component } from '@angular/core';
import { LayoutsModule } from '../../layouts/layouts.module';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [LayoutsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  addUserForm!: FormGroup;
  firstNameErr: string = '';
  lastNameErr: string = '';
  emailIDErr: string = '';
  aboutErr: string = '';
  linkedinProfileErr: string = '';
  facebookProfileErr: string = '';
  instagramProfileErr: string = '';
  statusErr: string = '';
  message: string = '';
  className: string = '';

  constructor(private userSrv: UsersService) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addUserForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email_id: new FormControl(''),
      about: new FormControl(''),
      linkedin_profile: new FormControl(''),
      facebook_profile: new FormControl(''),
      instagram_profile: new FormControl(''),
      status: new FormControl('1'),
      role: new FormControl('2'),
    });
  }

  save() {
    this.userSrv.addUsers(this.addUserForm.value).subscribe(
      (result: any) => {
        this.className = 'green';
        this.message = result.message;
        this.firstNameErr = '';
        this.lastNameErr = '';
        this.aboutErr = '';
        this.emailIDErr = '';
        this.facebookProfileErr = '';
        this.linkedinProfileErr = '';
        this.instagramProfileErr = '';
        this.statusErr = '';
        this.initForm();
      },
      (err: HttpErrorResponse) => {
        this.className = 'red';
        this.firstNameErr = err.error.errors.first_name;
        this.lastNameErr = err.error.errors.last_name;
        this.aboutErr = err.error.errors.about;
        this.emailIDErr = err.error.errors.email_id;
        this.facebookProfileErr = err.error.errors.facebook_profile;
        this.linkedinProfileErr = err.error.errors.linkedin_profile;
        this.instagramProfileErr = err.error.errors.instagram_profile;
        this.statusErr = err.error.errors.status;
        this.message = err.error.message;
      }
    );
  }
}
