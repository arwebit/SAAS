import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { BlogsService } from '../../shared/services/blogs.service';
import { CategoryService } from '../../shared/services/category.service';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from '../../layouts/layouts.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [LayoutsModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css',
})
export class EditBlogComponent {
  editBlogForm!: FormGroup;
  blogID: number = 0;
  categoryList: any = [];
  blogTitleErr: string = '';
  blogSlugErr: string = '';
  blogPostErr: string = '';
  metaKeywordsErr: string = '';
  metaDescriptionErr: string = '';
  categoryErr: string = '';
  coverImageErr: string = '';
  message: string = '';
  className: string = '';
  slug: string = '';

  constructor(
    private blogSrv: BlogsService,
    private categorySrv: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {
    this.categorySrv.getCategorys().subscribe(
      (result: any) => {
        this.categoryList = result.details;
      },
      (err: HttpErrorResponse) => {
        alert('Something goes wrong. Try agin');
      }
    );
    this.activatedRoute.params.subscribe((params) => {
      this.blogID = params['blog_id'];
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

  loadData() {
    this.blogSrv.getSelectedBlog(this.blogID).subscribe((result: any) => {
      this.editBlogForm = new FormGroup({
        blog_title: new FormControl(result.details.blog_title),
        blog_slug: new FormControl(result.details.blog_slug),
        blog_post: new FormControl(result.details.blog_post),
        meta_keywords: new FormControl(result.details.meta_keywords),
        meta_description: new FormControl(result.details.meta_description),
        category_id: new FormControl(result.details.category_id),
        created_by: new FormControl(localStorage.getItem('username')),
        status: new FormControl(result.details.status),
      });
    });
  }

  slugTransform(event: Event): void {
    let categoryName = (event.target as HTMLInputElement).value;
    this.slug = categoryName.toLowerCase().replaceAll(' ', '-');
  }

  initForm() {
    this.editBlogForm = new FormGroup({
      blog_title: new FormControl(''),
      blog_slug: new FormControl(''),
      blog_post: new FormControl(''),
      meta_keywords: new FormControl(''),
      meta_description: new FormControl(''),
      category_id: new FormControl(''),
      created_by: new FormControl(localStorage.getItem('username')),
      status: new FormControl('1'),
    });
  }

  emptyErrors(): void {
    this.blogTitleErr = '';
    this.blogSlugErr = '';
    this.blogPostErr = '';
    this.metaKeywordsErr = '';
    this.metaDescriptionErr = '';
    this.categoryErr = '';
  }

  save() {
    this.blogSrv.editBlogs(this.editBlogForm.value, this.blogID).subscribe(
      (result: any) => {
        this.className = 'green';
        this.message = result.message;
        this.emptyErrors();
      },
      (err: HttpErrorResponse) => {
        this.className = 'red';
        this.blogTitleErr = err.error.errors.blog_title;
        this.blogSlugErr = err.error.errors.blog_slug;
        this.blogPostErr = err.error.errors.blog_post;
        this.metaKeywordsErr = err.error.errors.meta_keywords;
        this.metaDescriptionErr = err.error.errors.meta_description;
        this.categoryErr = err.error.errors.category_id;
        this.message = err.error.message;
      }
    );
  }
}
