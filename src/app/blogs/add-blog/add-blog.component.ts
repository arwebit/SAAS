import { Component } from '@angular/core';
import { LayoutsModule } from '../../layouts/layouts.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BlogsService } from '../../shared/services/blogs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from '../../shared/services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [LayoutsModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css',
})
export class AddBlogComponent {
  addBlogForm!: FormGroup;
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
  coverImage!: File;
  slug: string = '';

  constructor(
    private blogSrv: BlogsService,
    private categorySrv: CategoryService
  ) {
    this.categorySrv.getCategorys().subscribe(
      (result: any) => {
        this.categoryList = result.details;
      },
      (err: HttpErrorResponse) => {
        alert('Something goes wrong. Try agin');
      }
    );
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addBlogForm = new FormGroup({
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

  slugTransform(event: Event): void {
    let categoryName = (event.target as HTMLInputElement).value;
    this.slug = categoryName.toLowerCase().replaceAll(' ', '-');
  }

  uploadFiles(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.coverImage = file;
  }

  emptyErrors(): void {
    this.blogTitleErr = '';
    this.blogSlugErr = '';
    this.blogPostErr = '';
    this.metaKeywordsErr = '';
    this.metaDescriptionErr = '';
    this.categoryErr = '';
    this.coverImageErr = '';
  }

  save() {
    var sendData: any = new FormData();
    sendData.append('blog_title', this.addBlogForm.value.blog_title);
    sendData.append('blog_slug', this.addBlogForm.value.blog_slug);
    sendData.append('blog_post', this.addBlogForm.value.blog_post);
    sendData.append('meta_keywords', this.addBlogForm.value.meta_keywords);
    sendData.append(
      'meta_description',
      this.addBlogForm.value.meta_description
    );
    sendData.append('category_id', this.addBlogForm.value.category_id);
    sendData.append('created_by', this.addBlogForm.value.created_by);
    sendData.append('status', this.addBlogForm.value.status);
    sendData.append('blog_cover_pic', this.coverImage ?? new File([], ''));

    this.blogSrv.addBlogs(sendData).subscribe(
      (result: any) => {
        const pic: any = document.getElementById('picture');
        this.className = 'green';
        this.message = result.message;
        pic.value = '';
        this.emptyErrors();
        this.initForm();
      },
      (err: HttpErrorResponse) => {
        this.className = 'red';
        this.blogTitleErr = err.error.errors.blog_title;
        this.blogSlugErr = err.error.errors.blog_slug;
        this.blogPostErr = err.error.errors.blog_post;
        this.metaKeywordsErr = err.error.errors.meta_keywords;
        this.metaDescriptionErr = err.error.errors.meta_description;
        this.categoryErr = err.error.errors.category_id;
        this.coverImageErr = err.error.errors.blog_cover_pic;

        this.message = err.error.message;
      }
    );
  }
}
