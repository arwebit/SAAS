import { Component } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categoryList: any = [];

  constructor(private categorySrv: CategoryService) {}

  ngOnInit(): void {
    this.categorySrv.getCategorys().subscribe(
      (result: any) => {
        this.categoryList = result.details;
      },
      (err: HttpErrorResponse) => {
        alert('Something went wrong');
      }
    );
  }
}
