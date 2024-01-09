import { Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryComponent } from './category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

export const routes: Routes = [
  {
    path: '',
    title: 'View Category',
    component: CategoryComponent,
  },

  {
    path: 'add',
    title: 'Add Category',
    component: AddCategoryComponent,
  },
  {
    path: 'edit/:category_id',
    title: 'Edit Category',
    component: EditCategoryComponent,
  },
];
