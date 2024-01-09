import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LayoutsModule } from '../../layouts/layouts.module';
import { CategoryService } from '../../shared/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [LayoutsModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  addCategoryForm!: FormGroup;
  categoryErr: string = '';
  slugErr: string = '';
  message: string = '';
  className: string = '';
  slug: string = '';

  constructor(private categorySrv: CategoryService) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addCategoryForm = new FormGroup({
      category_name: new FormControl(''),
      category_slug: new FormControl(''),
    });
  }

  slugTransform(event: Event): void {
    let categoryName = (event.target as HTMLInputElement).value;
    this.slug = categoryName.toLowerCase().replaceAll(' ', '-');
  }
  save() {
    this.categorySrv.addCategorys(this.addCategoryForm.value).subscribe(
      (result: any) => {
        this.className = 'green';
        this.message = result.message;
        this.categoryErr = '';
        this.slugErr = '';
        this.initForm();
      },
      (err: HttpErrorResponse) => {
        this.className = 'red';
        this.categoryErr = err.error.errors.category_name;
        this.slugErr = err.error.errors.category_slug;
        this.message = err.error.message;
      }
    );
  }
}
