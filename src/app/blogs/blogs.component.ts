import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module';
import { BlogsService } from '../shared/services/blogs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutsModule, NgxPaginationModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css',
})
export class BlogsComponent {
  blogList: any = [];
  page: number = 1;
  count: number = 0;
  records: number = 10;

  constructor(private blogSrv: BlogsService) {}

  ngOnInit(): void {
    this.initTable();
  }

  initTable(): void {
    this.blogSrv.getBlogs().subscribe(
      (result: any) => {
        this.blogList = result.details;
      },
      (err: HttpErrorResponse) => {
        alert('Something went wrong');
      }
    );
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.initTable();
  }
  onTableSizeChange(event: any): void {
    this.records = event.target.value;
    this.page = 1;
    this.initTable();
  }

  deleteBlog(blogID: number) {
    const conf = confirm('Are you sure you want to delete?');

    if (conf) {
      this.blogSrv.deleteBlog(blogID).subscribe(
        () => {
          this.initTable();
        },
        (err: HttpErrorResponse) => {
          alert('Something went wrong');
        }
      );
    }
  }
}
