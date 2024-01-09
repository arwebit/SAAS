import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../../layouts/layouts.module';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [LayoutsModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  editUserForm!: FormGroup;
  firstNameErr: string = '';
  lastNameErr: string = '';
  emailIDErr: string = '';
  aboutErr: string = '';
  linkedinProfileErr: string = '';
  facebookProfileErr: string = '';
  instagramProfileErr: string = '';
  statusErr: string = '';
  userID: number = 0;
  message: string = '';
  className: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userSrv: UsersService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.userID = params['user_id'];
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }
  loadData() {
    this.userSrv.getSelectedUser(this.userID).subscribe((result: any) => {
      this.editUserForm = new FormGroup({
        first_name: new FormControl(result.details.first_name),
        last_name: new FormControl(result.details.last_name),
        email_id: new FormControl(result.details.email_id),
        about: new FormControl(result.details.about),
        linkedin_profile: new FormControl(result.details.linkedin_profile),
        facebook_profile: new FormControl(result.details.facebook_profile),
        instagram_profile: new FormControl(result.details.instagram_profile),
        status: new FormControl(result.details.status),
      });
    });
  }

  initForm() {
    this.editUserForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email_id: new FormControl(''),
      about: new FormControl(''),
      linkedin_profile: new FormControl(''),
      facebook_profile: new FormControl(''),
      instagram_profile: new FormControl(''),
      status: new FormControl(''),
    });
  }

  save() {
    this.userSrv.editUsers(this.editUserForm.value, this.userID).subscribe(
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
