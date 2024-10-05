import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Movies } from '../../shared/models/movies';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ImagesComponent } from "../../shared/components/images/images.component";
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, ImagesComponent, MatDialogModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent implements OnInit, OnDestroy {

  movieList!: Movies[];
  isLoading: boolean = false;
  protected _onDestroy = new Subject<void>();

  constructor(private apiService: ApiService) {};

  ngOnInit(): void {
    this.getallMovies();
  }

  getallMovies() {
    this.isLoading = true;
    this.apiService.getMovies().pipe(takeUntil(this._onDestroy)).subscribe({
      next: (res: any) => {
        this.movieList = res;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    })
  }

  onImageError(event: any){
    event.target.src='https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
