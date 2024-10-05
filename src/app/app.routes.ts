import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { MoviesComponent } from './routes/movies/movies.component';
import { PostsComponent } from './routes/posts/posts.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'movies',
        component: MoviesComponent,
    },
    {
        path: 'posts',
        component: PostsComponent,
    }
];
