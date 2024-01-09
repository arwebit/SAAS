import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
  {
    path: '',
    title: 'View Users',
    component: UsersComponent,
  },
  {
    path: 'change-pass',
    title: 'Change password',
    component: ChangePassComponent,
  },
  {
    path: 'add',
    title: 'Add Users',
    component: AddUserComponent,
  },
  {
    path: 'edit/:user_id',
    title: 'Edit User',
    component: EditUserComponent,
  },
];
