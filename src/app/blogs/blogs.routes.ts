import { Routes } from '@angular/router';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogsComponent } from './blogs.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { ChangeCoverComponent } from './change-cover/change-cover.component';

export const routes: Routes = [
  {
    path: '',
    title: 'View Blogs',
    component: BlogsComponent,
  },
  {
    path: 'add',
    title: 'Add Blogs',
    component: AddBlogComponent,
  },
  {
    path: 'edit/:blog_id',
    title: 'Edit Blog',
    component: EditBlogComponent,
  },
  {
    path: 'change-cover/:blog_id',
    title: 'Change cover',
    component: ChangeCoverComponent,
  },
];
