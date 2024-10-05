import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Posts } from '../../shared/models/posts';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [MatFormFieldModule, MatProgressBar, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoading = false;
  private _onDestroy = new Subject<void>();
  displayedColumns = ['id', 'userId', 'title', 'body'];
  dataSource = new MatTableDataSource<Posts>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getallPosts();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 2000);
  }

  getallPosts() {
    this.isLoading = true;
    this.apiService.getPosts().pipe(takeUntil(this._onDestroy)).subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching posts', error);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
