import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../../layouts/layouts.module';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from '../../shared/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [LayoutsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent {
  editCategoryForm!: FormGroup;
  categoryErr: string = '';
  slugErr: string = '';
  message: string = '';
  className: string = '';
  categoryID: number = 0;
  slug: string = '';

  constructor(
    private categorySrv: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryID = params['category_id'];
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }
  loadData() {
    this.categorySrv
      .getSelectedCategory(this.categoryID)
      .subscribe((result: any) => {
        this.editCategoryForm = new FormGroup({
          category_name: new FormControl(result.details.category_name),
          category_slug: new FormControl(result.details.category_slug),
        });
      });
  }

  slugTransform(event: Event): void {
    let categoryName = (event.target as HTMLInputElement).value;
    this.slug = categoryName.toLowerCase().replaceAll(' ', '-');
  }

  initForm() {
    this.editCategoryForm = new FormGroup({
      category_name: new FormControl(''),
      category_slug: new FormControl(''),
    });
  }

  save() {
    this.categorySrv
      .editCategorys(this.editCategoryForm.value, this.categoryID)
      .subscribe(
        (result: any) => {
          this.className = 'green';
          this.message = result.message;
          this.categoryErr = '';
          this.slugErr = '';
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
