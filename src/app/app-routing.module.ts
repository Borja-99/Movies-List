import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieDetailsComponent } from './core/movie-details/movie-details.component';
import { MoviesListComponent } from './core/movies-list/movies-list.component';

const routes: Routes = [
  { path: 'white', component: AppComponent},
  { path: 'movies-list', component: MoviesListComponent },
  { path: '', pathMatch: "full", loadChildren: ()=> import('./shared/shared.module').then((movieId: any)=>movieId.SharedModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
