import { Component } from '@angular/core';
import { LayoutsModule } from '../layouts/layouts.module';
import { UsersService } from '../shared/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [LayoutsModule, CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  userList: any = [];

  constructor(private userSrv: UsersService) {}

  ngOnInit(): void {
    this.userSrv.getUsers().subscribe(
      (result: any) => {
        this.userList = result.details;
      },
      (err: HttpErrorResponse) => {
        alert('Something went wrong');
      }
    );
  }
}
