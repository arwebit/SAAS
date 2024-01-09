import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'home',
    title: 'Home',
    loadChildren: () => import('./home/home.routes').then((m) => m.routes),
    canActivate: [loginGuard],
  },
  {
    path: 'users',
    title: 'Users',
    loadChildren: () => import('./users/users.routes').then((m) => m.routes),
    canActivate: [loginGuard],
  },
  {
    path: 'categories',
    title: 'Category',
    loadChildren: () =>
      import('./category/category.routes').then((m) => m.routes),
    canActivate: [loginGuard],
  },
  {
    path: 'blogs',
    title: 'Blogs',
    loadChildren: () => import('./blogs/blogs.routes').then((m) => m.routes),
    canActivate: [loginGuard],
  },
];
