import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../shared/services/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css',
})
export class TopComponent {
  fullName: string = '';
  userID: any = localStorage.getItem('user_id');

  constructor(private router: Router, private userSrv: UsersService) {
    this.userSrv.getSelectedUser(this.userID).subscribe(
      (result: any) => {
        this.fullName = `${result.details.first_name} ${result.details.last_name} `;
      },
      (err: HttpErrorResponse) => {
        alert('Something went wrong');
      }
    );
  }

  logout(): void {
    localStorage.removeItem('role_id');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    this.router.navigate(['']);
  }
}
