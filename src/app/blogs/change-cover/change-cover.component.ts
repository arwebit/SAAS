import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../../layouts/layouts.module';
import { HttpErrorResponse } from '@angular/common/http';
import { BlogsService } from '../../shared/services/blogs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-cover',
  standalone: true,
  imports: [LayoutsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-cover.component.html',
  styleUrl: './change-cover.component.css',
})
export class ChangeCoverComponent {
  changeImgForm!: FormGroup;
  coverImageErr: string = '';
  message: string = '';
  className: string = '';
  coverImage!: File;
  blogID: number = 0;

  constructor(
    private blogSrv: BlogsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.blogID = params['blog_id'];
    });
  }

  ngOnInit(): void {}

  uploadFiles(event: any) {
    const file = event.target.files ? event.target.files[0] : '';
    this.coverImage = file;
  }

  emptyErrors(): void {
    this.coverImageErr = '';
  }

  save() {
    var sendData: any = new FormData();
    sendData.append('blog_cover_pic', this.coverImage ?? new File([], ''));

    this.blogSrv.changeCover(sendData, this.blogID).subscribe(
      (result: any) => {
        const pic: any = document.getElementById('picture');
        this.className = 'green';
        this.message = result.message;
        pic.value = '';
        this.emptyErrors();
      },
      (err: HttpErrorResponse) => {
        this.className = 'red';
        this.coverImageErr = err.error.errors.blog_cover_pic;
        this.message = err.error.message;
      }
    );
  }
}
